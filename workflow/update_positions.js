const axios = require("axios");
const { unescape } = require("html-escaper");
const cheerio = require("cheerio");
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and key are required.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const URL =
  "https://raw.githubusercontent.com/SimplifyJobs/Summer2025-Internships/dev/README.md";

const cleanCompanyName = (companyName, lastCompany) => {
  if (companyName.trim() === "") {
    return lastCompany;
  }
  const cleanName = companyName.replace(/\*\*\[(.*?)\]\(.*?\)\*\*/, "$1");
  return cleanName;
};

const cleanText = (text) => {
  text = unescape(text);
  text = text.normalize("NFKC");
  text = text
    .replace(/<\/?br\/?>/g, ", ")
    .replace(/<[^>]*>/g, "")
    .trim();
  return text;
};

const cleanUrl = (url) => {
  const paramString = "utm_source=Simplify&ref=Simplify";
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
      "| Company | Role | Location | Application/Link | Date Posted |"
    );
    const tableEnd = content.indexOf(
      "<!-- Please leave a one line gap between this and the table TABLE_END (DO NOT CHANGE THIS LINE) -->",
      tableStart
    );

    if (tableStart === -1 || tableEnd === -1) {
      console.log("Table not found in the content");
      return [];
    }

    const tableContent = content.slice(tableStart, tableEnd).trim().split("\n");
    const tableRows = tableContent.slice(2);

    const postings = [];
    let lastCompany = "Unknown Company";

    for (const row of tableRows) {
      if (row.trim() === "") {
        continue;
      }

      const cols = row.split("|").slice(1, -1);

      if (cols.length < 5) {
        continue;
      }

      let company = cleanCompanyName(
        cols[0].trim().replace("\u21b3", ""),
        lastCompany
      );
      let role = cleanText(cols[1].trim()).replace("🛂", "").trim();
      const location = cleanText(cols[2].replace("</br>", ", ").trim());
      const $ = cheerio.load(cols[3].trim());
      const rawLink = $("a").attr("href") || "N/A";
      const link = cleanUrl(rawLink);
      const datePosted = cols[4].trim();

      if (company !== "") {
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
    .from("positions")
    .select("company, role, location, link, date_posted");

  if (error) {
    console.error("Error fetching existing data:", error);
    return [];
  }

  return data;
};

const insertData = async (postings) => {
  const { data, error } = await supabase.from("positions").insert(postings);

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted:", data);
  }
};

const run = async () => {
  console.log("Fetching postings...");
  const postings = await fetchPostings();
  console.log("Postings fetched:", postings.length);

  if (postings.length > 0) {
    console.log("Fetching existing postings...");
    const existingPostings = await getExistingPostings();
    console.log("Existing postings fetched:", existingPostings.length);

    // Filter out postings that already exist in the table
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

    console.log("New postings to insert:", newPostings.length);
    if (newPostings.length > 0) {
      console.log("Inserting new data...");
      await insertData(newPostings);
      console.log("Data inserted");
    } else {
      console.log("No new data to insert");
    }
  } else {
    console.log("No data to insert");
  }
};

run();
