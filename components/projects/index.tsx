import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart2,
  Code,
  Cpu,
  GitHub,
  Grid,
  Layers,
  Layout,
  Link2,
  Radio,
  Smartphone,
  Tag
} from 'react-feather';
import { ProjectCard, Reveal } from '@shared-components';
import { ALSO_EXPLORED, PROFILE, PROJECT_CATEGORIES, PROJECTS } from '@utils/data';
import PageHero from '../../shared/components/page-hero';
import FeaturedProject from '../../shared/components/featured-project';

const CATEGORY_ICONS: Record<string, typeof Grid> = {
  all: Grid,
  'Full Stack': Layers,
  Frontend: Layout,
  'Data Analysis': BarChart2,
  'Machine Learning': Cpu,
  IoT: Radio
};

// Counted from the project data, so they stay accurate as projects change.
const TECH_COUNT = new Set(PROJECTS.flatMap((p) => p.tags)).size;
const STATS = [
  { icon: Layers, value: PROJECTS.length, label: 'Projects' },
  { icon: Grid, value: PROJECT_CATEGORIES.length - 1, label: 'Categories' },
  { icon: Tag, value: TECH_COUNT, label: 'Technologies' },
  { icon: Link2, value: PROJECTS.filter((p) => p.url).length, label: 'Live links' }
];

// What the development work carries over into SEO.
const SEO_LINKS = [
  {
    icon: Code,
    title: 'Semantic HTML',
    text: 'Building pages by hand is why I care about heading structure, metadata and clean markup.'
  },
  {
    icon: Layers,
    title: 'How sites are built',
    text: 'Front ends, REST APIs and databases help me trace crawl and indexing issues back to the code.'
  },
  {
    icon: Smartphone,
    title: 'Responsive UI',
    text: 'Responsive layouts feed directly into mobile usability and page performance checks.'
  },
  {
    icon: BarChart2,
    title: 'Data and dashboards',
    text: 'Dashboard work carries over to reading Search Console, GA4 and SEMrush data.'
  }
];

const ProjectsPage = (): JSX.Element => {
  const [active, setActive] = useState('all');
  const featured = PROJECTS.find((p) => p.featured);
  const visible = PROJECTS.filter((p) =>
    active === 'all' ? p !== featured : p.category.includes(active)
  );
  const count = (value: string) =>
    value === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.category.includes(value)).length;

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
        aside={
          <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 max-w-2xl lg:max-w-none">
            {STATS.map(({ icon: StatIcon, value, label }) => (
              <li key={label} className="card-inner p-3 sm:p-4 flex items-center gap-3">
                <span className="icon-tile icon-tile-sm">
                  <StatIcon size={16} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xl font-extrabold text-white leading-none">
                    {value}
                  </span>
                  <span className="block mt-1 text-xs text-violet">{label}</span>
                </span>
              </li>
            ))}
          </ul>
        }
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">
        {featured && <FeaturedProject project={featured} headingLevel="h2" />}

        <section aria-labelledby="all-projects-title">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <h2 id="all-projects-title" className="text-2xl sm:text-3xl font-extrabold text-white">
              {active === 'all' ? 'More' : active} <span className="text-pink">projects</span>
            </h2>
            <p className="text-sm text-violet" aria-live="polite">
              Showing {visible.length} of {PROJECTS.length}
            </p>
          </div>
          <div className="filter-scroll overflow-x-auto sm:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0 mb-8">
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex sm:flex-wrap gap-2.5">
              {PROJECT_CATEGORIES.map((c) => {
                const CatIcon = CATEGORY_ICONS[c.value] || Grid;
                const on = active === c.value;
                return (
                  <button
                    key={c.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(c.value)}
                    className={`filter-chip ${on ? 'is-active' : ''}`}>
                    <CatIcon size={15} aria-hidden="true" />
                    {c.label}
                    <span className="filter-count">{count(c.value)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((project) => (
              <li key={`${active}-${project.slug}`} className="fade-in">
                <ProjectCard
                  project={project}
                  headingLevel="h3"
                  index={PROJECTS.indexOf(project)}
                />
              </li>
            ))}
            {active === 'all' && (
              <li className="fade-in">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-tile group">
                  <span className="icon-tile">
                    <GitHub size={22} aria-hidden="true" />
                  </span>
                  <span className="text-white font-bold text-lg">More code on GitHub</span>
                  <span className="text-sm text-violet">
                    Repositories from my studies and front-end work.
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-pink font-medium">
                    View profile
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            )}
          </ul>
        </section>

        <section aria-labelledby="seo-link-title">
          <Reveal>
            <h2 id="seo-link-title" className="text-2xl sm:text-3xl font-extrabold text-white">
              Why this matters for <span className="text-pink">SEO</span>
            </h2>
            <p className="mt-2 max-w-2xl text-violet">
              These projects are not client work, but they are the reason I can take technical SEO
              fixes through to implementation.
            </p>
          </Reveal>
          <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SEO_LINKS.map(({ icon: LinkIcon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 80} className="h-full">
                <div className="card spotlight hover-lift h-full p-5">
                  <span className="icon-tile icon-tile-sm">
                    <LinkIcon size={17} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-white font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm text-violet leading-relaxed">{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>

        <div className="grid lg:grid-cols-12 gap-6">
          <Reveal
            as="section"
            className="lg:col-span-7 card p-6 sm:p-8"
            aria-labelledby="explored-title">
            <h2 id="explored-title" className="text-xl font-bold text-white">
              Also explored during my studies
            </h2>
            <p className="mt-1 text-sm text-violet">
              Technologies from my original developer portfolio. They are not part of my current SEO
              skill set or client work.
            </p>
            <ul className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ALSO_EXPLORED.map((t) => (
                <li key={t.name} className="card-inner p-4 flex flex-col items-center gap-2.5">
                  <span className="brand-tile">
                    <img
                      src={t.icon}
                      alt=""
                      width={22}
                      height={22}
                      loading="lazy"
                      className="w-5 h-5 object-contain"
                    />
                  </span>
                  <span className="text-sm text-white text-center">{t.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            as="aside"
            variant="right"
            className="lg:col-span-5 card card-glow spotlight p-6 sm:p-8 flex flex-col">
            <p className="text-xs font-semibold tracking-widest text-pink uppercase">Client work</p>
            <h2 className="mt-2 text-xl font-bold text-white">Looking for SEO results?</h2>
            <p className="mt-2 text-sm text-violet leading-relaxed">
              My professional work is SEO for Australian business websites. See the case studies or
              get in touch.
            </p>
            <div className="mt-auto pt-6 flex flex-wrap gap-3">
              <Link href="/case-studies" className="project-link project-link-solid">
                Case studies <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/connect" className="project-link">
                Contact me
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
