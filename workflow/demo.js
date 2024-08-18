const axios = require('axios');
const { unescape } = require('html-escaper');
const cheerio = require('cheerio');

// TextBelt setup
const textbeltKey = process.env.VITE_TEXTBELT_API_KEY;

const URL =
  'https://raw.githubusercontent.com/SimplifyJobs/Summer2025-Internships/dev/README.md';

const cleanCompanyName = (companyName) => {
  return companyName.replace(/\*\*\[(.*?)\]\(.*?\)\*\*/, '$1').trim();
};

const cleanText = (text) => {
  return unescape(text)
    .normalize('NFKC')
    .replace(/<\/?br\/?>/g, ', ')
    .replace(/<[^>]*>/g, '')
    .trim();
};

const cleanUrl = (url) => {
  const paramString = 'utm_source=Simplify&ref=Simplify';
  const paramIndex = url.indexOf(paramString);
  return paramIndex !== -1 ? url.substring(0, paramIndex - 1) : url;
};

const fetchLatestPostings = async () => {
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

    for (const row of tableRows.slice(0, 3)) {
      // Get only the first 3 rows
      if (row.trim() === '') continue;

      const cols = row.split('|').slice(1, -1);
      if (cols.length < 5) continue;

      const company = cleanCompanyName(cols[0]);
      const role = cleanText(cols[1]).replace('🛂', '').trim();
      const location = cleanText(cols[2].replace('</br>', ', '));
      const $ = cheerio.load(cols[3].trim());
      const link = cleanUrl($('a').attr('href') || 'N/A');

      const datePosted = cols[4].trim();

      postings.push({ company, role, location, link, date_posted: datePosted });
    }

    return postings;
  } catch (error) {
    console.error(`Failed to retrieve the page: ${error}`);
    return [];
  }
};

const formatJobPostings = (postings) => {
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

const run = async () => {
  console.log('Fetching latest postings...');
  const latestPostings = await fetchLatestPostings();
  console.log('Latest postings fetched:', latestPostings.length);

  if (latestPostings.length > 0) {
    const formattedPostings = formatJobPostings(latestPostings);
    const message = `Latest internship opportunities:\n\n${formattedPostings}`;

    console.log('Sending SMS notification...');
    await sendSMS('4752249158', message);
    console.log('Notification sent');
  } else {
    console.log('No postings to send');
  }
};

run();
