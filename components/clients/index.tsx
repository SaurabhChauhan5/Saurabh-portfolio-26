/* eslint-disable react/require-default-props */
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ExternalLink, MapPin } from 'react-feather';
import { Button, Icon, Reveal } from '@shared-components';
import {
  ACTIVE_WEBSITES,
  AGENCY_SITE,
  CLIENT_GROUPS,
  CLIENTS_WITHOUT_WEBSITE,
  ClientWebsite,
  PREVIOUS_CLIENT_SITES,
  PREVIOUS_CLIENTS_NO_WEBSITE,
  TOTAL_WEBSITES
} from '@utils/data';
import PageHero from '../../shared/components/page-hero';

function NoWebsiteCard({ name, delay }: { name: string; delay: number }): JSX.Element {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3);
  return (
    <Reveal as="li" delay={delay} className="h-full">
      <div className="card spotlight h-full flex flex-col overflow-hidden">
        <div className="browser-bar" aria-hidden="true">
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-url">No website listed</span>
        </div>
        <div className="no-site-preview aspect-16-10" aria-hidden="true">
          <span className="no-site-initials">{initials}</span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold text-white leading-snug">{name}</h3>
            <span className="status-pill">Previous</span>
          </div>
          <p className="mt-1 text-sm text-violet">No website listed</p>
        </div>
      </div>
    </Reveal>
  );
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-');

function SiteCard({
  site,
  delay,
  badge
}: {
  site: ClientWebsite;
  delay: number;
  badge?: string;
}): JSX.Element {
  const meta = [site.location || 'Australia', site.platform].filter(Boolean).join(' · ');
  return (
    <Reveal as="li" delay={delay} className="h-full">
      <a
        href={`https://${site.domain}/`}
        target="_blank"
        rel="noopener noreferrer"
        className="site-card card spotlight hover-lift group h-full flex flex-col overflow-hidden">
        <div className="browser-bar" aria-hidden="true">
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-dot hidden sm:block" />
          <span className="browser-url">{site.domain}</span>
        </div>
        <div className="relative overflow-hidden bg-navy aspect-16-10">
          <Image
            src={site.img}
            alt={`${site.name} website homepage`}
            fill
            sizes="(min-width: 1024px) 360px, 50vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <span className="site-card-overlay" aria-hidden="true">
            <span className="site-card-visit">
              Visit site <ExternalLink size={14} />
            </span>
          </span>
        </div>
        <div className="p-3 sm:p-5 flex flex-col flex-1">
          {badge && (
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-pink">{badge}</p>
          )}
          <h3 className="text-sm sm:text-lg font-bold text-white leading-snug group-hover:text-pink transition-colors">
            {site.name}
          </h3>
          <p className="mt-auto pt-2 sm:pt-3 flex items-center gap-1.5 text-xs sm:text-sm text-violet">
            <MapPin size={13} aria-hidden="true" className="flex-shrink-0" />
            <span className="truncate">{meta}</span>
            <span className="sr-only">(opens in a new tab)</span>
          </p>
        </div>
      </a>
    </Reveal>
  );
}

