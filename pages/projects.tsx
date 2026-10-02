import { Seo } from '@shared-components';
import { breadcrumbLd, PERSON_ID } from '../shared/components/seo';
import ProjectsPage from '../components/projects/index';
import { PROFILE, PROJECTS, SITE_URL } from '@utils/data';

const itemListLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `Development projects by ${PROFILE.name}`,
  itemListElement: PROJECTS.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${SITE_URL}/project/${p.slug}`,
    name: p.name
  })),
  author: { '@id': PERSON_ID }
};

const Projects = (): JSX.Element => (
  <>
    <Seo
      title={`Development Projects | ${PROFILE.name}, SEO Specialist`}
      description="Full-stack, front-end, data and IoT projects by Saurabh Chauhan — the web development background behind his technical SEO work."
      path="/projects"
      jsonLd={[
        breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' }
        ]),
        itemListLd
      ]}
    />
    <ProjectsPage />
  </>
);

export default Projects;
