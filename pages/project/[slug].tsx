import { GetStaticPaths, GetStaticProps } from 'next';
import { Seo } from '@shared-components';
import { breadcrumbLd, PERSON_ID } from '../../shared/components/seo';
import ProjectDetailedPage from '../../components/project-details/index';
import { PROFILE, PROJECTS, SITE_URL } from '@utils/data';
import { Project } from '@utils/types';

type Props = { project: Project };

const ProjectDetail = ({ project }: Props): JSX.Element => {
  const path = `/project/${project.slug}`;
  const creativeWorkLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    headline: project.tagline,
    description: project.description,
    url: `${SITE_URL}${path}`,
    image: `${SITE_URL}${project.img}`,
    keywords: project.tags.join(', '),
    author: { '@type': 'Person', '@id': PERSON_ID, name: PROFILE.name },
    ...(project.url ? { sameAs: project.url } : {})
  };
  return (
    <>
      <Seo
        title={
          project.name.length > 30
            ? `${project.name} | ${PROFILE.name}`
            : `${project.name} — ${project.tagline} | ${PROFILE.name}`
        }
        description={project.description.length > 160 ? `${project.description.slice(0, 157)}…` : project.description}
        path={path}
        jsonLd={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
            { name: project.name, path }
          ]),
          creativeWorkLd
        ]}
      />
      <ProjectDetailedPage project={project} />
    </>
  );
};

export default ProjectDetail;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: PROJECTS.map((p) => ({ params: { slug: p.slug } })),
  fallback: false
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const project = PROJECTS.find((p) => p.slug === params?.slug);
  if (!project) return { notFound: true };
  return { props: { project } };
};
