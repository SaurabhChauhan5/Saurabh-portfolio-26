import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'react-feather';
import { Reveal, SectionHeading } from '@shared-components';
import { PROJECTS, TECH_ICONS } from '@utils/data';

// Compact preview: the featured project plus two more. Full detail lives on /projects.
export default function Projects(): JSX.Element {
  const featured = PROJECTS.find((p) => p.featured);
  const picks = [featured, ...PROJECTS.filter((p) => p !== featured)].filter(Boolean).slice(0, 3);
  return (
    <section id="projects" aria-labelledby="projects-title" className="section bg-navy/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="07"
          id="projects-title"
          eyebrow="Academic / personal projects"
          title={
            <>
              Development <span className="text-pink">Projects</span>
            </>
          }
          lead="Academic and personal projects from my web development background. They are not client work, but they are why I understand how websites are built."
        />
        <ul className="grid sm:grid-cols-3 gap-4 lg:gap-6">
          {picks.map((p, i) =>
            p ? (
              <Reveal as="li" key={p.slug} delay={i * 80}>
                <Link href={`/project/${p.slug}`} className="mini-project card spotlight group">
                  <span className="mini-thumb">
                    <Image
                      src={p.img}
                      alt={p.imgAlt}
                      width={640}
                      height={360}
                      sizes="(min-width: 640px) 360px, 112px"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {p.featured && (
                      <span className="mini-featured">
                        <Star size={11} aria-hidden="true" />
                        <span className="sr-only sm:not-sr-only">Featured</span>
                      </span>
                    )}
                  </span>
                  <span className="mini-body">
                    <span className="block text-white font-bold leading-snug group-hover:text-pink transition-colors">
                      {p.name}
                    </span>
                    <span className="block mt-1 text-xs text-violet">{p.tagline}</span>
                    <span className="mt-2.5 flex items-center gap-1.5" aria-hidden="true">
                      {p.tags
                        .filter((t) => TECH_ICONS[t])
                        .slice(0, 4)
                        .map((t) => (
                          <img
                            key={t}
                            src={TECH_ICONS[t]}
                            alt=""
                            width={16}
                            height={16}
                            loading="lazy"
                            title={t}
                            className="mini-tech"
                          />
                        ))}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ) : null
          )}
        </ul>
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