function ShotMarquee(): JSX.Element {
  const shots = CLIENT_GROUPS.flatMap((g) => g.sites);
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" aria-hidden="true">
      <div className="shot-marquee marquee">
        <div className="marquee-track shot-track">
          {[...shots, ...shots].map((s, i) => (
            // The second copy only exists for the seamless loop.
            // eslint-disable-next-line react/no-array-index-key
            <div key={`${s.domain}-${i}`} className="shot-frame">
              <Image src={s.img} alt="" fill sizes="240px" className="object-cover object-top" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PREVIOUS = 'previous-clients';

export default function ClientsPage(): JSX.Element {
  const withSites = CLIENT_GROUPS.reduce((n, g) => n + g.sites.length, 0);
  const [filter, setFilter] = useState('all');
  const show = (id: string) => filter === 'all' || filter === id;

  // Support shareable links such as /clients#removals.
  useEffect(() => {
    const valid = [...CLIENT_GROUPS.map((g) => slugify(g.industry)), PREVIOUS];
    const apply = () => {
      const hash = window.location.hash.slice(1);
      setFilter(valid.includes(hash) ? hash : 'all');
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  const select = (id: string) => {
    setFilter(id);
    window.history.replaceState(null, '', id === 'all' ? window.location.pathname : `#${id}`);
    document.getElementById('client-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filters = [
    {
      id: 'all',
      label: 'All',
      count: withSites + PREVIOUS_CLIENT_SITES.length + PREVIOUS_CLIENTS_NO_WEBSITE.length
    },
    ...CLIENT_GROUPS.map((g) => ({
      id: slugify(g.industry),
      label: g.industry,
      count: g.sites.length
    })),
    {
      id: PREVIOUS,
      label: 'Previous clients',
      count: PREVIOUS_CLIENT_SITES.length + PREVIOUS_CLIENTS_NO_WEBSITE.length
    }
  ];
  const heroStats = [
    { value: ACTIVE_WEBSITES, label: 'Active websites' },
    { value: TOTAL_WEBSITES, label: 'Managed in total' },
    { value: CLIENT_GROUPS.length, label: 'Industries shown' },
    { value: '2 states', label: 'Sydney (NSW) & Brisbane (QLD)' }
  ];

  return (
    <>
      <PageHero
        eyebrow="Client websites"
        title={
          <>
            Websites I <span className="shimmer-text">Work On</span>
          </>
        }
        lead="Australian local-business websites I manage SEO for at AAA Digital, grouped by industry. Filter by industry, or click any card to visit the live site."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Clients' }]}>
        <dl className="client-stats">
          {heroStats.map((st) => (
            <div key={st.label} className="client-stat">
              <dt className="text-xs sm:text-sm text-violet">{st.label}</dt>
              <dd className="order-first text-2xl sm:text-3xl font-extrabold text-white">
                {st.value}
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <ShotMarquee />

      <div className="filter-bar sticky top-16 z-30">
        <div
          role="group"
          aria-label="Filter client websites by industry"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto filter-scroll">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={(e) => {
                e.currentTarget.scrollIntoView({
                  behavior: 'smooth',
                  inline: 'center',
                  block: 'nearest'
                });
                select(f.id);
              }}
              className={`jump-chip flex-shrink-0 ${filter === f.id ? 'is-active' : ''}`}>
              {f.label}
              <span className="jump-count">{f.count}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {filter === 'all'
          ? 'Showing all client websites'
          : `Showing ${filters.find((f) => f.id === filter)?.label}`}
      </p>
      <div
        id="client-grid"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-14 sm:space-y-20">
        {CLIENT_GROUPS.map((group) => (
          <section
            key={group.industry}
            id={slugify(group.industry)}
            hidden={!show(slugify(group.industry))}
            aria-labelledby={`${slugify(group.industry)}-title`}>
            <Reveal className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-8">
              <span className="icon-tile flex-shrink-0">
                <Icon name={group.icon} />
              </span>
              <h2
                id={`${slugify(group.industry)}-title`}
                className="text-xl sm:text-3xl font-extrabold text-white">
                {group.industry}
              </h2>
              <span className="jump-count text-sm">{group.sites.length}</span>
              <span
                className="flex-1 h-px bg-gradient-to-r from-violet/30 to-transparent"
                aria-hidden="true"
              />
            </Reveal>
            <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {group.sites.map((s, i) => (
                <SiteCard key={s.domain} site={s} delay={(i % 3) * 90} />
              ))}
            </ul>
          </section>
        ))}

        <section
          id="previous-clients"
          aria-labelledby="previous-clients-title"
          hidden={!show(PREVIOUS)}>
          <Reveal className="flex items-center gap-4 mb-3">
            <h2
              id="previous-clients-title"
              className="text-2xl sm:text-3xl font-extrabold text-white">
              Previous clients
            </h2>
            <span
              className="flex-1 h-px bg-gradient-to-r from-violet/30 to-transparent"
              aria-hidden="true"
            />
          </Reveal>
          <p className="mb-8 text-violet">
            Businesses I worked on that are no longer active clients.
          </p>
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {PREVIOUS_CLIENT_SITES.map((s, i) => (
              <SiteCard key={s.domain} site={s} delay={i * 90} badge={s.industry} />
            ))}
            {PREVIOUS_CLIENTS_NO_WEBSITE.map((name, i) => (
              <NoWebsiteCard
                key={name}
                name={name}
                delay={((PREVIOUS_CLIENT_SITES.length + i) % 3) * 90}
              />
            ))}
          </ul>
        </section>

        {filter === 'all' && (
          <Reveal className="card card-glow p-6 sm:p-8 grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8">
              <p className="text-xs font-semibold tracking-widest text-pink uppercase">
                The agency
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-white">AAA Digital</h2>
              <p className="mt-2 text-violet leading-relaxed">
                All of this work is carried out at I Market &amp; Manage Private Limited (AAA
                Digital), Australia, where I also manage SEO for the agency&apos;s own website. That
                brings the total to {ACTIVE_WEBSITES} active websites: {withSites} client websites
                shown above, {CLIENTS_WITHOUT_WEBSITE.length} active clients without a public
                website ({CLIENTS_WITHOUT_WEBSITE.join(' and ')}), and the agency site.
              </p>
              <div className="mt-5">
                <Button href={`https://${AGENCY_SITE.domain}/`} type="outlined" external>
                  Visit aaadigital.com.au
                </Button>
              </div>
            </div>
            <a
              href={`https://${AGENCY_SITE.domain}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="md:col-span-4 block rounded-xl overflow-hidden border border-violet/20 relative aspect-16-10"
              aria-label="AAA Digital website homepage (opens in a new tab)">
              <Image
                src={AGENCY_SITE.img}
                alt="AAA Digital website homepage"
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover object-top"
              />
            </a>
          </Reveal>
        )}

        <p className="text-xs text-violet/80">
          Screenshots of each homepage captured in October 2026. All businesses belong to their
          respective owners and are listed only to show the websites I have done SEO work on.
        </p>
      </div>
    </>
  );
}
