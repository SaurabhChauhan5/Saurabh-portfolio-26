import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'react-feather';
import { Button, ProjectCard, Reveal, SectionHeading } from '@shared-components';
import { PROJECTS } from '@utils/data';

export default function Projects(): JSX.Element {
  const featured = PROJECTS.find((p) => p.featured);
  const others = PROJECTS.filter((p) => p !== featured).slice(0, 3);
  return (
    <section id="projects" aria-labelledby="projects-title" className="section bg-navy/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="08"
          id="projects-title"
          eyebrow="Development background"
          title={
            <>
              Development <span className="text-pink">Projects</span>
            </>
          }
          lead="Projects from my web development background — the hands-on experience behind my technical SEO work."
        />
        {featured && (
          <Reveal
            as="article"
            className="card spotlight card-glow overflow-hidden grid md:grid-cols-2 items-center"
          >
            <Link
              href={`/project/${featured.slug}`}
              className="block overflow-hidden group"
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                src={featured.img}
                alt={featured.imgAlt}
                width={1280}
                height={720}
                sizes="(min-width: 768px) 560px, 100vw"
                className="w-full h-auto aspect-video object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-widest text-pink uppercase">
                Featured project
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-white">
                <Link
                  href={`/project/${featured.slug}`}
                  className="hover:text-pink transition-colors"
                >
                  {featured.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-violet">{featured.tags.slice(0, 4).join(' • ')}</p>
              <p className="mt-4 text-violet leading-relaxed">{featured.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {featured.url && (
                  <Button href={featured.url} external>
                    Live Demo
                  </Button>
                )}
                {featured.github && (
                  <Button href={featured.github} type="outlined" external>
                    GitHub
                  </Button>
                )}
              </div>
            </div>
          </Reveal>
        )}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {others.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 100} className="h-full">
              <ProjectCard project={project} compact />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-center">
          <Link href="/projects" className="btn-link group">
            View all {PROJECTS.length} projects
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
