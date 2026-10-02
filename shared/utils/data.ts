import {
  CaseStudy,
  ExpertiseGroup,
  Platform,
  PlatformExperience,
  Project,
  Role,
  SocialLink
} from './types';

// Single source of truth for portfolio content. Every fact here comes from
// Saurabh's verified details — do not add metrics or results that aren't provided.

export const SITE_URL = 'https://sorab.vercel.app';

// Replace this file in /public with the latest SEO Specialist resume.
export const RESUME_PATH = '/Saurabh_Chauhan_Resume.pdf';

export const AGENCY = { name: 'AAA Digital', url: 'https://aaadigital.com.au/' };

export const PROFILE = {
  name: 'Saurabh Chauhan',
  title: 'SEO Specialist',
  positioning: 'SEO Specialist | Technical SEO | Web Performance',
  focusAreas: ['Technical SEO', 'Local SEO', 'eCommerce SEO', 'Web Performance'],
  summary:
    'I optimize websites for better crawlability, indexability, search visibility, performance, and organic growth across HTML, WordPress, Shopify, and Wix.',
  credibility: 'Managing SEO across 24 active Australian business websites',
  differentiator:
    'SEO Specialist with a Computer Science and Front-End Development background, combining technical SEO expertise with hands-on web development knowledge.',
  location: 'Gurugram, Haryana, India',
  locality: 'Gurugram',
  region: 'Haryana',
  country: 'IN',
  email: 'saurabhchauhan2973@gmail.com',
  phone: '+91 8445076426',
  phoneHref: 'tel:+918445076426',
  github: 'https://github.com/SaurabhChauhan5',
  linkedin: 'https://www.linkedin.com/in/saurabhchauhaan/'
};

export const SEO_DEFAULTS = {
  title: 'Saurabh Chauhan | SEO Specialist · Technical SEO & Web Performance',
  description:
    'SEO Specialist in Gurugram, India, managing SEO for 24 active Australian business websites: technical, local and eCommerce SEO across HTML, WordPress, Shopify and Wix.'
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'LinkedIn', href: PROFILE.linkedin, icon: '/images/icons/linkedin.svg' },
  { label: 'GitHub', href: PROFILE.github, icon: '/images/icons/github.svg' },
  { label: 'Email', href: `mailto:${PROFILE.email}`, icon: '/images/icons/mail.svg' },
  { label: 'Phone', href: PROFILE.phoneHref, icon: '/images/icons/call.svg' }
];

// `section` links scroll to a section on the home page; the rest are full pages.
export const NAV_LINKS: { title: string; href: string; section?: string; match?: string[] }[] = [
  { title: 'About', href: '/#about', section: 'about' },
  { title: 'Expertise', href: '/#expertise', section: 'expertise' },
  { title: 'Case Studies', href: '/case-studies' },
  { title: 'Clients', href: '/clients' },
  { title: 'Experience', href: '/experience' },
  { title: 'Projects', href: '/projects', match: ['/project/[slug]'] },
  { title: 'Contact', href: '/connect' }
];

export const STATS = [
  { value: 24, suffix: '', label: 'Active Australian Business Websites' },
  {
    value: 28,
    suffix: '',
    label: 'Business Websites Managed in Total',
    note: '24 active + 4 previous'
  },
  {
    value: 1190,
    suffix: '+',
    label: 'Indexed Pages Achieved',
    note: 'from approximately 164 previously'
  },
  {
    value: 4,
    suffix: '',
    label: 'Web Platforms Worked With',
    note: 'HTML • WordPress • Shopify • Wix'
  },
  { value: 1, suffix: '+', label: 'Year of Professional SEO Experience' }
];

