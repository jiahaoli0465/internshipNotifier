import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { unescape } from "html-escaper";
import * as cheerio from "cheerio";

interface Posting {
  company: string;
  role: string;
  location: string;
  link: string;
  date_posted: string;
}

const useListings = () => {
  const [listings, setListings] = useState<Posting[]>([]);
  const hasFetched = useRef(false); // Ref to store fetch status
  const cachedData = useRef<Posting[]>([]); // Ref to cache the fetched data

  const URL = "https://raw.githubusercontent.com/SimplifyJobs/Summer2025-Internships/dev/README.md";

  const cleanCompanyName = (companyName: string, lastCompany: string): string => {
    if (companyName.trim() === "") {
      return lastCompany;
    }
    const cleanName = companyName.replace(/\*\*\[(.*?)\]\(.*?\)\*\*/, "$1");
    return cleanName;
  };

  const cleanText = (text: string): string => {
    text = unescape(text);
    text = text.normalize("NFKC");
    text = text.replace(/<\/?br\/?>/g, ", ").replace(/<[^>]*>/g, "").trim();
    return text;
  };

  const cleanUrl = (url: string): string => {
    const paramString = 'utm_source=Simplify&ref=Simplify';
    const paramIndex = url.indexOf(paramString);

    if (paramIndex !== -1) {
      return url.substring(0, paramIndex - 1);
    }

    return url;
  };

  const fetchPostings = async (): Promise<Posting[]> => {
    try {
      const response = await axios.get(URL);
      const content = response.data;

      const tableStart = content.indexOf("| Company | Role | Location | Application/Link | Date Posted |");
      const tableEnd = content.indexOf("<!-- Please leave a one line gap between this and the table TABLE_END (DO NOT CHANGE THIS LINE) -->", tableStart);

      if (tableStart === -1 || tableEnd === -1) {
        console.log("Table not found in the content");
        return [];
      }

      const tableContent = content.slice(tableStart, tableEnd).trim().split("\n");
      const tableRows = tableContent.slice(2);

      const postings: Posting[] = [];
      let lastCompany: string = "Unknown Company";

      for (const row of tableRows) {
        if (row.trim() === "") {
          continue;
        }

        const cols = row.split("|").slice(1, -1);

        if (cols.length < 5) {
          continue;
        }

        let company = cleanCompanyName(cols[0].trim().replace("\u21b3", ""), lastCompany);
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

      return postings;
    } catch (error) {
      console.error(`Failed to retrieve the page: ${error}`);
      return [];
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      const getPostings = async () => {
        const postings = await fetchPostings();
        cachedData.current = postings; // Cache the fetched data
        setListings(postings);
        hasFetched.current = true; // Mark as fetched
      };

      getPostings();
    } else {
      setListings(cachedData.current); // Use cached data
    }
  }, []);

  return listings;
};

export default useListings;
