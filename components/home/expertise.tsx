import { CSSProperties } from 'react';
import { Icon, Reveal, SectionHeading } from '@shared-components';
import { EXPERTISE } from '@utils/data';
import StickyStack from '../../shared/components/sticky-stack';
import TopicIcon from '../../shared/components/topic-icon';

export default function Expertise(): JSX.Element {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="section bg-navy/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
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
            <Reveal as="ol" className="hidden lg:block space-y-2 text-sm text-violet">
              {EXPERTISE.map((g, i) => (
                <li key={g.title} className="flex items-center gap-3">
                  <span className="hover-list-num">{String(i + 1).padStart(2, '0')}</span>
                  <Icon name={g.icon} size={15} className="text-pink" />
                  {g.title}
                </li>
              ))}
            </Reveal>
          </div>
        </div>

        <StickyStack className="lg:col-span-7">
          {EXPERTISE.map((group, i) => (
            <li
              key={group.title}
              className="stack-card card p-6 sm:p-8"
              style={{ '--i': i } as CSSProperties}>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="icon-tile">
                    <Icon name={group.icon} />
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{group.title}</h3>
                </div>
                <span
                  className="text-4xl font-extrabold text-transparent stack-num"
                  aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="chip chip-lg inline-flex items-center gap-2">
                    <TopicIcon label={item} />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </StickyStack>
      </div>
    </section>
  );
}