export const ABOUT_AREAS = [
  'Technical SEO',
  'Crawlability & indexability',
  'XML sitemaps',
  'robots.txt',
  'Canonical tags',
  'Schema / structured data',
  'Internal linking',
  'Core Web Vitals',
  'PageSpeed optimization',
  'Google Search Console',
  'GA4',
  'SEMrush',
  'Local SEO',
  'Google Business Profiles',
  'Link building / off-page SEO',
  'WordPress',
  'Shopify',
  'Wix',
  'Custom HTML websites'
];

export const EXPERTISE: ExpertiseGroup[] = [
  {
    title: 'Technical SEO',
    icon: 'settings',
    items: [
      'Technical SEO Audits',
      'Crawlability',
      'Indexability',
      'XML Sitemaps',
      'robots.txt',
      'Canonical Tags',
      'Schema Markup',
      'Structured Data',
      'Internal Linking',
      'Website Architecture',
      'Core Web Vitals',
      'PageSpeed Optimization',
      'Technical Issue Resolution'
    ]
  },
  {
    title: 'On-Page SEO',
    icon: 'file',
    items: [
      'Title Tags',
      'Meta Descriptions',
      'Heading Structure',
      'Semantic HTML',
      'Internal Linking',
      'Content Optimization',
      'Keyword Optimization',
      'SEO-friendly Landing Pages'
    ]
  },
  {
    title: 'Local SEO',
    icon: 'pin',
    items: [
      'Google Business Profiles',
      'Local Citations',
      'Business Listings',
      'Australian Local Directories',
      'Local Search Optimization'
    ]
  },
  {
    title: 'eCommerce SEO',
    icon: 'bag',
    items: [
      'Shopify SEO',
      'Product/Collection Optimization',
      'Website Structure',
      'Metadata',
      'Internal Linking',
      'Indexing',
      'Technical Optimization'
    ]
  },
  {
    title: 'Off-Page SEO',
    icon: 'link',
    items: [
      'Link Building',
      'Backlink Research',
      'Competitor Backlink Analysis',
      'Link Opportunities',
      'Citation Building'
    ]
  },
  {
    title: 'Analytics & Tools',
    icon: 'chart',
    items: [
      'Google Search Console',
      'GA4',
      'SEMrush',
      'PageSpeed Insights',
      'Rank Math',
      'Git/GitHub'
    ]
  }
];

export const PLATFORMS: Platform[] = [
  {
    name: 'HTML / Custom Websites',
    short: '</>',
    description:
      'SEO-friendly landing pages, semantic structure, metadata and technical implementation.'
  },
  {
    name: 'WordPress',
    short: 'WP',
    description:
      'Technical SEO, content optimization, schema, indexing, performance and website customization.'
  },
  {
    name: 'Shopify',
    short: 'SH',
    description:
      'eCommerce SEO, technical optimization, metadata, structure, internal linking and indexing.'
  },
  {
    name: 'Wix',
    short: 'WX',
    description: 'SEO optimization, website structure, metadata and on-page improvements.'
  }
];

export const INDEXATION = { before: 164, after: 1190 };

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'indexation-growth',
    number: '01',
    title: 'Indexation Growth: 164 → 1,190+ Pages',
    context: 'Australian business client website',
    problem: 'A large number of pages were not being indexed effectively.',
    work: [
      'Investigated crawl and indexability issues',
      'Optimized XML sitemap configuration',
      'Improved internal linking',
      'Implemented technical SEO improvements',
      'Monitored indexing through Google Search Console'
    ],
    result: 'Indexed pages increased from approximately 164 to 1,190+.'
  },
  {
    id: 'multi-platform',
    number: '02',
    title: 'Multi-Platform Technical SEO',
    context: 'Client websites built on HTML, WordPress, Shopify and Wix',
    work: [
      'Technical SEO audits adapted to the constraints of each platform',
      'Metadata, website structure and internal linking',
      'Indexing checks, XML sitemaps and robots.txt',
      'Schema markup and performance optimization, where the platform allows'
    ]
  },
  {
    id: 'local-seo',
    number: '03',
    title: 'Local SEO & Australian Business Optimization',
    context: 'Australian local and service businesses',
    work: [
      'Google Business Profile management and optimization',
      'Local citations and business listings',
      'Australian business directories',
      'Local on-page optimization',
      'Website optimization to support local search visibility'
    ]
  }
];

