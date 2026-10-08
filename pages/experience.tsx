import { Button, Seo } from '@shared-components';
import { EXPERIENCE, PROFILE, RESUME_PATH } from '@utils/data';
import { breadcrumbLd } from '../shared/components/seo';
import PageHero from '../shared/components/page-hero';
import Experience from '../components/home/experience';
import Foundation from '../components/home/foundation';
import Contact from '../components/home/contact';

const ExperiencePage = (): JSX.Element => (
  <>
    <Seo
      title={`Experience | ${PROFILE.name}, SEO Specialist`}
      description="Career timeline of Saurabh Chauhan: SEO Specialist at I Market & Manage (AAA Digital), managing SEO for 25 active Australian business websites, with a front-end development background."
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
      lead="From front-end development to managing end-to-end SEO for 25 active Australian business websites."
      crumbs={[{ name: 'Home', href: '/' }, { name: 'Experience' }]}>
      <ol className="career-path" aria-label="Career progression">
        {[...EXPERIENCE].reverse().map((role) => (
          <li
            key={`${role.position}-${role.startDate}`}
            className={`career-step ${role.endDate ? '' : 'is-current'}`}>
            <p className="text-xs text-violet">
              {role.startDate} – {role.endDate || 'Present'}
            </p>
            <p className="mt-1 text-white font-semibold leading-snug">{role.position}</p>
            <p className="mt-0.5 text-xs text-pink">
              {role.company.startsWith('I Market') ? 'AAA Digital' : role.company}
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-6">
        <Button href={RESUME_PATH} type="outlined" download>
          Download Resume
        </Button>
      </div>
    </PageHero>
    <Experience headingLevel="page" />
    <Foundation />
    <Contact />
  </>
);

export default ExperiencePage;
