import { ExternalLink } from 'react-feather';
import { Reveal, SectionHeading } from '@shared-components';
import { PLATFORM_EXPERIENCE } from '@utils/data';
import { ClientSite } from '@utils/types';

const STATUS_LABEL: Record<ClientSite['status'], string> = {
  current: 'Current',
  previous: 'Previous',
  example: 'Client'
};

function SiteItem({ site }: { site: ClientSite }): JSX.Element {
  return (
    <li className="flex items-center justify-between gap-3 py-2.5 border-b border-violet/10 last:border-0">
      {site.url ? (
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-white font-medium hover:text-pink transition-colors">
          {site.name}
          <ExternalLink size={14} aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : (
        <span className="text-white font-medium">{site.name}</span>
      )}
      <span className={`status-pill ${site.status === 'current' ? 'status-current' : ''}`}>
        {STATUS_LABEL[site.status]}
      </span>
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
              Shopify, WordPress &amp; <span className="text-pink">Wix</span> SEO
            </>
          }
          lead="Hands-on SEO work on real client websites, carried out as part of my role at I Market & Manage (AAA Digital)."
        />
        <div className="grid lg:grid-cols-3 gap-6">
          {PLATFORM_EXPERIENCE.map((p, i) => (
            <Reveal
              as="article"
              key={p.platform}
              delay={i * 120}
              className="card spotlight p-6 sm:p-7 flex flex-col">
              <h3 className="text-xl font-bold text-white">{p.heading}</h3>
              <p className="mt-2 text-sm text-violet leading-relaxed">{p.intro}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${p.platform} SEO work`}>
                {p.work.map((w) => (
                  <li key={w} className="chip">
                    {w}
                  </li>
                ))}
              </ul>
              <h4 className="mt-6 mb-1 text-sm font-semibold text-pink uppercase tracking-wider">
                Websites
              </h4>
              <ul className="flex-1">
                {p.sites.map((s) => (
                  <SiteItem key={s.name} site={s} />
                ))}
                {p.othersNote && <li className="py-2.5 text-sm text-violet">+ {p.othersNote}</li>}
              </ul>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="mt-6 text-xs text-violet/80">
          Client businesses belong to their respective owners. Names are listed only to show the
          platforms and sites I have done SEO work on.
        </Reveal>
      </div>
    </section>
  );
}
