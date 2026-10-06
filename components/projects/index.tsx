import { useState } from 'react';
import { ProjectCard } from '@shared-components';
import { ALSO_EXPLORED, PROJECT_CATEGORIES, PROJECTS } from '@utils/data';
import PageHero from '../../shared/components/page-hero';

const ProjectsPage = (): JSX.Element => {
  const [active, setActive] = useState('all');
  const visible = PROJECTS.filter((p) => active === 'all' || p.category.includes(active));

  return (
    <>
      <PageHero
        eyebrow="Academic / personal projects"
        title={
          <>
            Development <span className="shimmer-text">Projects</span>
          </>
        }
        lead="Academic and personal projects built during my Computer Science degree and front-end development work. They are not professional client work; they form the technical foundation behind my SEO practice."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Projects' }]}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-3 mb-10">
          {PROJECT_CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              aria-pressed={active === c.value}
              onClick={() => setActive(c.value)}
              className={`px-5 py-2 rounded-full border-2 text-sm font-medium transition-colors ${
                active === c.value
                  ? 'bg-pink text-blue border-pink'
                  : 'text-white border-violet/40 hover:border-pink hover:text-pink'
              }`}>
              {c.label}
            </button>
          ))}
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((project) => (
            <li key={project.slug} className="fade-in">
              <ProjectCard project={project} headingLevel="h2" />
            </li>
          ))}
        </ul>

        <section aria-labelledby="explored-title" className="mt-16 card p-6 sm:p-8">
          <h2 id="explored-title" className="text-xl font-bold text-white">
            Also explored during my studies
          </h2>
          <p className="mt-1 text-sm text-violet">
            Technologies from my original developer portfolio. They are not part of my current SEO
            skill set or client work.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {ALSO_EXPLORED.map((t) => (
              <li key={t.name} className="chip chip-lg inline-flex items-center gap-2">
                <img
                  src={t.icon}
                  alt=""
                  width={18}
                  height={18}
                  loading="lazy"
                  className="w-4 h-4 object-contain"
                />
                {t.name}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default ProjectsPage;
