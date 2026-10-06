import { Button, Seo } from '@shared-components';
import { ACTIVE_WEBSITES, CASE_STUDIES, INDEXATION, PROFILE, SITE_URL } from '@utils/data';
import { breadcrumbLd, PERSON_ID } from '../shared/components/seo';
import PageHero from '../shared/components/page-hero';
import CaseStudies from '../components/home/case-studies';
import Clients from '../components/home/clients';
import PlatformExperience from '../components/home/platform-experience';
import Contact from '../components/home/contact';

const itemListLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `SEO case studies by ${PROFILE.name}`,
  itemListElement: CASE_STUDIES.map((cs, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'CreativeWork',
      name: cs.title,
      description: cs.result || cs.work.join('. '),
      url: `${SITE_URL}/case-studies#${cs.id}`,
      author: { '@id': PERSON_ID }
    }
  }))
};

const CaseStudiesPage = (): JSX.Element => (
  <>
    <Seo
      title={`SEO Case Studies | ${PROFILE.name}, SEO Specialist`}
      description="SEO case studies by Saurabh Chauhan: indexation growth from about 164 to 1,190+ indexed pages, multi-platform technical SEO, and local SEO for Australian businesses."
      path="/case-studies"
      jsonLd={[
        breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Case Studies', path: '/case-studies' }
        ]),
        itemListLd
      ]}
    />
    <PageHero
      eyebrow="Featured work"
      title={
        <>
          SEO <span className="shimmer-text">Case Studies</span>
        </>
      }
      lead="Technical, multi-platform and local SEO work from real client projects, presented factually and without inflated claims."
      crumbs={[{ name: 'Home', href: '/' }, { name: 'Case Studies' }]}>
      <dl className="client-stats client-stats-3">
        <div className="client-stat">
          <dt className="text-xs sm:text-sm text-violet">Indexed pages on a client website</dt>
          <dd className="order-first text-2xl sm:text-3xl font-extrabold text-white">
            {INDEXATION.before} → {INDEXATION.after.toLocaleString('en-US')}+
          </dd>
        </div>
        <div className="client-stat">
          <dt className="text-xs sm:text-sm text-violet">Website platforms</dt>
          <dd className="order-first text-2xl sm:text-3xl font-extrabold text-white">4</dd>
        </div>
        <div className="client-stat">
          <dt className="text-xs sm:text-sm text-violet">Active business websites</dt>
          <dd className="order-first text-2xl sm:text-3xl font-extrabold text-white">
            {ACTIVE_WEBSITES}
          </dd>
        </div>
      </dl>
      <nav aria-label="Case studies on this page" className="mt-6 flex flex-wrap gap-3">
        {CASE_STUDIES.map((cs) => (
          <a key={cs.id} href={`#${cs.id}`} className="cs-jump">
            <span className="cs-jump-num">{cs.number}</span>
            {cs.title.split(':')[0]}
          </a>
        ))}
        <Button href="/connect">Discuss your website</Button>
      </nav>
    </PageHero>
    <CaseStudies />
    <PlatformExperience />
    <Clients />
    <Contact />
  </>
);

export default CaseStudiesPage;
