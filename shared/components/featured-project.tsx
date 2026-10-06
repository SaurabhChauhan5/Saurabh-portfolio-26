/* eslint-disable react/require-default-props */
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, ExternalLink, GitHub, Star } from 'react-feather';
import { Project } from '@utils/types';
import TechTag from './tech-tag';
import { Reveal } from './reveal';

type Props = { project: Project; headingLevel?: 'h2' | 'h3' };

// Large spotlight card for the featured project (home section and Projects page).
export default function FeaturedProject({ project, headingLevel = 'h3' }: Props): JSX.Element {
  const Heading = headingLevel;
  const detail = `/project/${project.slug}`;
  return (
    <Reveal
      as="article"
      className="featured-project card spotlight card-glow overflow-hidden grid lg:grid-cols-12">
      <Link
        href={detail}
        className="featured-shot lg:col-span-7 block overflow-hidden group"
        tabIndex={-1}
        aria-hidden="true">
        <span className="browser-bar">
          <span className="browser-dots" />
          <span className="browser-url">{project.url?.replace(/^https?:\/\//, '')}</span>
        </span>
        <Image
          src={project.img}
          alt={project.imgAlt}
          width={1280}
          height={720}
          sizes="(min-width: 1024px) 640px, 100vw"
          className="w-full h-auto aspect-video object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col min-w-0">
        <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-pink uppercase">
          <Star size={14} aria-hidden="true" /> Featured project
        </p>
        <Heading className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
          <Link href={detail} className="hover:text-pink transition-colors">
            {project.name}
          </Link>
        </Heading>
        <p className="mt-1 text-sm text-violet">{project.tagline}</p>
        <p className="mt-4 text-violet leading-relaxed">{project.description}</p>
        <ul className="mt-5 space-y-2.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm text-violet">
              <CheckCircle
                size={16}
                className="mt-0.5 flex-shrink-0 text-pink"
                aria-hidden="true"
              />
              {h}
            </li>
          ))}
        </ul>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tags.map((t) => (
            <TechTag key={t} name={t} />
          ))}
        </ul>
        <div className="mt-auto pt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link project-link-solid">
              <ExternalLink size={16} aria-hidden="true" />
              {project.urlLabel || 'Live demo'}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link">
              <GitHub size={16} aria-hidden="true" />
              {project.githubLabel || 'GitHub'}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          <Link href={detail} className="btn-link group text-sm">
            Details
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