export const MULTI_PLATFORM_EXAMPLES = [
  { platform: 'Shopify', sites: ['Deesarina', 'INCIA Australia', 'D’Olive Australia'] },
  { platform: 'Wix', sites: ['Ettinka', 'Maria Projects'] },
  {
    platform: 'WordPress',
    sites: ['HSK Blind', 'SydCity Glass', 'Other WordPress client websites']
  },
  { platform: 'HTML', sites: ['SEO-friendly custom landing pages'] }
];

// From the client master register (Oct 2026): 24 active websites = 23 client
// businesses + AAA Digital's own site; 28 in total including 4 previous clients.
// Industry counts are active clients only.
export const ACTIVE_WEBSITES = 24;
export const ACTIVE_CLIENT_BUSINESSES = 23;
export const TOTAL_WEBSITES = 28; // 24 active + 4 inactive (previous) clients
export const PREVIOUS_CLIENTS = 4;
export const CLIENT_LOCATIONS = ['Sydney & NSW', 'Brisbane, QLD'];

export const INDUSTRIES = [
  { name: 'Glass & Glazing', icon: 'layers', count: 8 },
  { name: 'Removals', icon: 'truck', count: 7 },
  { name: 'Roofing & Construction', icon: 'home', count: 2 },
  { name: 'Blinds', icon: 'grid', count: 1 },
  { name: 'Electrical', icon: 'zap', count: 1 },
  { name: 'Cleaning', icon: 'droplet', count: 1 },
  { name: 'Car Detailing', icon: 'tool', count: 1 },
  { name: 'Sports Retail', icon: 'bag', count: 1 },
  { name: 'Other Local Business', icon: 'pin', count: 1 }
];

// Service scope of the 23 active client businesses ("GMB Only" in the register).
export const SERVICE_SCOPE = [
  { label: 'Full SEO service', count: 22 },
  { label: 'Google Business Profile management only', count: 1 }
];

export const PLATFORM_EXPERIENCE: PlatformExperience[] = [
  {
    platform: 'Shopify',
    heading: 'Shopify & eCommerce SEO',
    intro:
      'I have hands-on Shopify/eCommerce SEO experience across active and previous client projects.',
    sites: [
      { name: 'Deesarina', url: 'https://deesarina.com', status: 'current' },
      { name: 'INCIA Australia', status: 'previous' },
      { name: 'D’Olive Australia', status: 'previous' }
    ],
    othersNote: 'Other Shopify websites',
    work: [
      'Technical SEO',
      'Metadata',
      'Website structure',
      'Internal linking',
      'Indexing',
      'On-page optimization',
      'SEO improvements'
    ]
  },
  {
    platform: 'WordPress',
    heading: 'WordPress SEO',
    intro:
      'I have hands-on WordPress SEO experience across client websites, covering the areas below.',
    sites: [
      { name: 'HSK Blind', url: 'https://hskblind.com.au/', status: 'current' },
      { name: 'SydCity Glass', url: 'https://sydcityglass.com.au/', status: 'current' }
    ],
    othersNote: 'Other WordPress client websites',
    work: [
      'Technical SEO',
      'On-page SEO',
      'Metadata',
      'Internal linking',
      'Indexing',
      'Schema',
      'Performance optimization'
    ]
  },
  {
    platform: 'Wix',
    heading: 'Wix SEO',
    intro: 'I carry out SEO work on Wix client websites, focused on the areas below.',
    sites: [
      { name: 'Ettinka', status: 'previous' },
      { name: 'Maria Projects', status: 'previous' }
    ],
    work: ['SEO optimization', 'Website structure', 'Metadata', 'On-page improvements']
  }
];

