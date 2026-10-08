/* eslint-disable react/require-default-props */
import Image from 'next/image';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, Code, ExternalLink, MapPin, Sliders, X } from 'react-feather';
import { Button, Icon, Reveal } from '@shared-components';
import {
  ACTIVE_WEBSITES,
  AGENCY_SITE,
  CLIENT_GROUPS,
  CLIENTS_WITHOUT_WEBSITE,
  ClientWebsite,
  PREVIOUS_CLIENT_SITES,
  PREVIOUS_CLIENTS_NO_WEBSITE,
  PLATFORM_FILTERS,
  sitesOnPlatform,
  TOTAL_WEBSITES
} from '@utils/data';
import PageHero from '../../shared/components/page-hero';
import TopicIcon from '../../shared/components/topic-icon';

function OfflineSiteCard({
  site,
  delay
}: {
  site: { name: string; domain: string; industry: string; platform: string };
  delay: number;
}): JSX.Element {
  const initials = site.name
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
          <span className="browser-dot hidden sm:block" />
          <span className="browser-url">{site.domain}</span>
        </div>
        <div className="no-site-preview aspect-16-10" aria-hidden="true">
          <span className="no-site-initials">{initials}</span>
        </div>
        <div className="p-3 sm:p-5 flex flex-col flex-1">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-pink">
            {site.industry}
          </p>
          <h3 className="text-sm sm:text-lg font-bold text-white leading-snug">{site.name}</h3>
          <p className="mt-auto pt-2 sm:pt-3 text-xs sm:text-sm text-violet">Website offline</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs sm:text-sm text-violet">
            <TopicIcon label={site.platform} size={13} />
            {site.platform}
          </p>
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
  const location = site.location || (site.domain.endsWith('.au') ? 'Australia' : '');
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
          <span className="mt-auto" />
          {location && (
            <p className="pt-2 sm:pt-3 flex items-center gap-1.5 text-xs sm:text-sm text-violet">
              <MapPin size={13} aria-hidden="true" className="flex-shrink-0" />
              <span className="truncate">{location}</span>
            </p>
          )}
          {site.platform && (
            <p
              className={`${
                location ? 'mt-1' : 'pt-2 sm:pt-3'
              } flex items-center gap-1.5 text-xs sm:text-sm text-violet`}>
              {/^custom/i.test(site.platform) ? (
                <Code size={13} aria-hidden="true" className="flex-shrink-0 text-pink" />
              ) : (
                <TopicIcon label={site.platform} size={13} />
              )}
              <span className="truncate">{site.platform}</span>
            </p>
          )}
          <span className="sr-only">(opens in a new tab)</span>
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

type FilterOption = { id: string; label: string; count: number; icon: ReactNode };

// Bottom sheet with every filter option, used below the lg breakpoint where a
// sideways-scrolling chip row hides most options.
function FilterSheet({
  open,
  onClose,
  initialMode,
  industry,
  platform,
  active,
  onSelect
}: {
  open: boolean;
  onClose: () => void;
  initialMode: 'industry' | 'platform';
  industry: FilterOption[];
  platform: FilterOption[];
  active: string;
  onSelect: (id: string) => void;
}): JSX.Element | null {
  const [mode, setMode] = useState(initialMode);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;
    setMode(initialMode);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    setTimeout(
      () => panel.current?.querySelector<HTMLButtonElement>('[aria-pressed=true]')?.focus(),
      50
    );
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, initialMode, onClose]);

  if (!open) return null;
  const options = mode === 'platform' ? platform : industry;
  return (
    <div className="filter-sheet-wrap lg:hidden" data-lenis-prevent>
      <button
        type="button"
        className="filter-sheet-backdrop"
        aria-label="Close filters"
        onClick={onClose}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-sheet-title"
        className="filter-sheet">
        <span className="filter-sheet-handle" aria-hidden="true" />
        <div className="flex items-center justify-between gap-3">
          <h2 id="filter-sheet-title" className="text-lg font-bold text-white">
            Filter websites
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="sheet-close"
            aria-label="Close filters">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="view-toggle w-full mt-4" role="group" aria-label="Group websites by">
          {(['industry', 'platform'] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={`flex-1 justify-center ${mode === m ? 'is-active' : ''}`}>
              <Icon name={m === 'industry' ? 'grid' : 'code'} size={14} />
              {m === 'industry' ? 'By industry' : 'By platform'}
            </button>
          ))}
        </div>
        <ul className="sheet-grid mt-4">
          {options.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                aria-pressed={active === o.id}
                onClick={() => {
                  onSelect(o.id);
                  onClose();
                }}
                className={`sheet-option ${active === o.id ? 'is-active' : ''}`}>
                <span className="sheet-option-icon">{o.icon}</span>
                <span className="flex-1 min-w-0 text-left leading-tight">{o.label}</span>
                <span className="jump-count">{o.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const PREVIOUS = 'previous-clients';

export default function ClientsPage(): JSX.Element {
  const withSites = CLIENT_GROUPS.reduce((n, g) => n + g.sites.length, 0);
  const [filter, setFilter] = useState('all');
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = useCallback(() => setSheetOpen(false), []);
  const show = (id: string) => filter === 'all' || filter === id;

  // Support shareable links such as /clients#removals.
  useEffect(() => {
    const valid = [
      ...CLIENT_GROUPS.map((g) => slugify(g.industry)),
      PREVIOUS,
      ...PLATFORM_FILTERS.map((f) => f.id)
    ];
    const apply = () => {
      const hash = window.location.hash.slice(1);
      setFilter(valid.includes(hash) ? hash : 'all');
    };
    apply();
    // Arriving from a platform or industry link: jump straight to the filtered grid.
    if (valid.includes(window.location.hash.slice(1))) {
      setTimeout(
        () => document.getElementById('client-grid')?.scrollIntoView({ block: 'start' }),
        150
      );
    }
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  const select = (id: string) => {
    setFilter(id);
    window.history.replaceState(null, '', id === 'all' ? window.location.pathname : `#${id}`);
    document.getElementById('client-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const byPlatform = filter.startsWith('platform-');
  const platformFilters = PLATFORM_FILTERS.map((f) => {
    const { sites, offline } = sitesOnPlatform(f.id);
    return { id: f.id, label: f.label, count: sites.length + offline.length };
  });
  const activePlatform = PLATFORM_FILTERS.find((f) => f.id === filter);
  const platformView = activePlatform ? sitesOnPlatform(activePlatform.id) : null;
  const filters = [
    {
      id: 'all',
      label: 'All',
      icon: 'grid',
      count: withSites + PREVIOUS_CLIENT_SITES.length + PREVIOUS_CLIENTS_NO_WEBSITE.length
    },
    ...CLIENT_GROUPS.map((g) => ({
      id: slugify(g.industry),
      label: g.industry,
      icon: g.icon,
      count: g.sites.length
    })),
    {
      id: PREVIOUS,
      label: 'Previous clients',
      icon: 'archive',
      count: PREVIOUS_CLIENT_SITES.length + PREVIOUS_CLIENTS_NO_WEBSITE.length
    }
  ];
  const platformIcon = (label: string) =>
    label === 'Custom-built' ? (
      <Code size={14} aria-hidden="true" />
    ) : (
      <TopicIcon label={label} size={14} />
    );
  const industryOptions: FilterOption[] = filters.map((f) => ({
    ...f,
    icon: <Icon name={f.icon} size={14} />
  }));
  const platformOptions: FilterOption[] = platformFilters.map((f) => ({
    ...f,
    icon: platformIcon(f.label)
  }));
  const current = [...industryOptions, ...platformOptions].find((o) => o.id === filter);
  const heroStats = [
    { value: ACTIVE_WEBSITES, label: 'Active websites' },
    { value: `${TOTAL_WEBSITES}+`, label: 'Managed in total' },
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
        lead="Hands-on SEO work across Australian business websites and multiple industries, grouped by industry. Filter by industry, or click any card to visit the live site."
        crumbs={[{ name: 'Home', href: '/' }, { name: 'Clients' }]}
        aside={
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
        }
      />

      <ShotMarquee />

      <div className="filter-bar sticky top-16 z-30 lg:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={sheetOpen}
            className="filter-trigger">
            <Sliders size={16} className="text-pink flex-shrink-0" aria-hidden="true" />
            <span className="flex-1 min-w-0 text-left leading-tight">
              <span className="block text-xs text-violet">
                {byPlatform ? 'Platform' : 'Industry'}
              </span>
              <span className="block truncate">{current?.label || 'All'}</span>
            </span>
            {current && <span className="jump-count">{current.count}</span>}
            <ChevronDown size={16} className="text-violet flex-shrink-0" aria-hidden="true" />
          </button>
          {filter !== 'all' && (
            <button
              type="button"
              onClick={() => select('all')}
              className="sheet-close flex-shrink-0"
              aria-label="Clear filter, show all websites">
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <FilterSheet
        open={sheetOpen}
        onClose={closeSheet}
        initialMode={byPlatform ? 'platform' : 'industry'}
        industry={industryOptions}
        platform={platformOptions}
        active={filter}
        onSelect={select}
      />

      <p className="sr-only" aria-live="polite">
        {filter === 'all'
          ? 'Showing all client websites'
          : `Showing ${
              [...filters, ...platformFilters].find((f) => f.id === filter)?.label
            } websites`}
      </p>
      <div
        id="client-grid"
        className="scroll-mt-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
        <aside
          className="hidden lg:block lg:col-span-4 xl:col-span-3 lg:self-stretch client-sidebar"
          aria-label="Filter client websites">
          <div className="client-sidebar-inner" data-lenis-prevent>
            <p className="text-xs font-semibold tracking-widest text-pink uppercase">
              Filter websites
            </p>
            <div className="view-toggle w-full mt-3" role="group" aria-label="Group websites by">
              <button
                type="button"
                aria-pressed={!byPlatform}
                onClick={() => select('all')}
                className={`flex-1 justify-center ${!byPlatform ? 'is-active' : ''}`}>
                <Icon name="grid" size={14} /> Industry
              </button>
              <button
                type="button"
                aria-pressed={byPlatform}
                onClick={() => select(byPlatform ? filter : PLATFORM_FILTERS[0].id)}
                className={`flex-1 justify-center ${byPlatform ? 'is-active' : ''}`}>
                <Icon name="code" size={14} /> Platform
              </button>
            </div>
            <ul
              className="mt-3 space-y-1"
              aria-label={
                byPlatform
                  ? 'Filter client websites by platform'
                  : 'Filter client websites by industry'
              }>
              {(byPlatform ? platformOptions : industryOptions).map((o) => (
                <li key={o.id}>
                  <button
                    type="button"
                    aria-pressed={filter === o.id}
                    onClick={() => select(o.id)}
                    className={`side-option ${filter === o.id ? 'is-active' : ''}`}>
                    <span className="side-option-icon">{o.icon}</span>
                    <span className="flex-1 min-w-0 text-left truncate">{o.label}</span>
                    <span className="jump-count">{o.count}</span>
                  </button>
                </li>
              ))}
            </ul>
            {filter !== 'all' && (
              <button
                type="button"
                onClick={() => select('all')}
                className="mt-3 w-full inline-flex items-center justify-center gap-1.5 text-sm text-violet hover:text-pink py-2">
                <X size={14} aria-hidden="true" /> Show all websites
              </button>
            )}
          </div>
        </aside>
        <div className="lg:col-span-8 xl:col-span-9 min-w-0 space-y-14 sm:space-y-20">
          {activePlatform && platformView && (
            <section aria-labelledby="platform-view-title">
              <Reveal className="flex flex-wrap items-center gap-3 sm:gap-4 mb-2">
                <span className="brand-tile">
                  {activePlatform.label === 'Custom-built' ? (
                    <Code size={20} className="text-blue" aria-hidden="true" />
                  ) : (
                    <TopicIcon label={activePlatform.label} size={22} />
                  )}
                </span>
                <h2
                  id="platform-view-title"
                  className="text-xl sm:text-3xl font-extrabold text-white">
                  {activePlatform.label} websites
                </h2>
                <span className="jump-count text-sm">
                  {platformView.sites.length + platformView.offline.length}
                </span>
              </Reveal>
              <p className="mb-6 sm:mb-8 text-sm sm:text-base text-violet">
                {[
                  [platformView.sites.filter((x) => !x.previous).length, 'active'],
                  [
                    platformView.sites.filter((x) => x.previous).length +
                      platformView.offline.length,
                    'previous'
                  ]
                ]
                  .filter(([n]) => n)
                  .map(([n, l]) => `${n} ${l}`)
                  .join(' · ')}
                . Each card shows the industry, and previous clients are marked.
              </p>
              <ul className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
                {platformView.sites.map((x, i) => (
                  <SiteCard
                    key={x.domain}
                    site={x}
                    delay={(i % 3) * 90}
                    badge={x.previous ? `Previous · ${x.industry}` : x.industry}
                  />
                ))}
                {platformView.offline.map((x, i) => (
                  <OfflineSiteCard
                    key={x.domain}
                    site={x}
                    delay={((platformView.sites.length + i) % 3) * 90}
                  />
                ))}
              </ul>
            </section>
          )}

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
              <ul className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
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
            <ul className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
              {PREVIOUS_CLIENT_SITES.map((s, i) => (
                <SiteCard key={s.domain} site={s} delay={i * 90} badge={s.industry} />
              ))}
              {PREVIOUS_CLIENTS_NO_WEBSITE.map((site, i) => (
                <OfflineSiteCard
                  key={site.domain}
                  site={site}
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
                  Digital), Australia, where I also manage SEO for the agency&apos;s own website.
                  That brings the total to {ACTIVE_WEBSITES} active websites: {withSites} client
                  websites shown above, {CLIENTS_WITHOUT_WEBSITE.length} active{' '}
                  {CLIENTS_WITHOUT_WEBSITE.length === 1 ? 'client' : 'clients'} without a public
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
            Client names and sensitive analytics data are withheld where required. Work shown
            reflects responsibilities performed as part of my role at AAA Digital. Homepage
            screenshots were captured in October 2026; all businesses belong to their respective
            owners.
          </p>
        </div>
      </div>
    </>
  );
}
