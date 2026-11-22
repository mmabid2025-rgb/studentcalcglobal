const UNIVERSITIES = [
  {
    "country": "Pakistan",
    "name": "National University of Sciences & Technology (NUST)",
    "city": "Islamabad",
    "type": "Public",
    "fields": [
      "Engineering",
      "Computer Science",
      "AI",
      "Business"
    ],
    "url": "https://nust.edu.pk/",
    "source": "https://www.hec.gov.pk/Site/HEIs/default.aspx",
    "sourceLabel": "HEC recognised institutions"
  },
  {
    "country": "Pakistan",
    "name": "Quaid-i-Azam University",
    "city": "Islamabad",
    "type": "Public",
    "fields": [
      "Computer Science",
      "Natural Sciences",
      "Social Sciences"
    ],
    "url": "https://qau.edu.pk/",
    "source": "https://www.hec.gov.pk/Site/HEIs/default.aspx",
    "sourceLabel": "HEC recognised institutions"
  },
  {
    "country": "Pakistan",
    "name": "National University of Computer and Emerging Sciences (FAST-NUCES)",
    "city": "Islamabad (multi-campus)",
    "type": "Public-sector chartered",
    "fields": [
      "Computer Science",
      "AI",
      "Engineering",
      "Business"
    ],
    "url": "https://www.nu.edu.pk/",
    "source": "https://www.hec.gov.pk/Site/HEIs/default.aspx",
    "sourceLabel": "HEC recognised institutions"
  },
  {
    "country": "Pakistan",
    "name": "COMSATS University Islamabad",
    "city": "Islamabad (multi-campus)",
    "type": "Public",
    "fields": [
      "Computer Science",
      "AI",
      "Engineering",
      "Business"
    ],
    "url": "https://www.comsats.edu.pk/",
    "source": "https://www.hec.gov.pk/Site/HEIs/default.aspx",
    "sourceLabel": "HEC recognised institutions"
  },
  {
    "country": "Pakistan",
    "name": "University of the Punjab",
    "city": "Lahore",
    "type": "Public",
    "fields": [
      "Computer Science",
      "Engineering",
      "Business",
      "Medicine",
      "Arts"
    ],
    "url": "https://pu.edu.pk/",
    "source": "https://www.hec.gov.pk/Site/HEIs/default.aspx",
    "sourceLabel": "HEC recognised institutions"
  },
  {
    "country": "Pakistan",
    "name": "University of Engineering and Technology (UET) Lahore",
    "city": "Lahore",
    "type": "Public",
    "fields": [
      "Engineering",
      "Computer Science",
      "AI"
    ],
    "url": "https://uet.edu.pk/",
    "source": "https://www.hec.gov.pk/Site/HEIs/default.aspx",
    "sourceLabel": "HEC recognised institutions"
  },
  {
    "country": "Pakistan",
    "name": "Lahore University of Management Sciences (LUMS)",
    "city": "Lahore",
    "type": "Private",
    "fields": [
      "Computer Science",
      "Business",
      "Economics",
      "Law"
    ],
    "url": "https://lums.edu.pk/",
    "source": "https://www.hec.gov.pk/Site/HEIs/default.aspx",
    "sourceLabel": "HEC recognised institutions"
  },
  {
    "country": "Pakistan",
    "name": "Aga Khan University",
    "city": "Karachi",
    "type": "Private",
    "fields": [
      "Medicine",
      "Health Sciences",
      "Education"
    ],
    "url": "https://www.aku.edu/",
    "source": "https://www.hec.gov.pk/Site/HEIs/default.aspx",
    "sourceLabel": "HEC recognised institutions"
  },
  {
    "country": "Pakistan",
    "name": "Institute of Business Administration (IBA) Karachi",
    "city": "Karachi",
    "type": "Public",
    "fields": [
      "Business",
      "Computer Science",
      "Economics"
    ],
    "url": "https://www.iba.edu.pk/",
    "source": "https://www.hec.gov.pk/Site/HEIs/default.aspx",
    "sourceLabel": "HEC recognised institutions"
  },
  {
    "country": "Pakistan",
    "name": "Ghulam Ishaq Khan Institute (GIKI)",
    "city": "Topi, Khyber Pakhtunkhwa",
    "type": "Private",
    "fields": [
      "Engineering",
      "Computer Science",
      "AI"
    ],
    "url": "https://giki.edu.pk/",
    "source": "https://www.hec.gov.pk/Site/HEIs/default.aspx",
    "sourceLabel": "HEC recognised institutions"
  },
  {
    "country": "Germany",
    "name": "Technical University of Munich (TUM)",
    "city": "Munich",
    "type": "Public",
    "fields": [
      "Engineering",
      "Computer Science",
      "AI",
      "Natural Sciences"
    ],
    "url": "https://www.tum.de/en/",
    "source": "https://www.hochschulkompass.de/en/higher-education-institutions.html",
    "sourceLabel": "Hochschulkompass institution search"
  },
  {
    "country": "Germany",
    "name": "Ludwig Maximilian University of Munich (LMU)",
    "city": "Munich",
    "type": "Public",
    "fields": [
      "Computer Science",
      "Medicine",
      "Natural Sciences",
      "Humanities"
    ],
    "url": "https://www.lmu.de/en/",
    "source": "https://www.hochschulkompass.de/en/higher-education-institutions.html",
    "sourceLabel": "Hochschulkompass institution search"
  },
  {
    "country": "Germany",
    "name": "Heidelberg University",
    "city": "Heidelberg",
    "type": "Public",
    "fields": [
      "Medicine",
      "Computer Science",
      "Natural Sciences",
      "Humanities"
    ],
    "url": "https://www.uni-heidelberg.de/en",
    "source": "https://www.hochschulkompass.de/en/higher-education-institutions.html",
    "sourceLabel": "Hochschulkompass institution search"
  },
  {
    "country": "Germany",
    "name": "RWTH Aachen University",
    "city": "Aachen",
    "type": "Public",
    "fields": [
      "Engineering",
      "Computer Science",
      "Natural Sciences"
    ],
    "url": "https://www.rwth-aachen.de/go/id/a/?lidx=1",
    "source": "https://www.hochschulkompass.de/en/higher-education-institutions.html",
    "sourceLabel": "Hochschulkompass institution search"
  },
  {
    "country": "Germany",
    "name": "TU Berlin",
    "city": "Berlin",
    "type": "Public",
    "fields": [
      "Engineering",
      "Computer Science",
      "Architecture",
      "Business"
    ],
    "url": "https://www.tu.berlin/en/",
    "source": "https://www.hochschulkompass.de/en/higher-education-institutions.html",
    "sourceLabel": "Hochschulkompass institution search"
  },
  {
    "country": "Germany",
    "name": "University of Hamburg",
    "city": "Hamburg",
    "type": "Public",
    "fields": [
      "Computer Science",
      "Business",
      "Law",
      "Natural Sciences"
    ],
    "url": "https://www.uni-hamburg.de/en.html",
    "source": "https://www.hochschulkompass.de/en/higher-education-institutions.html",
    "sourceLabel": "Hochschulkompass institution search"
  },
  {
    "country": "Germany",
    "name": "University of Passau",
    "city": "Passau",
    "type": "Public",
    "fields": [
      "Computer Science",
      "Business",
      "Law",
      "Social Sciences"
    ],
    "url": "https://www.uni-passau.de/en/",
    "source": "https://www.hochschulkompass.de/en/higher-education-institutions.html",
    "sourceLabel": "Hochschulkompass institution search"
  },
  {
    "country": "Germany",
    "name": "University of Augsburg",
    "city": "Augsburg",
    "type": "Public",
    "fields": [
      "Computer Science",
      "Business",
      "Law",
      "Natural Sciences"
    ],
    "url": "https://www.uni-augsburg.de/en/",
    "source": "https://www.hochschulkompass.de/en/higher-education-institutions.html",
    "sourceLabel": "Hochschulkompass institution search"
  },
  {
    "country": "Romania",
    "name": "University of Bucharest",
    "city": "Bucharest",
    "type": "Public",
    "fields": [
      "Computer Science",
      "Medicine",
      "Business",
      "Humanities"
    ],
    "url": "https://unibuc.ro/?lang=en",
    "source": "https://www.edu.ro/institutii-invatamant-superior",
    "sourceLabel": "Romanian Ministry of Education"
  },
  {
    "country": "Romania",
    "name": "Babeș-Bolyai University",
    "city": "Cluj-Napoca",
    "type": "Public",
    "fields": [
      "Computer Science",
      "Business",
      "Medicine",
      "Social Sciences"
    ],
    "url": "https://www.ubbcluj.ro/en/",
    "source": "https://www.edu.ro/institutii-invatamant-superior",
    "sourceLabel": "Romanian Ministry of Education"
  },
  {
    "country": "Romania",
    "name": "Politehnica University of Bucharest",
    "city": "Bucharest",
    "type": "Public",
    "fields": [
      "Engineering",
      "Computer Science",
      "AI"
    ],
    "url": "https://upb.ro/",
    "source": "https://www.edu.ro/institutii-invatamant-superior",
    "sourceLabel": "Romanian Ministry of Education"
  },
  {
    "country": "Romania",
    "name": "West University of Timișoara",
    "city": "Timișoara",
    "type": "Public",
    "fields": [
      "Computer Science",
      "Business",
      "Natural Sciences",
      "Arts"
    ],
    "url": "https://www.uvt.ro/en/",
    "source": "https://www.studyinromania.gov.ro/universities",
    "sourceLabel": "Study in Romania official directory"
  },
  {
    "country": "Romania",
    "name": "Alexandru Ioan Cuza University",
    "city": "Iași",
    "type": "Public",
    "fields": [
      "Computer Science",
      "Business",
      "Law",
      "Natural Sciences"
    ],
    "url": "https://www.uaic.ro/en/",
    "source": "https://www.edu.ro/institutii-invatamant-superior",
    "sourceLabel": "Romanian Ministry of Education"
  },
  {
    "country": "Romania",
    "name": "Transilvania University of Brașov",
    "city": "Brașov",
    "type": "Public",
    "fields": [
      "Engineering",
      "Computer Science",
      "Medicine",
      "Business"
    ],
    "url": "https://www.unitbv.ro/en/",
    "source": "https://www.studyinromania.gov.ro/universities",
    "sourceLabel": "Study in Romania official directory"
  },
  {
    "country": "Romania",
    "name": "University of Craiova",
    "city": "Craiova",
    "type": "Public",
    "fields": [
      "Computer Science",
      "Engineering",
      "Business",
      "Agriculture"
    ],
    "url": "https://www.ucv.ro/en/",
    "source": "https://www.edu.ro/institutii-invatamant-superior",
    "sourceLabel": "Romanian Ministry of Education"
  },
  {
    "country": "Romania",
    "name": "1 Decembrie 1918 University of Alba Iulia",
    "city": "Alba Iulia",
    "type": "Public",
    "fields": [
      "Computer Science",
      "Business",
      "Humanities",
      "Social Sciences"
    ],
    "url": "https://www.uab.ro/",
    "source": "https://www.studyinromania.gov.ro/universities",
    "sourceLabel": "Study in Romania official directory"
  }
];