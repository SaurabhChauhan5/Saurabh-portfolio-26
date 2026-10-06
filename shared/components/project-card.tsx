/* eslint-disable react/require-default-props */
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@utils/types';
import TechTag from './tech-tag';

type Props = {
  project: Project;
  headingLevel?: 'h2' | 'h3';
  compact?: boolean;
};

const ProjectCard = ({ project, headingLevel = 'h3', compact = false }: Props): JSX.Element => {
  const Heading = headingLevel;
  return (
    <article className="card spotlight group h-full flex flex-col overflow-hidden hover-lift">
      <Link
        href={`/project/${project.slug}`}
        className="block overflow-hidden"
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
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <Heading className="text-xl font-bold text-white">
          <Link href={`/project/${project.slug}`} className="hover:text-pink transition-colors">
            {project.name}
          </Link>
        </Heading>
        <p className="mt-2 text-violet text-sm leading-relaxed flex-1">
          {compact ? project.tagline : project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
          {(compact ? project.tags.slice(0, 3) : project.tags).map((t) => (
            <TechTag key={t} name={t} />
          ))}
        </ul>
      </div>
    </article>
  );
};

export default ProjectCard;
