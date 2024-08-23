const axios = require('axios');
const { unescape } = require('html-escaper');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');
const { parse, isAfter, subDays } = require('date-fns');

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
  'https://raw.githubusercontent.com/SimplifyJobs/Summer2025-Internships/dev/README.md';

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

    // Reverse postings to ensure latest are at the end
    postings.reverse();

    return postings;
  } catch (error) {
    console.error(`Failed to retrieve the page: ${error}`);
    return [];
  }
};

const getExistingPostings = async () => {
  const { data, error } = await supabase
    .from('positions')
    .select('company, role, location, link, date_posted');

  if (error) {
    console.error('Error fetching existing data:', error);
    return [];
  }

  return data;
};

const insertData = async (postings) => {
  const { data, error } = await supabase.from('positions').insert(postings);

  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Data inserted:', data);
  }
};

const getSubscribedUsers = async () => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('phone_number')
    .limit(50);

  if (error) {
    console.error('Error fetching subscribed users:', error);
    return [];
  } else {
    // console.log('Subscribed users fetched:', data);
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
      console.error(`Failed to send SMS to ${'###'}: ${response.data.error}`);
    }
  } catch (error) {
    console.error(`Error sending SMS to ${'###'}:`, error.message);
  }
};

const MAX_POSTINGS_PER_SMS = 3;

const formatJobPostings = (postings) => {
  if (postings.length === 0) {
    return 'No new internship opportunities found today.';
  }
  return postings
    .map(
      (posting) =>
        `${posting.company} - ${posting.role}\nLocation: ${posting.location}\nApply: ${posting.link}\nPosted: ${posting.date_posted}\n`
    )
    .join('\n');
};

const notifyUsers = async (newPostings) => {
  const users = await getSubscribedUsers();
  const totalPostings = newPostings.length;

  for (const user of users) {
    if (user.phone_number) {
      let messageCount = 1;
      for (let i = 0; i < totalPostings; i += MAX_POSTINGS_PER_SMS) {
        const batch = newPostings.slice(i, i + MAX_POSTINGS_PER_SMS);
        const formattedPostings = formatJobPostings(batch);

        let smsMessage = `New internship opportunities (${messageCount} of ${Math.ceil(
          totalPostings / MAX_POSTINGS_PER_SMS
        )}):\n\n${formattedPostings}\n\n`;

        if (i + MAX_POSTINGS_PER_SMS >= totalPostings) {
          smsMessage += 'End of new postings.\n\n';
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

const notifyUsersNoPostings = async () => {
  const users = await getSubscribedUsers();
  if (users.length === 0) {
    console.log('No subscribed users found');
    return;
  }
  for (const user of users) {
    if (user.phone_number) {
      const smsMessage = `No new internship opportunities found today.\n\nReply STOP to unsubscribe.`;
      await sendSMS(user.phone_number, smsMessage);
    }
  }
};
const parseDatePosted = (datePosted) => {
  const today = new Date();
  const thisYear = today.getFullYear();

  return parse(datePosted + ` ${thisYear}`, 'MMM d yyyy', new Date());
};

const run = async () => {
  console.log('Fetching postings...');
  const postings = await fetchPostings();
  console.log('Postings fetched:', postings.length);

  if (postings.length > 0) {
    console.log('Fetching existing postings...');
    const existingPostings = await getExistingPostings();
    console.log('Existing postings fetched:', existingPostings.length);
    const twoDaysAgo = subDays(new Date(), 2);
    const recentPostings = postings.filter((posting) => {
      const parsedDate = parseDatePosted(posting.date_posted);
      return isAfter(parsedDate, twoDaysAgo);
    });

    const newPostings = recentPostings.filter((posting) => {
      return !existingPostings.some(
        (existing) =>
          existing.company === posting.company &&
          existing.role === posting.role &&
          existing.location === posting.location &&
          existing.link === posting.link &&
          existing.date_posted === posting.date_posted
      );
    });

    console.log('New postings to insert:', newPostings.length);
    if (newPostings.length > 0) {
      console.log('Inserting new data...');
      await insertData(newPostings);
      console.log('Data inserted');

      console.log('Notifying subscribed users...');
      await notifyUsers(newPostings);
      console.log('Users notified');
    } else {
      console.log('No new data to insert');
      console.log('Notifying subscribed users...');
      await notifyUsersNoPostings();
      console.log('Users notified');
    }
  } else {
    console.log('No data to insert');
  }
};

run();
