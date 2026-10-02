import { Button, Seo } from '@shared-components';
import { breadcrumbLd } from '../shared/components/seo';
import PageHero from '../shared/components/page-hero';
import Experience from '../components/home/experience';
import Foundation from '../components/home/foundation';
import Contact from '../components/home/contact';
import { PROFILE, RESUME_PATH } from '@utils/data';

const ExperiencePage = (): JSX.Element => (
  <>
    <Seo
      title={`Experience | ${PROFILE.name}, SEO Specialist`}
      description="Career timeline of Saurabh Chauhan: SEO Specialist at I Market & Manage (AAA Digital), managing SEO for 24 active Australian business websites, with a front-end development background."
      path="/experience"
      jsonLd={[
        breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Experience', path: '/experience' }
        ])
      ]}
    />
    <PageHero
      eyebrow="Career"
      title={
        <>
          Professional <span className="shimmer-text">Experience</span>
        </>
      }
      lead="From front-end development to managing end-to-end SEO for 24 active Australian business websites. Scroll to follow the timeline."
      crumbs={[{ name: 'Home', href: '/' }, { name: 'Experience' }]}>
      <Button href={RESUME_PATH} type="outlined" download>
        Download Resume
      </Button>
    </PageHero>
    <Experience headingLevel="page" />
    <Foundation />
    <Contact />
  </>
);

export default ExperiencePage;
