const axios = require('axios');
const { unescape } = require('html-escaper');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');

// Supabase setup
const supabaseUrl = process.env.VITE_SUPA_URL;
const supabaseKey = process.env.VITE_SUPA_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// TextBelt setup
const textbeltKey = process.env.VITE_TEXTBELT_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and key are required.');
}

const URL =
  'https://raw.githubusercontent.com/SimplifyJobs/New-Grad-Positions/dev/README.md';
const MAX_POSTINGS_PER_SMS = 3;

const cleanCompanyName = (companyName, lastCompany) => {
  if (companyName.trim() === '') {
    return lastCompany;
  }
  const cleanName = companyName.replace(/\*\*\[(.*?)\]\(.*?\)\*\*/, '$1');
  return cleanName;
};

const cleanText = (text) => {
  text = unescape(text);
  text = text.normalize('NFKC');
  text = text
    .replace(/<\/?br\/?>/g, ', ')
    .replace(/<[^>]*>/g, '')
    .trim();
  return text;
};

const cleanUrl = (url) => {
  const paramString = 'utm_source=Simplify&ref=Simplify';
  const paramIndex = url.indexOf(paramString);

  if (paramIndex !== -1) {
    return url.substring(0, paramIndex - 1);
  }

  return url;
};

const fetchPostings = async () => {
  try {
    const response = await axios.get(URL);
    const content = response.data;

    const tableStart = content.indexOf(
      '| Company | Role | Location | Application/Link | Date Posted |'
    );
    const tableEnd = content.indexOf(
      '<!-- Please leave a one line gap between this and the table TABLE_END (DO NOT CHANGE THIS LINE) -->',
      tableStart
    );

    if (tableStart === -1 || tableEnd === -1) {
      console.log('Table not found in the content');
      return [];
    }

    const tableContent = content.slice(tableStart, tableEnd).trim().split('\n');
    const tableRows = tableContent.slice(2);

    const postings = [];
    let lastCompany = 'Unknown Company';

    for (const row of tableRows) {
      if (row.trim() === '') {
        continue;
      }

      const cols = row.split('|').slice(1, -1);

      if (cols.length < 5) {
        continue;
      }

      let company = cleanCompanyName(
        cols[0].trim().replace('\u21b3', ''),
        lastCompany
      );
      let role = cleanText(cols[1].trim()).replace('🛂', '').trim();
      const location = cleanText(cols[2].replace('</br>', ', ').trim());
      const $ = cheerio.load(cols[3].trim());
      const rawLink = $('a').attr('href') || 'N/A';
      const link = cleanUrl(rawLink);
      const datePosted = cols[4].trim();

      if (company !== '') {
        lastCompany = company;
      }

      postings.push({
        company: lastCompany,
        role,
        location,
        link,
        date_posted: datePosted,
      });
    }

    return postings;
  } catch (error) {
    console.error(`Failed to retrieve the page: ${error}`);
    return [];
  }
};

const formatJobPostings = (postings) => {
  if (postings.length === 0) {
    return 'No recent internship opportunities found.';
  }
  return postings
    .map(
      (posting) =>
        `${posting.company} - ${posting.role}\nLocation: ${posting.location}\nApply: ${posting.link}\nPosted: ${posting.date_posted}\n`
    )
    .join('\n');
};

const getSubscribedUsers = async () => {
  const { data, error } = await supabase
    .from('new_grad_subs')
    .select('phone_number')
    .limit(50);

  if (error) {
    console.error('Error fetching subscribed users:', error);
    return [];
  } else {
    console.log('Subscribed users fetched:', data);
  }

  return data;
};

const sendSMS = async (phoneNumber, message) => {
  try {
    const response = await axios.post(
      'https://textbelt.com/text',
      {
        phone: phoneNumber,
        message: message,
        key: textbeltKey,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (response.data.success) {
      console.log(`SMS sent to ${phoneNumber}`);
    } else {
      console.error(
        `Failed to send SMS to ${phoneNumber}: ${response.data.error}`
      );
    }
  } catch (error) {
    console.error(`Error sending SMS to ${phoneNumber}:`, error.message);
  }
};

const notifyUsers = async (recentPostings) => {
  const users = await getSubscribedUsers();
  const totalPostings = recentPostings.length;

  for (const user of users) {
    if (user.phone_number) {
      let messageCount = 1;
      for (let i = 0; i < totalPostings; i += MAX_POSTINGS_PER_SMS) {
        const batch = recentPostings.slice(i, i + MAX_POSTINGS_PER_SMS);
        const formattedPostings = formatJobPostings(batch);

        let smsMessage = `Recent internship opportunities (${messageCount} of ${Math.ceil(
          totalPostings / MAX_POSTINGS_PER_SMS
        )}):\n\n${formattedPostings}\n\n`;

        if (i + MAX_POSTINGS_PER_SMS >= totalPostings) {
          smsMessage += 'End of recent postings.\n\n';
        } else {
          smsMessage += 'More opportunities in next message.\n\n';
        }

        if (messageCount === 1) {
          smsMessage += 'Reply STOP to unsubscribe.';
        }

        await sendSMS(user.phone_number, smsMessage);
        messageCount++;

        // Add a delay between messages to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }
};

// this is broken
const filterPostingsByDate = (postings, dates) => {
  return postings.filter((posting) => dates.includes(posting.date_posted));
};

const filterPostingsByLastFiveCount = (postings) => {
  return postings.slice(0, 5);
};

const run = async () => {
  console.log('Fetching all postings...');
  const allPostings = await fetchPostings();
  console.log('All postings fetched:', allPostings.length);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayFormatted = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
  const yesterdayFormatted = yesterday.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  //   console.log('Filtering postings for today and yesterday...');
  //   const recentPostings = filterPostingsByDate(allPostings, [
  //     todayFormatted,
  //     yesterdayFormatted,
  //   ]);
  const recentPostings = filterPostingsByLastFiveCount(allPostings);

  console.log('Recent postings found:', recentPostings.length);

  if (recentPostings.length > 0) {
    console.log('Notifying subscribed users...');
    await notifyUsers(recentPostings);
    console.log('Users notified');
  } else {
    console.log('No recent postings to notify users about');
  }
};

run();
