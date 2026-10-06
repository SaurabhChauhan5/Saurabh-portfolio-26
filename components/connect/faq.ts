import { ACTIVE_WEBSITES, AGENCY, CLIENT_LOCATIONS, PROFILE } from '@utils/data';

// Answers use only facts stated elsewhere on the site. Also emitted as FAQPage schema.
const CONTACT_FAQ = [
  {
    q: 'Which platforms do you work with?',
    a: 'HTML and custom-built websites, WordPress, Shopify and Wix. I adapt the SEO approach to the technical constraints and structure of each platform.'
  },
  {
    q: 'Do you work with Australian businesses?',
    a: `Yes. I currently manage SEO across ${ACTIVE_WEBSITES} active Australian business websites at ${
      AGENCY.name
    }, mostly local and service businesses in ${CLIENT_LOCATIONS.join(' and ')}.`
  },
  {
    q: 'What SEO work do you cover?',
    a: 'Technical, on-page, off-page, local and eCommerce SEO: technical audits, crawlability and indexability, XML sitemaps, robots.txt, canonical tags, schema markup, Core Web Vitals, Google Business Profile, local citations and link building.'
  },
  {
    q: 'Which tools do you use?',
    a: 'Google Search Console, GA4, SEMrush, PageSpeed Insights, Rank Math and Yoast SEO, plus Google Business Profile for local SEO.'
  },
  {
    q: 'Where are you based?',
    a: `${PROFILE.location}. I work remotely with Australian businesses.`
  },
  {
    q: 'What is the best way to contact you?',
    a: `Email is the quickest: ${PROFILE.email}. You can also call ${PROFILE.phone} or message me on LinkedIn.`
  }
];

export default CONTACT_FAQ;
