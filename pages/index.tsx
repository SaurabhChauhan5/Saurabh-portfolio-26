import { Seo } from '@shared-components';
import { PERSON_ID, WEBSITE_ID, OG_IMAGE } from '../shared/components/seo';
import HomePage from '../components/home/index';
import { EDUCATION, EXPERIENCE, EXPERTISE, PROFILE, SEO_DEFAULTS, SITE_URL } from '@utils/data';

const knowsAbout = Array.from(new Set(EXPERTISE.flatMap((g) => [g.title, ...g.items.slice(0, 4)])));

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: PROFILE.name,
  jobTitle: PROFILE.title,
  description: PROFILE.differentiator,
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  email: `mailto:${PROFILE.email}`,
  telephone: PROFILE.phone.replace(/\s/g, ''),
  address: {
    '@type': 'PostalAddress',
    addressLocality: PROFILE.locality,
    addressRegion: PROFILE.region,
    addressCountry: PROFILE.country
  },
  worksFor: {
    '@type': 'Organization',
    name: EXPERIENCE[0].company
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: EDUCATION.school
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: PROFILE.title,
    occupationLocation: { '@type': 'City', name: PROFILE.locality }
  },
  knowsAbout,
  sameAs: [PROFILE.linkedin, PROFILE.github]
};

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: `${PROFILE.name} — ${PROFILE.title}`,
  description: SEO_DEFAULTS.description,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID }
};

const profilePageLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: `${SITE_URL}/`,
  name: SEO_DEFAULTS.title,
  isPartOf: { '@id': WEBSITE_ID },
  mainEntity: { '@id': PERSON_ID }
};

const Home = (): JSX.Element => {
  return (
    <>
      <Seo path="/" jsonLd={[personLd, websiteLd, profilePageLd]} />
      <HomePage />
    </>
  );
};

export default Home;
