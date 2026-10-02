import { Reveal, SectionHeading } from '@shared-components';
import { PLATFORMS } from '@utils/data';

export default function Platforms(): JSX.Element {
  return (
    <section aria-labelledby="platforms-title" className="section relative overflow-hidden">
      <img
        src="/images/vectors/circle-spin.svg"
        alt=""
        aria-hidden="true"
        width={400}
        height={400}
        loading="lazy"
        className="absolute -right-24 top-10 w-64 md:w-80 opacity-30 animate-spin pointer-events-none"
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          id="platforms-title"
          eyebrow="Where I work"
          title={
            <>
              Platforms I <span className="text-pink">Work With</span>
            </>
          }
          lead="Each platform has its own SEO constraints, so I adapt the technical approach to fit."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLATFORMS.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 100}
              variant="scale"
              className="card spotlight p-6 text-center hover-lift"
            >
              <span className="platform-badge mx-auto" aria-hidden="true">
                {p.short}
              </span>
              <h3 className="mt-5 text-lg font-bold text-white">{p.name}</h3>
              <p className="mt-2 text-sm text-violet leading-relaxed">{p.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
