import { ExternalLink } from 'react-feather';
import { Reveal, SectionHeading } from '@shared-components';
import { PLATFORM_EXPERIENCE } from '@utils/data';
import { ClientSite } from '@utils/types';
import TopicIcon from '../../shared/components/topic-icon';

function SiteChip({ site }: { site: ClientSite }): JSX.Element {
  const prev = site.status === 'previous';
  const cls = `site-chip ${prev ? 'is-previous' : ''}`;
  const label = prev ? <span className="sr-only"> (previous client)</span> : null;
  return (
    <li>
      {site.url ? (
        <a href={site.url} target="_blank" rel="noopener noreferrer" className={cls}>
          {site.name}
          <ExternalLink size={12} aria-hidden="true" />
          {label}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <span className={cls}>
          {site.name}
          {label}
        </span>
      )}
    </li>
  );
}

export default function PlatformExperience(): JSX.Element {
  return (
    <section aria-labelledby="platform-exp-title" className="section bg-navy/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="06"
          id="platform-exp-title"
          eyebrow="Platform experience"
          title={
            <>
              Shopify, WordPress, Wix &amp; <span className="text-pink">Custom-built</span> SEO
            </>
          }
          lead="Hands-on SEO work on real client websites, carried out as part of my role at I Market & Manage (AAA Digital)."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {PLATFORM_EXPERIENCE.map((p, i) => (
            <Reveal
              as="article"
              key={p.platform}
              delay={i * 120}
              className="card spotlight p-5 sm:p-6 flex flex-col">
              <h3 className="text-lg font-bold text-white flex items-center gap-3">
                <span className="brand-tile brand-tile-sm">
                  <TopicIcon label={p.platform} size={18} />
                </span>
                {p.heading}
              </h3>
              <p className="mt-2 text-sm text-violet leading-relaxed">{p.intro}</p>
              <ul
                className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5"
                aria-label={`${p.platform} SEO work`}>
                {p.work.slice(0, 4).map((w) => (
                  <li key={w} className="inline-flex items-center gap-1.5 text-xs text-violet">
                    <TopicIcon label={w} size={12} />
                    {w}
                  </li>
                ))}
              </ul>
              <ul
                className="mt-5 pt-4 border-t border-violet/10 flex flex-wrap gap-2"
                aria-label={`${p.platform} websites`}>
                {p.sites.map((s) => (
                  <SiteChip key={s.name} site={s} />
                ))}
                {p.othersNote && (
                  <li className="self-center text-xs text-violet">+ {p.othersNote}</li>
                )}
              </ul>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="mt-6 text-xs text-violet/80">
          Dashed names are previous clients. Client businesses belong to their respective owners;
          names are listed only to show the platforms and sites I have done SEO work on.
        </Reveal>
      </div>
    </section>
  );
}
