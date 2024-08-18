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
    console.log('Subscribed users fetched:', data);
  }

  return data;
};

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

const notifyUsers = async (newPostings) => {
  const users = await getSubscribedUsers();
  const formattedPostings = formatJobPostings(newPostings);
  if (formattedPostings)
    for (const user of users) {
      if (user.phone_number) {
        const smsMessage = `New internship opportunities:\n\n${formattedPostings}\n\nReply STOP to unsubscribe.`;
        await sendSMS(user.phone_number, smsMessage);
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

const run = async () => {
  console.log('Fetching postings...');
  const postings = await fetchPostings();
  console.log('Postings fetched:', postings.length);

  if (postings.length > 0) {
    console.log('Fetching existing postings...');
    const existingPostings = await getExistingPostings();
    console.log('Existing postings fetched:', existingPostings.length);

    const newPostings = postings.filter((posting) => {
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
