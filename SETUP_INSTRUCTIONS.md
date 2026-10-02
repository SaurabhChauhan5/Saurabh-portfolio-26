# Portfolio Setup Instructions

This portfolio has been customized for Saurabh Chauhan. Follow these steps to set it up:

## 1. Environment Setup

Create a `.env.local` file in the root directory with your MongoDB connection string:

```env
MONGODB_URI=your-mongodb-connection-string
BASE_URL=https://your-domain.com
```

## 2. Database Setup

The portfolio uses MongoDB to store:
- Personal details
- Projects
- Work experience/Companies

Run the database setup script:

```bash
node setup-database.js
```

Set `MONGODB_URI` in your environment (or `.env`) before running the script; it is never stored in the code.

## 3. Assets Setup

### Profile Image
Replace `/public/images/bob.png` with your profile image.

### Project Images
Add your project images to `/public/images/projects/`:
- `amart-store.webp`
- `ecommerce.webp`
- `movie-recommender.webp`

### Company Logo
Add company logos to `/public/images/companies/`:
- `skill-savvy.png`

### Resume
Add your resume PDF to `/public/Saurabh_Chauhan_Resume.pdf`

## 4. Customization

### Personal Information
The following files have been updated with your information:
- `pages/_app.tsx` - Meta tags and title
- `package.json` - Author information
- `README.md` - Project description
- `LICENSE` - Copyright notice
- All API endpoints and components

### Skills and Technologies
Updated in:
- `shared/utils/constants.ts` - Technology list
- `shared/utils/words.tsx` - Word cloud content

### Social Media Links
Your social media links are configured in the database setup script:
- GitHub: https://github.com/SaurabhChauhan5
- LinkedIn: https://www.linkedin.com/in/saurabhchauhaan/
- Email: saurabhchauhan2973@gmail.com
- Phone: +91 8445076426

## 5. Running the Portfolio

Install dependencies:
```bash
yarn install
```

Run in development mode:
```bash
yarn dev
```

Build for production:
```bash
yarn build
```

Start production server:
```bash
yarn start
```

## 6. Deployment

The portfolio is ready to be deployed to platforms like:
- Vercel
- Netlify
- AWS
- Heroku

Make sure to set the environment variables in your deployment platform.

## 7. Customization Notes

### Projects
The projects section includes:
1. **AMart Store** - MERN stack grocery application
2. **E-Commerce Website** - HTML/CSS/JS e-commerce site
3. **Movie Recommender System** - Python/Streamlit ML application

### Work Experience
Currently includes your internship at Skill Savvy Interns.

### Skills
The skills section reflects your technical expertise from your resume:
- Frontend: HTML, CSS, JavaScript, ReactJS
- Backend: NodeJS, ExpressJS, MongoDB
- Other: Git, Python, Machine Learning

## 8. Analytics and Tracking

The portfolio includes:
- Google Analytics (update the tracking ID in `_app.tsx`)
- Hotjar (update the ID in `_app.tsx`)

## 9. SEO and Meta Tags

All meta tags have been updated with your information:
- Title: "Saurabh Chauhan | Software Developer"
- Description: Updated to reflect your expertise
- Open Graph and Twitter cards configured

## 10. Contact Information

Update the Calendly URL in the database setup script if you want to use a different scheduling tool.

---

Your portfolio is now ready! The design and functionality remain the same, but all content has been personalized for you. 