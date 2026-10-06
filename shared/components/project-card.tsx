/* eslint-disable react/require-default-props */
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink, GitHub } from 'react-feather';
import { Project } from '@utils/types';
import TechTag from './tech-tag';

type Props = {
  project: Project;
  headingLevel?: 'h2' | 'h3';
  compact?: boolean;
  index?: number;
};

const ProjectCard = ({
  project,
  headingLevel = 'h3',
  compact = false,
  index
}: Props): JSX.Element => {
  const Heading = headingLevel;
  const detail = `/project/${project.slug}`;
  const max = compact ? 3 : 4;
  const shown = project.tags.slice(0, max);
  const more = project.tags.length - shown.length;
  return (
    <article className="project-card card spotlight group h-full flex flex-col overflow-hidden hover-lift">
      <Link
        href={detail}
        className="relative block overflow-hidden"
        tabIndex={-1}
        aria-hidden="true">
        <Image
          src={project.img}
          alt={project.imgAlt}
          width={1280}
          height={720}
          sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"
          className="w-full h-auto aspect-video object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <span className="project-shade" />
        <span className="project-badge">{project.category[0]}</span>
        {index !== undefined && (
          <span className="project-num">{String(index + 1).padStart(2, '0')}</span>
        )}
        <span className="project-open">
          <ArrowUpRight size={18} />
        </span>
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <Heading className="text-xl font-bold text-white">
          <Link href={detail} className="hover:text-pink transition-colors">
            {project.name}
          </Link>
        </Heading>
        <p className="mt-1 text-xs font-semibold tracking-wider text-pink uppercase">
          {project.tagline}
        </p>
        {!compact && (
          <p className="mt-3 text-violet text-sm leading-relaxed">{project.description}</p>
        )}
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
          {shown.map((t) => (
            <TechTag key={t} name={t} />
          ))}
          {more > 0 && (
            <li className="chip">
              +{more}
              <span className="sr-only"> more</span>
            </li>
          )}
        </ul>
        <div className="mt-auto pt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="card-link">
              <ExternalLink size={15} aria-hidden="true" />
              {project.urlLabel || 'Live demo'}
              <span className="sr-only">for {project.name} (opens in a new tab)</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link">
              <GitHub size={15} aria-hidden="true" />
              {project.githubLabel || 'GitHub'}
              <span className="sr-only">for {project.name} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
