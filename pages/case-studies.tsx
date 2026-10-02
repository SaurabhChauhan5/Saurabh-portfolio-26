import { Button, Seo } from '@shared-components';
import { breadcrumbLd, PERSON_ID } from '../shared/components/seo';
import PageHero from '../shared/components/page-hero';
import CaseStudies from '../components/home/case-studies';
import Clients from '../components/home/clients';
import PlatformExperience from '../components/home/platform-experience';
import Contact from '../components/home/contact';
import { CASE_STUDIES, PROFILE, SITE_URL } from '@utils/data';

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
      lead="Technical, multi-platform and local SEO work from client projects, described as it happened and without inflated numbers."
      crumbs={[{ name: 'Home', href: '/' }, { name: 'Case Studies' }]}>
      <Button href="/connect">Discuss your website</Button>
    </PageHero>
    <CaseStudies />
    <Clients />
    <PlatformExperience />
    <Contact />
  </>
);

export default CaseStudiesPage;
