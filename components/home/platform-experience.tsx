import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'react-feather';
import { Reveal, SectionHeading } from '@shared-components';
import { PLATFORM_EXPERIENCE, platformCount, platformHref } from '@utils/data';
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {PLATFORM_EXPERIENCE.map((p, i) => {
            const total = platformCount(p.platform);
            // A few linked examples (current clients first); the rest live on /clients.
            const featured = p.sites.filter((s) => s.url).slice(0, 3);
            return (
              <Reveal
                as="article"
                key={p.platform}
                delay={i * 100}
                className="card spotlight p-5 flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="brand-tile brand-tile-sm">
                    <TopicIcon label={p.platform} size={18} />
                  </span>
                  <span className="jump-count text-xs">{total} sites</span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-white leading-snug">{p.heading}</h3>
                <ul
                  className="mt-2 flex flex-wrap gap-x-3 gap-y-1"
                  aria-label={`${p.platform} SEO work`}>
                  {p.work.slice(0, 3).map((w) => (
                    <li key={w} className="inline-flex items-center gap-1.5 text-xs text-violet">
                      <TopicIcon label={w} size={12} />
                      {w}
                    </li>
                  ))}
                </ul>
                <ul
                  className="mt-4 pt-4 border-t border-violet/10 flex flex-wrap gap-1.5"
                  aria-label={`Example ${p.platform} websites`}>
                  {featured.map((s) => (
                    <SiteChip key={s.name} site={s} />
                  ))}
                </ul>
                <Link
                  href={platformHref(p.platform)}
                  className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm text-pink font-medium hover:underline group">
                  View all {total} sites
                  <span className="sr-only"> built on {p.platform}</span>
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </Reveal>
            );
          })}
        </div>
        <Reveal as="p" className="mt-6 text-xs text-violet/80">
          Dashed names are previous clients. Client businesses belong to their respective owners;
          names are listed only to show the platforms and sites I have done SEO work on. See every
          site grouped by platform on the{' '}
          <Link href="/clients#platform-wordpress" className="text-pink hover:underline">
            clients page
          </Link>
          .
        </Reveal>
      </div>
    </section>
  );
}