export const EXPERIENCE: Role[] = [
  {
    company: 'I Market & Manage Private Limited (AAA Digital), Australia',
    companyUrl: 'https://aaadigital.com.au/',
    position: 'SEO Specialist',
    startDate: 'Aug 2025',
    location: 'Gurugram, Haryana | Remote',
    kind: 'seo',
    responsibilities: [
      'Manage end-to-end SEO across 24 active Australian business websites.',
      'Work across HTML, WordPress, Shopify and Wix websites.',
      'Conduct technical SEO audits covering crawlability, indexability, XML sitemaps, robots.txt, canonical tags, schema markup, Core Web Vitals and PageSpeed performance.',
      'Build and optimize SEO-friendly HTML landing pages.',
      'Customize WordPress and Shopify websites for SEO and performance.',
      'Manage Local SEO and Google Business Profiles.',
      'Work on local citations and Australian business directories.',
      'Monitor organic search performance, indexing and keyword visibility using Google Search Console, GA4, SEMrush and PageSpeed Insights.',
      'Perform on-page and off-page SEO, including link-building activities.',
      'Guide developers and teammates on technical SEO requirements, implementation priorities and website optimization fixes.',
      'Use AI-assisted workflows for SEO metadata and repetitive optimization tasks.'
    ]
  },
  {
    company: 'I Market & Manage Private Limited (AAA Digital), Australia',
    companyUrl: 'https://aaadigital.com.au/',
    position: 'Digital Marketing & Operations Executive',
    startDate: 'Jun 2025',
    endDate: 'Aug 2025',
    location: 'Gurugram, Haryana',
    kind: 'seo',
    responsibilities: [
      'Managed Local SEO and business listings.',
      'Updated websites and product listings.',
      'Conducted competitor research.',
      'Supported digital marketing and performance reporting.',
      'Worked with website/content teams on optimization requirements.'
    ]
  },
  {
    company: 'Skill Savvy Interns',
    position: 'Front-End Web Development Intern',
    startDate: 'Aug 2024',
    endDate: 'Oct 2024',
    location: 'Remote',
    kind: 'development',
    responsibilities: [
      'Developed responsive interfaces using HTML, CSS and JavaScript.',
      'Integrated REST APIs.',
      'Collaborated with backend developers.',
      'Used Git for version control.'
    ]
  }
];

export const PROJECT_CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'Full Stack', label: 'Full Stack' },
  { value: 'Frontend', label: 'Frontend' },
  { value: 'Data Analysis', label: 'Data Analysis' },
  { value: 'Machine Learning', label: 'Machine Learning' },
  { value: 'IoT', label: 'IoT' }
];

