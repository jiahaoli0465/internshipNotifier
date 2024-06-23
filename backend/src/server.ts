import express from "express";
import cron from "node-cron";
import axios from "axios";
import { unescape } from "html-escaper";
import * as cheerio from "cheerio";

const app = express();
const PORT = process.env.PORT || 8888;

let currentPostings: any[] = [];
let newPostings: any[] = [];

const URL =
  "https://raw.githubusercontent.com/SimplifyJobs/Summer2025-Internships/dev/README.md";

const cleanCompanyName = (companyName: string): string => {
  const cleanName = companyName.replace(/\*\*\[(.*?)\]\(.*?\)\*\*/, "$1");
  return cleanName;
};

const cleanText = (text: string): string => {
  text = unescape(text);
  text = text.normalize("NFKC");
  return text;
};

const fetchPostings = async (): Promise<any[]> => {
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
    let lastCompany: string | null = null;

    for (const row of tableRows) {
      if (row.trim() === "") {
        continue;
      }

      const cols = row.split("|").slice(1, -1);

      if (cols.length < 5) {
        continue;
      }

      let company =
        cleanCompanyName(cols[0].trim().replace("\u21b3", "")) ?? lastCompany;
      const role = cleanText(cols[1].trim());
      const location = cleanText(cols[2].replace("</br>", ", ").trim());
      const $ = cheerio.load(cols[3].trim());
      const link = $("a").attr("href") || "N/A";
      const datePosted = cols[4].trim();

      postings.push({
        company,
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

const findNewPostings = (oldPostings: any[], newPostings: any[]): any[] => {
  const oldPostingsSet = new Set(
    oldPostings.map((posting) => JSON.stringify(posting))
  );
  return newPostings.filter(
    (posting) => !oldPostingsSet.has(JSON.stringify(posting))
  );
};

const updatePostings = async () => {
  const fetchedPostings = await fetchPostings();
  const newDetectedPostings = findNewPostings(currentPostings, fetchedPostings);

  if (newDetectedPostings.length > 0) {
    newPostings = newPostings.concat(newDetectedPostings);
  }

  currentPostings = fetchedPostings;
};

// Schedule a task to fetch postings every 2 hours
cron.schedule("0 */2 * * *", async () => {
  console.log("Fetching postings...");
  await updatePostings();
  console.log("Postings updated.");
});

// Initial fetching of postings when the server starts
(async () => {
  await updatePostings();
})();

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.get("/postings", (req, res) => {
  res.json(currentPostings);
});

app.get("/new_postings", (req, res) => {
  res.json(newPostings);
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
