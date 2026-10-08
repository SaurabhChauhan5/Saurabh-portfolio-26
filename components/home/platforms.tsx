import Link from 'next/link';
import { ArrowRight } from 'react-feather';
import { Reveal, SectionHeading } from '@shared-components';
import { PLATFORMS, platformCount, platformHref } from '@utils/data';
import TopicIcon from '../../shared/components/topic-icon';

export default function Platforms(): JSX.Element {
  return (
    <section aria-labelledby="platforms-title" className="section relative overflow-hidden">
      <span
        data-parallax="0.15"
        className="absolute -right-24 top-10 w-64 md:w-80 pointer-events-none"
        aria-hidden="true">
        <img
          src="/images/vectors/circle-spin.svg"
          alt=""
          width={400}
          height={400}
          loading="lazy"
          className="w-full opacity-30 animate-spin"
        />
      </span>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          id="platforms-title"
          eyebrow="Where I work"
          title={
            <>
              Platforms I <span className="text-pink">work with</span>
            </>
          }
          lead="I adapt the SEO approach to the technical constraints and structure of each platform."
        />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLATFORMS.map((p, i) => {
            const count = platformCount(p.name);
            return (
              <Reveal as="li" key={p.name} delay={i * 80} className="h-full">
                <Link
                  href={platformHref(p.name)}
                  className="card spotlight hover-lift group h-full p-5 flex flex-col">
                  <span className="flex items-center justify-between gap-3">
                    <span className="brand-tile" aria-hidden="true">
                      <TopicIcon label={p.name} size={22} />
                    </span>
                    <span className="jump-count text-xs">{count} sites</span>
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-white group-hover:text-pink transition-colors">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-violet leading-relaxed">{p.description}</p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm text-pink font-medium">
                    View {count} websites
                    <ArrowRight
                      size={15}
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