export const PROJECTS: Project[] = [
  {
    slug: 'amart-store',
    name: 'AMart Store',
    tagline: 'Full-stack grocery web application',
    description:
      'Full-stack grocery web application with responsive UI, REST APIs, JWT authentication, MongoDB and Cloudinary media integration.',
    highlights: [
      'Complete product management — add, retrieve and update products.',
      'Cloudinary for image hosting and JWT for user authentication.',
      'Robust error handling and input validation to keep data consistent.'
    ],
    img: '/images/projects/amart-store.webp',
    imgAlt: 'AMart Store grocery web application home page',
    tags: ['ReactJS', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary'],
    category: ['Full Stack', 'Frontend'],
    github: 'https://github.com/SaurabhChauhan5/AMartClient',
    githubLabel: 'View on GitHub',
    url: 'https://amart-tau.vercel.app/',
    featured: true
  },
  {
    slug: 'ecommerce-website',
    name: 'E-Commerce Website Design',
    tagline: 'Responsive e-commerce website',
    description:
      'Built a responsive e-commerce website with product browsing, a shopping cart and checkout functionality, wrapped in a clean, intuitive user interface.',
    highlights: [
      'Product browsing, shopping cart and checkout flows.',
      'Semantic HTML structure and clean UI principles.',
      'Basic validation and localStorage for session persistence.'
    ],
    img: '/images/projects/ecommerce.webp',
    imgAlt: 'E-commerce website design product listing page',
    tags: ['HTML', 'CSS', 'JavaScript'],
    category: ['Frontend'],
    github: 'https://github.com/SaurabhChauhan5/E-Commerce',
    githubLabel: 'View on GitHub',
    url: 'https://saurabhchauhan5.github.io/E-Commerce/',
    featured: false
  },
  {
    slug: 'movie-recommender',
    name: 'Movie Recommender System',
    tagline: 'ML-based movie recommendations',
    description:
      'Offers personalized movie recommendations by analyzing content attributes such as crew and title. Built with Streamlit to provide an interactive, intuitive web app experience.',
    highlights: [
      'Content-based filtering with cosine similarity.',
      'Interactive Streamlit interface with simple deployment.',
      'Data processing and algorithm design in Python.'
    ],
    img: '/images/projects/movie-recommender.webp',
    imgAlt: 'Movie Recommender System Streamlit interface',
    tags: ['Python', 'Streamlit', 'Content-Based Filtering'],
    category: ['Machine Learning', 'Data Analysis'],
    github: 'https://github.com/SaurabhChauhan5/Movie-Recommender',
    githubLabel: 'View on GitHub',
    url: 'https://saurabhchauhan29-movie-recommender.hf.space/',
    featured: false
  },
  {
    slug: 'iot-voice-companion',
    name: 'IoT-based Intelligent Voice Companion',
    tagline: 'IoT voice assistant built on ESP32',
    description:
      'Built a portable ESP32 voice assistant that listens to spoken questions and answers them in real time through cloud APIs. This was a 4-member team project.',
    highlights: [
      'Led hardware integration and API setup for Deepgram (STT), Gemini AI and Google TTS.',
      'Optimized the ESP32 code and carried out full system testing for reliable audio interaction.',
      'Contributed to R&D and planning within a 4-member team.'
    ],
    img: '/images/projects/iot-voice-companion.webp',
    imgAlt: 'IoT voice companion device built with ESP32',
    tags: ['ESP32', 'Deepgram API', 'Gemini AI', 'Google TTS', 'IoT'],
    category: ['IoT', 'Full Stack'],
    github: 'https://drive.google.com/file/d/1D3mgcx0_QH5aoi_YUj2Z4gfSnAbZjd2j/view?usp=share_link',
    githubLabel: 'View Report',
    url: 'https://docs.google.com/presentation/d/11bogiW8P_Focu_Rfzu3SuwjeNYxzPk52/edit?usp=share_link&ouid=112227338018658698252&rtpof=true&sd=true',
    urlLabel: 'View Presentation',
    featured: false
  },
  {
    slug: 'tableau-sales-dashboard',
    name: 'Data-Driven Deals: Unveiling Sales Insights with Tableau',
    tagline: 'Business intelligence dashboard',
    description:
      'Designed a Tableau dashboard to analyze sales trends for business goods. The dashboard clearly presents the business’s sales trends, helping users understand the data and make informed decisions. It could help increase revenue by at least 7% in the next quarter.',
    highlights: [
      'Interactive Tableau dashboard of business sales trends.',
      'Visualizations designed to support data-informed decisions.'
    ],
    img: '/images/projects/tableau-dashboard.webp',
    imgAlt: 'Tableau sales insights business dashboard',
    tags: ['Tableau', 'Data Visualization', 'Business Intelligence', 'Sales Analytics'],
    category: ['Data Analysis'],
    github: 'https://drive.google.com/file/d/11gC7DXgxFm9O4l9VoDaXRm7ObMlkCOX9/view?usp=share_link',
    githubLabel: 'View on Drive',
    url: 'https://public.tableau.com/app/profile/saurabh.chauhan5396/viz/project_17501468805270/business_dashboard?publish=yes',
    urlLabel: 'View Dashboard',
    featured: false
  },
  {
    slug: 'flashquiz',
    name: 'FlashQuiz',
    tagline: 'Interactive quiz application',
    description:
      'FlashQuiz is a simple, responsive web-based quiz application built with HTML, CSS and JavaScript. It features trivia questions from an API, an interactive UI and a real-time scoring system.',
    highlights: [
      'Trivia questions fetched from an API.',
      'Interactive, responsive UI.',
      'Real-time scoring system.'
    ],
    img: '/images/projects/flashquiz.webp',
    imgAlt: 'FlashQuiz trivia quiz application screen',
    tags: ['React.js', 'HTML5', 'JavaScript', 'CSS', 'Trivia API'],
    category: ['Frontend'],
    github: 'https://github.com/SaurabhChauhan5/FlashQuiz',
    githubLabel: 'View on GitHub',
    url: 'https://flash-quiz-cyan.vercel.app/',
    featured: false
  }
];

// Everything from the original portfolio is kept, plus the stack from the SEO brief.
export const TECH_FOUNDATION: { group: string; items: { name: string; icon?: string }[] }[] = [
  {
    group: 'Web & Front-End',
    items: [
      { name: 'HTML5', icon: '/images/skills/html.svg' },
      { name: 'CSS3', icon: '/images/skills/css.svg' },
      { name: 'JavaScript ES6+', icon: '/images/skills/js.svg' },
      { name: 'ReactJS', icon: '/images/skills/react.svg' },
      { name: 'Next.js', icon: '/images/skills/nextjs.svg' },
      { name: 'Angular', icon: '/images/skills/angular.svg' },
      { name: 'React Native', icon: '/images/skills/react-native.svg' },
      { name: 'Bootstrap' }
    ]
  },
  {
    group: 'Back-End & Data',
    items: [
      { name: 'Node.js', icon: '/images/skills/node.svg' },
      { name: 'Express.js', icon: '/images/skills/express.svg' },
      { name: 'MongoDB', icon: '/images/skills/mongodb.svg' },
      { name: 'SQL', icon: '/images/skills/mysql.png' },
      { name: 'Python', icon: '/images/skills/python.svg' },
      { name: 'Cloudinary', icon: '/images/skills/cloudinary.svg' },
      { name: 'Streamlit', icon: '/images/skills/streamlit.svg' },
      { name: 'Tableau', icon: '/images/skills/tableau.png' }
    ]
  },
  {
    group: 'CMS, Tools & Hardware',
    items: [
      { name: 'WordPress' },
      { name: 'Shopify' },
      { name: 'Git', icon: '/images/skills/git.svg' },
      { name: 'GitHub', icon: '/images/icons/github.svg' },
      { name: 'Figma', icon: '/images/skills/figma.svg' },
      { name: 'ESP32 / IoT', icon: '/images/skills/esp32.png' }
    ]
  }
];

export const EDUCATION = {
  school: 'Graphic Era Hill University',
  degree: 'B.Tech in Computer Science & Engineering',
  dates: 'Jul 2021 – Jun 2025',
  grade: 'CGPA: 7.6/10'
};

// ---------- Client websites (from the client master register, Oct 2026) ----------
// Only business name, website and suburb/city are published — no phone numbers or notes.
export interface ClientWebsite {
  name: string;
  domain: string;
  img: string;
  location?: string;
  platform?: string;
}

const site = (name: string, domain: string, extra: Partial<ClientWebsite> = {}): ClientWebsite => ({
  name,
  domain,
  img: `/images/clients/${domain.replace(/\.com\.au$/, '').replace(/\./g, '-')}.jpg`,
  ...extra
});

export const CLIENT_GROUPS: { industry: string; icon: string; sites: ClientWebsite[] }[] = [
  {
    industry: 'Glass & Glazing',
    icon: 'layers',
    sites: [
      site('SydCity Glass', 'sydcityglass.com.au', {
        location: 'Sydney, NSW',
        platform: 'WordPress'
      }),
      site('Brisbane City Glass', 'brisbanecityglass.com.au', { location: 'Brisbane, QLD' }),
      site('Mighty Glass', 'mightyglass.com.au', { location: 'Sydney, NSW' }),
      site('Alpha Glazier', 'alphaglazier.com.au', { location: 'Sydney, NSW' }),
      site('Glass Squad', 'glasssquad.com.au', { location: 'Sydney, NSW' }),
      site('Alpha Emergency Glass Repairs', 'alphaemergencyglassrepairs.com.au', {
        location: 'Sydney, NSW'
      }),
      site('Fixit Emergency Glass Repairs', 'fixitemergencyglassrepairs.com.au', {
        location: 'Sydney, NSW'
      }),
      site('Olympus Glass', 'olympusglass.com.au')
    ]
  },
  {
    industry: 'Removals',
    icon: 'truck',
    sites: [
      site('State to State Removals', 'statetostateremovals.com.au', { location: 'Sydney, NSW' }),
      site('Campsie Removals', 'campsieremovals.com.au'),
      site('Blacktown Removals', 'blacktownremovals.com.au'),
      site('Casula Movers', 'casulamovers.com.au'),
      site('Parramatta Removals', 'parramattaremovals.com.au'),
      site('Auburn Removals', 'auburnremovals.com.au'),
      site('Desi Removals', 'desiremovals.com.au')
    ]
  },
  {
    industry: 'Roofing & Construction',
    icon: 'home',
    sites: [
      site('ARS Roofing Services', 'arsroofingservices.com.au'),
      site('GoStruction', 'gostruction.com.au')
    ]
  },
  {
    industry: 'Blinds',
    icon: 'grid',
    sites: [
      site('HSK Blind', 'hskblind.com.au', { location: 'Box Hill, NSW', platform: 'WordPress' })
    ]
  },
  {
    industry: 'Electrical',
    icon: 'zap',
    sites: [
      site('Easy Choice Electrical', 'easychoiceelectrical.com.au', { location: 'Sydney, NSW' })
    ]
  },
  {
    industry: 'Car Detailing',
    icon: 'tool',
    sites: [
      site('Five Star Car Detailing', 'fivestarcardetailing.com.au', {
        location: 'Kellyville, NSW'
      })
    ]
  },
  {
    industry: 'Sports Retail',
    icon: 'bag',
    sites: [site('Magic Sports', 'magicsports.com.au', { location: 'Rouse Hill, NSW' })]
  }
];

export const PREVIOUS_CLIENT_SITES: (ClientWebsite & { industry: string })[] = [
  {
    ...site('Apollo Concrete', 'apolloconcrete.com.au', { location: 'Sydney, NSW' }),
    industry: 'Concrete'
  },
  { ...site('Ettinka', 'ettinka.com.au', { platform: 'Wix' }), industry: 'Wellness' },
  {
    ...site('Ecoleaf Tree Services', 'ecoleaftreeservices.com.au'),
    industry: 'Tree Services'
  },
  {
    ...site('Leaking Shower Repairs Sydney', 'leakingshowerrepairs.sydney', {
      location: 'Sydney, NSW'
    }),
    industry: 'Shower Repairs'
  }
];

// Inactive clients with no website in the register. Add a domain here (and move the
// entry to PREVIOUS_CLIENT_SITES with a screenshot) once the URL is known.
export const PREVIOUS_CLIENTS_NO_WEBSITE: string[] = [];

export const AGENCY_SITE = site('AAA Digital', 'aaadigital.com.au', { location: 'Sydney, NSW' });

// Active clients that don't have a public website listed in the register.
export const CLIENTS_WITHOUT_WEBSITE = [
  'a home cleaning business',
  'a Google Business Profile-only client'
];
