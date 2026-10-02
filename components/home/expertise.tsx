import { Icon, Reveal, SectionHeading } from '@shared-components';
import { EXPERTISE } from '@utils/data';

export default function Expertise(): JSX.Element {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="section bg-navy/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          id="expertise-title"
          eyebrow="What I do"
          title={
            <>
              SEO <span className="text-pink">Expertise</span>
            </>
          }
          lead="Everything from crawl and index fundamentals to local visibility and eCommerce site structure."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXPERTISE.map((group, i) => (
            <Reveal
              key={group.title}
              delay={(i % 3) * 100}
              className="card spotlight p-6 hover-lift"
            >
              <div className="flex items-center gap-3">
                <span className="icon-tile">
                  <Icon name={group.icon} />
                </span>
                <h3 className="text-lg font-bold text-white">{group.title}</h3>
              </div>
              <ul className="mt-5 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-violet">
                    <span
                      className="mt-2 w-1.5 h-1.5 rounded-full bg-pink flex-shrink-0"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
