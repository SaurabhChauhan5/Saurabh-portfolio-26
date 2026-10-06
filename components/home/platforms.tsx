import { ArrowRight } from 'react-feather';
import { Reveal, SectionHeading } from '@shared-components';
import { PLATFORMS } from '@utils/data';

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
        <ul className="border-t border-violet/20">
          {PLATFORMS.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 90} className="hover-list-row">
              <span className="hover-list-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-4">
                <span className="platform-badge platform-badge-sm" aria-hidden="true">
                  {p.short}
                </span>
                {p.name}
              </h3>
              <p className="col-start-2 md:col-start-auto text-sm sm:text-base text-violet leading-relaxed">
                {p.description}
              </p>
              <ArrowRight
                className="hover-list-arrow hidden md:block text-violet"
                size={22}
                aria-hidden="true"
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
