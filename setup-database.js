const { MongoClient } = require('mongodb');

// MongoDB connection string — set MONGODB_URI in your environment (never commit it).
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI. Run: MONGODB_URI="your-connection-string" node setup-database.js');
  process.exit(1);
}

// Personal Details based on Saurabh Chauhan's resume
const personalDetails = {
  name: "Saurabh Chauhan",
  logo: "/images/logo-dark.svg",
  about: "Full Stack Developer",
  socialMedia: [
    {
      link: "https://github.com/SaurabhChauhan5",
      image_file: "/images/icons/github.svg",
      alt_text: "GitHub"
    },
    {
      link: "https://www.linkedin.com/in/saurabhchauhaan/",
      image_file: "/images/icons/linkedin.svg",
      alt_text: "LinkedIn"
    },
    {
      link: "mailto:saurabhchauhan2973@gmail.com",
      image_file: "/images/icons/mail.svg",
      alt_text: "Email"
    },
    {
      link: "tel:+918445076426",
      image_file: "/images/icons/call.svg",
      alt_text: "Phone"
    }
  ],
  work: {
    company: "Skill Savvy Interns",
    designation: "Front-End Web Development Intern",
    logo: "/images/companies/skill-savvy.png"
  },
  resume: "/Saurabh_Chauhan_Resume.pdf",
  profile_img: "/images/bob.png",
  calendyUrl: "https://calendly.com/saurabhchauhan"
};

// Projects based on Saurabh Chauhan's resume
const projects = [
  {
    title: "IoT-based Intelligent Voice Companion",
    description: "Built a portable voice assistant device using ESP32, enabling real-time speech-to-answer response via cloud APIs. Led hardware integration and API setup for Deepgram (STT), Gemini AI, and Google TTS. Optimized ESP32 code and conducted full system testing for reliable audio interaction. Contributed to R&D and planning within a 4-member team.",
    image: "/images/projects/iot-voice-companion.webp",
    github: "https://github.com/SaurabhChauhan5/IoT-Voice-Companion",
    external: "#",
    tech: ["ESP32", "Deepgram API", "Gemini AI", "Google TTS", "IoT"],
    date: "May 2025"
  },
  {
    title: "Data-Driven Deals: Unveiling Sales Insights with Tableau",
    description: "Designed a tableau dashboard to understand Business goods sales trends. The final dashboard was effective at displaying the sales trend of Business, allowing users to understand the data and make informed decisions. This dashboard could help in increasing the revenue at least by 7% in the next quarter.",
    image: "/images/projects/tableau-dashboard.webp",
    github: "https://github.com/SaurabhChauhan5/Tableau-Sales-Dashboard",
    external: "#",
    tech: ["Tableau", "Data Visualization", "Business Intelligence", "Sales Analytics"],
    date: "June 2024 - July 2024"
  },
  {
    title: "FlashQuiz",
    description: "FlashQuiz is a simple and responsive web-based quiz application built using HTML, CSS, and JavaScript. Features include trivia questions from API, interactive UI, and real-time scoring system.",
    image: "/images/projects/flashquiz.webp",
    github: "https://github.com/SaurabhChauhan5/FlashQuiz",
    external: "https://saurabhchauhan5.github.io/FlashQuiz/",
    tech: ["React.js", "HTML5", "JavaScript", "CSS", "Trivia API"],
    date: "May 2025"
  },
  {
    title: "AMart Store",
    description: "A full-stack grocery application using the MERN stack for complete product management (add, retrieve, update). Integrated Cloudinary for image storage and JWT-based authentication for secure access.",
    image: "/images/projects/amart-store.webp",
    github: "https://github.com/SaurabhChauhan5/AMartClient",
    external: "https://amart-tau.vercel.app/",
    tech: ["Node/Express", "ReactJS", "MongoDB", "Cloudinary"],
    date: "November 2022"
  },
  {
    title: "E-Commerce Website Design",
    description: "Built a responsive e-commerce website featuring product Browse, shopping cart, and checkout functionalities. Designed a clean, intuitive, and responsive user interface.",
    image: "/images/projects/ecommerce.webp",
    github: "https://github.com/SaurabhChauhan5/E-Commerce",
    external: "https://saurabhchauhan5.github.io/E-Commerce/",
    tech: ["HTML", "CSS", "JavaScript"],
    date: "August 2024"
  },
  {
    title: "Movie Recommender System",
    description: "Offers personalized movie recommendations by analyzing content attributes like crew and title. Built using Streamlit to provide an interactive and intuitive web app experience.",
    image: "/images/projects/movie-recommender.webp",
    github: "https://github.com/SaurabhChauhan5/Movie-Recommender",
    external: "https://saurabhchauhan29-movie-recommender.hf.space/",
    tech: ["Python", "Streamlit", "Content-Based Filtering"],
    date: "July 2023 - October 2023"
  }
];

// Companies/Work Experience
const companies = [
  {
    name: "Skill Savvy Interns",
    designation: "Front-End Web Development Intern",
    type: "Internship",
    duration: "Aug 2024 - Oct 2024",
    location: "Remote",
    logo: "/images/companies/skill-savvy.png",
    description: "Developed user-friendly interfaces using HTML, CSS, and JavaScript. Collaborated with backend developers on API integration and managed version control with Git. Resolved performance issues and applied Agile methodologies for project management.",
    order: 1
  }
];

async function setupDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    
    // Clear existing data
    await db.collection('details').deleteMany({});
    await db.collection('projects').deleteMany({});
    await db.collection('companies').deleteMany({});
    
    // Insert personal details
    await db.collection('details').insertOne(personalDetails);
    console.log('✅ Personal details inserted');
    
    // Insert projects
    await db.collection('projects').insertMany(projects);
    console.log('✅ Projects inserted');
    
    // Insert companies
    await db.collection('companies').insertMany(companies);
    console.log('✅ Companies inserted');
    
    console.log('🎉 Database setup completed successfully!');
    
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await client.close();
  }
}

setupDatabase(); 