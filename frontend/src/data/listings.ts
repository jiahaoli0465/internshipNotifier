const listings = [
    {
      "company": "IMC Trading",
      "role": "Software Engineer Intern - Summer 2025",
      "location": "Chicago, IL",
      "link": "https://boards.eu.greenhouse.io/imc/jobs/4347765101?utm_source=Simplify&ref=Simplify",
      "date_posted": "Jul 15"
    },
    {
      "company": "IMC Trading",
      "role": "Quant Trader Intern - Summer 2025",
      "location": "Chicago, IL",
      "link": "https://boards.eu.greenhouse.io/imc/jobs/4345621101?utm_source=Simplify&ref=Simplify",
      "date_posted": "Jul 15"
    },
    {
      "company": "Second Front Systems",
      "role": "Skillbridge Intern",
      "location": "Remote in USA",
      "link": "https://jobs.lever.co/secondfrontsystems/dc771da9-8b58-4fc7-9625-ff9ec2249efe/apply?utm_source=Simplify&ref=Simplify",
      "date_posted": "Jul 13"
    },
    {
      "company": "GPTZero",
      "role": "Machine Learning Intern",
      "location": "Toronto, ON, Canada, NYC",
      "link": "https://jobs.ashbyhq.com/GPTZero/d7e6f3ee-8446-4ac4-b1f8-e79c9876c31a/application?utm_source=Simplify&ref=Simplify",
      "date_posted": "Jul 11"
    },
    {
      "company": "Tower Research Capital",
      "role": "Quantitative Trader Intern - Summer 2025",
      "location": "NYC",
      "link": "https://www.tower-research.com/open-positions/?gh_jid=6072039&utm_source=Simplify&ref=Simplify",
      "date_posted": "Jul 08"
    },
    {
      "company": "DRW",
      "role": "Software Developer Intern",
      "location": "Houston, TX, Chicago, IL",
      "link": "https://boards.greenhouse.io/drweng/jobs/6071742?utm_source=Simplify&ref=Simplify",
      "date_posted": "Jul 08"
    },
    {
      "company": "BlackRock",
      "role": "2025 Summer Internship Program - AMERS",
      "location": "Americas",
      "link": "https://blackrock.tal.net/vx/lang-en-GB/mobile-0/brand-3/xf-42e764beb7f7/candidate/so/pm/1/pl/1/opp/8163-2025-Summer-Internship-Program-AMERS/en-GB?utm_source=Simplify&ref=Simplify",
      "date_posted": "Jul 08"
    },
    {
      "company": "Optiver",
      "role": "Quantitative Research Intern - MS/BS",
      "location": "Austin, TX",
      "link": "https://optiver.com/working-at-optiver/career-opportunities/7499032002/?gh_jid=7499032002&utm_source=Simplify&ref=Simplify",
      "date_posted": "Jul 05"
    },
    {
      "company": "Optiver",
      "role": "Quantitative Trader Intern - Summer 2025 - Chicago",
      "location": "Chicago, IL",
      "link": "https://optiver.com/working-at-optiver/career-opportunities/7480659002/?gh_jid=7480659002&utm_source=Simplify&ref=Simplify",
      "date_posted": "Jul 05"
    },
    {
      "company": "Capula",
      "role": "Trading and Research Summer Internship",
      "location": "New York, New York, United States",
      "link": "https://apply.workable.com/capula-investment-management-ltd/j/CADD57CDA5/?utm_source=Simplify&ref=Simplify",
      "date_posted": "Jul 05"
    },
    {
      "company": "Air Company",
      "role": "Engineering Intern",
      "location": "NYC",
      "link": "https://boards.greenhouse.io/aircompany/jobs/4440209005?utm_source=Simplify&ref=Simplify",
      "date_posted": "Jul 03"
    },
    {
      "company": "Numerade",
      "role": "Data Scientist Intern",
      "location": "Remote in USA",
      "link": "http://www.numerade.com/careers?gh_jid=5221314004&utm_source=Simplify&ref=Simplify",
      "date_posted": "Jul 02"
    },
    {
      "company": "Citadel",
      "role": "Software Engineer Intern",
      "location": "Chicago, IL, Miami, FL</br>New York, NY",
      "link": "https://www.citadel.com/careers/details/software-engineer-2025-intern-us-2/?utm_source=Simplify&ref=Simplify",
      "date_posted": "Jul 02"
    },
    {
      "company": "Palantir",
      "role": "Software Engineer Intern",
      "location": "Washington, D.C.",
      "link": "https://jobs.lever.co/palantir/bdcfb29f-4f27-42de-933f-7f83a359b9f0?utm_source=Simplify&ref=Simplify",
      "date_posted": "Jul 01"
    },
    {
      "company": "Palantir",
      "role": "Software Engineer Intern",
      "location": "Seattle, WA",
      "link": "https://jobs.lever.co/palantir/2fb19022-bb65-4af8-b6fa-31beb345c140?utm_source=Simplify&ref=Simplify",
      "date_posted": "Jul 01"
    },
    {
      "company": "Palantir",
      "role": "Software Engineer Intern",
      "location": "New York, NY",
      "link": "https://jobs.lever.co/palantir/7d69cf8a-06fd-4f05-bd84-27149db29c4d?utm_source=Simplify&ref=Simplify",
      "date_posted": "Jul 01"
    },
    {
      "company": "Palantir",
      "role": "Software Engineer Intern",
      "location": "Palo Alto, CA",
      "link": "https://jobs.lever.co/palantir/e27af7ab-41fc-40c9-b31d-02c6cb1c505c?utm_source=Simplify&ref=Simplify",
      "date_posted": "Jul 01"
    },
    {
      "company": "Morgan Stanley",
      "role": "Technology Summer Analyst Program",
      "location": "New York, NY",
      "link": "https://morganstanley.tal.net/vx/lang-en-GB/mobile-0/brand-2/xf-53fdfbaf0394/candidate/so/pm/1/pl/1/opp/17297-2025-Technology-Summer-Analyst-Program-New-York/en-GB?utm_source=Simplify&ref=Simplify",
      "date_posted": "Jun 27"
    },
    {
      "company": "PwC",
      "role": "Products & Technology Intern 🛂",
      "location": "<details><summary>**4 locations**</summary>Dallas, TX, Tampa, FL</br>Chicago, IL</br>New York, NY</details>",
      "link": "https://jobs.us.pwc.com/job/-/-/932/66835864048?utm_source=Simplify&ref=Simplify",
      "date_posted": "Jun 26"
    },
    {
      "company": "Rockwell Automation",
      "role": "Co-op – Firmware Engineering",
      "location": "Cambridge, ON, Canada",
      "link": "https://rockwellautomation.wd1.myworkdayjobs.com/en-US/External_Rockwell_Automation/job/Cambridge-Ontario-Canada/Co-op--Firmware-Engineering_R24-4123-2?utm_source=Simplify&ref=Simplify",
      "date_posted": "Jun 24"
    },
    {
      "company": "Konrad",
      "role": "Software Developer Intern",
      "location": "Toronto, Canada",
      "link": "https://www.konrad.com/careers/job/5997801003?gh_jid=5997801003&utm_source=Simplify&ref=Simplify",
      "date_posted": "Jun 24"
    },
    {
      "company": "Apple",
      "role": "Machine Learning Intern",
      "location": "United States",
      "link": "https://jobs.apple.com/en-us/details/200554363/machine-learning-ai-internships?utm_source=Simplify&ref=Simplify",
      "date_posted": "Jun 24"
    },
    {
      "company": "Point72",
      "role": "Quantitative Developer Intern",
      "location": "New York, NY",
      "link": "https://careers.point72.com/CSJobDetail?jobName=summer-2025-quantitative-developer-internship&jobCode=CSS-0012293&utm_source=Simplify&ref=Simplify",
      "date_posted": "Jun 18"
    },
    {
      "company": "Apple",
      "role": "Software Engineering Internship",
      "location": "United States",
      "link": "https://jobs.apple.com/en-us/details/200554359/software-engineering-internships?team=STDNT&utm_source=Simplify&ref=Simplify",
      "date_posted": "Jun 07"
    },
    {
      "company": "Bridgewater Associates",
      "role": "Investment Engineer Intern - Summer 2025",
      "location": "Westport, CT",
      "link": "https://boards.greenhouse.io/bridgewater89/jobs/7239497002?utm_source=Simplify&ref=Simplify",
      "date_posted": "Jun 06"
    },
    {
      "company": "SIG",
      "role": "Quantitative Trader Intern",
      "location": "Chicago, IL",
      "link": "https://careers.sig.com/job/8326/Quantitative-Trader-Internship-Summer-2025?utm_source=Simplify&ref=Simplify",
      "date_posted": "May 24"
    },
    {
      "company": "D.E. Shaw",
      "role": "Software Developer Intern",
      "location": "New York, NY",
      "link": "https://www.deshaw.com/careers/software-developer-intern-new-york-summer-2025-5137?utm_source=Simplify&ref=Simplify",
      "date_posted": "May 22"
    },
    {
      "company": "Cranium",
      "role": "AI/ML Engineer Intern",
      "location": "Short Hills, NJ",
      "link": "https://www.linkedin.com/jobs/view/ai-ml-engineer-intern-summer-2025-at-cranium-3925803158/?utm_source=Simplify&ref=Simplify",
      "date_posted": "May 13"
    },
    {
      "company": "Epic",
      "role": "Software Developer Intern 🛂",
      "location": "Madison, WI",
      "link": "https://epic.avature.net/Careers/FolderDetail/Verona-Wisconsin-United-States-Software-Developer-Intern-Summer-2025/25624?utm_source=Simplify&ref=Simplify",
      "date_posted": "May 03"
    },
    {
      "company": "Chicago Trading Company",
      "role": "Quant Trading Associate Intern",
      "location": "Chicago, IL",
      "link": "https://job-boards.greenhouse.io/chicagotradingreferral/jobs/4392223005?utm_source=Simplify&ref=Simplify",
      "date_posted": "May 02"
    },
    {
      "company": "Matterport",
      "role": "Computer Vision / Machine Learning Intern",
      "location": "Remote in USA",
      "link": "N/A",
      "date_posted": "Jul 08"
    },
    {
      "company": "Quanterix",
      "role": "Data Analytics Intern",
      "location": "Billerica, MA",
      "link": "N/A",
      "date_posted": "Jul 05"
    },
    {
      "company": "J. P. Morgan",
      "role": "Software Engineer Intern 🛂",
      "location": "Atlanta, GA Chicago, IL Columbus, OH Houston, TX Jersey City, NJ Palo Alto, CA New York, NY Plano, TX Seattle, WA Tampa, FL Austin, TX",
      "link": "N/A",
      "date_posted": "Jul 01"
    },
    {
      "company": "RSM",
      "role": "Application Development Intern 🛂",
      "location": "Des Moines, IA Denver, CO",
      "link": "N/A",
      "date_posted": "Jun 24"
    },
    {
      "company": "Google",
      "role": "Software Engineering Intern",
      "location": "Mountain View, CA, USA Atlanta, GA + 27 more",
      "link": "N/A",
      "date_posted": "Jun 18"
    },
    {
      "company": "Radix Trading",
      "role": "Quantitative Technologist – C++ Intern - Summer 2025",
      "location": "Chicago, IL",
      "link": "N/A",
      "date_posted": "Jun 08"
    },
    {
      "company": "Capstone Investment Advisors",
      "role": "2025 Summer Internship - Investment Research",
      "location": "Cambridge, MA",
      "link": "N/A",
      "date_posted": "May 31"
    },
    {
      "company": "Capstone Investment Advisors",
      "role": "2025 Summer Internship - Investment Quant Development",
      "location": "Cambridge, MA",
      "link": "N/A",
      "date_posted": "May 31"
    },
    {
      "company": "Capstone Investment Advisors",
      "role": "2025 Summer Internship - Quantitative Risk",
      "location": "London, UK",
      "link": "N/A",
      "date_posted": "May 31"
    },
    {
      "company": "Capstone Investment Advisors",
      "role": "2025 Summer Internship - Quantitative Risk",
      "location": "NYC",
      "link": "N/A",
      "date_posted": "May 31"
    },
    {
      "company": "Capstone Investment Advisors",
      "role": "2025 Summer Internship - Investment Research",
      "location": "London, UK",
      "link": "N/A",
      "date_posted": "May 31"
    },
    {
      "company": "Capstone Investment Advisors",
      "role": "2025 Summer Internship - Investment Research",
      "location": "NYC",
      "link": "N/A",
      "date_posted": "May 31"
    },
    {
      "company": "Capstone Investment Advisors",
      "role": "2025 Summer Internship - Investment Quant Development",
      "location": "NYC",
      "link": "N/A",
      "date_posted": "May 31"
    },
    {
      "company": "Capstone Investment Advisors",
      "role": "2025 Summer Internship - Software Engineering",
      "location": "NYC",
      "link": "N/A",
      "date_posted": "May 31"
    },
    {
      "company": "Capstone Investment Advisors",
      "role": "2025 Summer Internship - Investment Quant Development",
      "location": "London, UK",
      "link": "N/A",
      "date_posted": "May 31"
    },
    {
      "company": "Ventas",
      "role": "Software Engineer Intern",
      "location": "NYC",
      "link": "N/A",
      "date_posted": "May 26"
    },
    {
      "company": "Walmart",
      "role": "2025 Summer Intern: Software Engineer II",
      "location": "Bentonville, AR, Sunnyvale, CA",
      "link": "N/A",
      "date_posted": "Apr 30"
    },
    {
      "company": "Divergent",
      "role": "Summer 2025 Internship Program - Engineering",
      "location": "Carson, CA",
      "link": "N/A",
      "date_posted": "Apr 26"
    },
    {
      "company": "DriveTime",
      "role": "Control Design Intern",
      "location": "Dallas, TX",
      "link": "N/A",
      "date_posted": "Mar 27"
    }
  ];

  export default listings;