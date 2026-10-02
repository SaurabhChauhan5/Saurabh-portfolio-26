import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'react-feather';
import { Button, Reveal } from '@shared-components';
import { Project } from '@utils/types';

type Props = {
  project: Project;
};

export default function ProjectDetailedPage({ project }: Props): JSX.Element {
  return (
    <article className="pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-violet mb-8">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:text-pink">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/projects" className="hover:text-pink">
                Projects
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white">
              {project.name}
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest text-pink uppercase">
              {project.category.join(' · ')}
            </p>
            <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              {project.name}
            </h1>
            <p className="mt-3 text-lg text-violet">{project.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              {project.url && (
                <Button href={project.url} external>
                  {project.urlLabel || 'Visit Project'}
                </Button>
              )}
              {project.github && (
                <Button href={project.github} type="outlined" external>
                  {project.githubLabel || 'View on GitHub'}
                </Button>
              )}
            </div>
          </div>
          <div className="card spotlight overflow-hidden shadow-violet-5xl">
            <Image
              src={project.img}
              alt={project.imgAlt}
              width={1280}
              height={720}
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="w-full h-auto aspect-video object-cover object-top"
            />
          </div>
        </div>

        <div className="mt-16 grid lg:grid-cols-3 gap-6">
          <Reveal className="card spotlight p-6 sm:p-8 lg:col-span-2">
            <h2 className="text-2xl font-bold text-white">About the project</h2>
            <p className="mt-4 text-violet leading-relaxed">{project.description}</p>
            {project.highlights.length > 0 && (
              <ul className="mt-6 space-y-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-violet">
                    <span
                      className="mt-2 w-1.5 h-1.5 rounded-full bg-pink flex-shrink-0"
                      aria-hidden="true"
                    />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
          <Reveal variant="right" className="card spotlight p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white">
              <span className="text-pink">Technologies</span> used
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <li key={t} className="chip chip-lg">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-violet hover:text-pink font-medium transition-colors"
          >
            <ArrowLeft size={18} aria-hidden="true" /> All projects
          </Link>
        </div>
      </div>
    </article>
  );
}
