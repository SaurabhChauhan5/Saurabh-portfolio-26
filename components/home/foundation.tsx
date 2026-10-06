import { Reveal, SectionHeading } from '@shared-components';
import { EDUCATION, TECH_FOUNDATION } from '@utils/data';

export default function Foundation(): JSX.Element {
  return (
    <section aria-labelledby="foundation-title" className="section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="08"
          id="foundation-title"
          eyebrow="Technical foundation"
          title="Technical skills that support my SEO work."
          lead="My development background helps me understand how websites are built and collaborate effectively with developers on technical SEO fixes."
        />
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
            {TECH_FOUNDATION.map((g, gi) => (
              <Reveal
                key={g.group}
                delay={gi * 100}
                className={`card spotlight p-6 ${gi === 0 ? 'sm:col-span-2' : ''}`}>
                <h3 className="text-white font-bold">{g.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {g.items.map((t) => (
                    <li key={t.name} className="chip chip-lg inline-flex items-center gap-2">
                      {t.icon && (
                        <img
                          src={t.icon}
                          alt=""
                          width={18}
                          height={18}
                          loading="lazy"
                          className="w-4 h-4 object-contain"
                        />
                      )}
                      {t.name}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <div className="lg:col-span-4">
            <Reveal variant="right" as="article" className="card spotlight p-6 sm:p-8 h-full">
              <h2
                id="education-title"
                className="text-xs font-semibold tracking-widest text-pink uppercase">
                Education
              </h2>
              <ul className="mt-2 divide-y divide-violet/20">
                {EDUCATION.map((ed) => (
                  <li key={ed.school} className="py-5 last:pb-0">
                    <h3 className="text-xl font-bold text-white">{ed.school}</h3>
                    <p className="mt-1 text-violet">{ed.degree}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="chip">{ed.dates}</span>
                      <span className="chip">{ed.grade}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
