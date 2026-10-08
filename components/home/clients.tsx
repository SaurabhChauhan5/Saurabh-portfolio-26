/* eslint-disable react/require-default-props */
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'react-feather';
import { CountUp, Icon, Reveal, SectionHeading } from '@shared-components';
import {
  ACTIVE_CLIENT_BUSINESSES,
  ACTIVE_WEBSITES,
  AGENCY,
  CLIENT_GROUPS,
  ClientWebsite,
  CLIENT_LOCATIONS,
  INDUSTRIES,
  PREVIOUS_CLIENTS,
  SERVICE_SCOPE,
  TOTAL_WEBSITES
} from '@utils/data';

const slugify = (t: string) =>
  t
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-');

const sitesFor = (industry: string): ClientWebsite[] =>
  CLIENT_GROUPS.find((g) => g.industry === industry)?.sites ?? [];

// Overlapping homepage thumbnails for an industry, with a "+N" for the rest.
function ThumbStack({
  sites,
  max,
  small = false,
  className = ''
}: {
  sites: ClientWebsite[];
  max: number;
  small?: boolean;
  className?: string;
}): JSX.Element | null {
  if (!sites.length) return null;
  const shown = sites.slice(0, max);
  const rest = sites.length - shown.length;
  return (
    <span
      className={`thumb-stack ${small ? 'thumb-stack-sm' : 'mt-4'} ${className}`}
      aria-hidden="true">
      {shown.map((site) => (
        <span key={site.domain} className="thumb">
          <Image src={site.img} alt="" fill sizes="96px" className="object-cover object-top" />
        </span>
      ))}
      {rest > 0 && <span className="thumb thumb-more">+{rest}</span>}
    </span>
  );
}

export default function Clients(): JSX.Element {
  const sorted = [...INDUSTRIES].sort((a, b) => b.count - a.count);
  const featured = sorted.slice(0, 2);
  const others = sorted.slice(2);
  return (
    <section aria-labelledby="clients-title" className="section relative overflow-hidden lg:pb-16">
      <img
        src="/images/vectors/boxes.svg"
        alt=""
        aria-hidden="true"
        width={200}
        height={200}
        loading="lazy"
        className="absolute right-6 top-16 w-24 lg:w-40 opacity-40 pointer-events-none hidden md:block"
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          id="clients-title"
          eyebrow="Australian client portfolio"
          title={
            <>
              SEO across <span className="text-pink">{ACTIVE_WEBSITES} active</span> Australian
              business websites
            </>
          }
          lead={`Local and service businesses across ${CLIENT_LOCATIONS.join(
            ' and '
          )}. Client details are kept confidential.`}
        />
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          <Reveal
            variant="scale"
            className="lg:col-span-4 card card-glow spotlight p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-1 gap-x-3 gap-y-4 content-center text-center">
            <div>
              <p className="text-4xl sm:text-6xl font-extrabold gradient-text leading-none">
                <CountUp end={ACTIVE_WEBSITES} />
              </p>
              <p className="mt-2 text-white font-semibold text-sm sm:text-lg leading-snug">
                Active business websites
              </p>
              <p className="mt-1 text-xs sm:text-sm text-violet">
                {ACTIVE_CLIENT_BUSINESSES} client businesses plus the{' '}
                <a
                  href={AGENCY.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink hover:underline">
                  {AGENCY.name}
                </a>{' '}
                agency website
              </p>
            </div>
            <div className="border-l border-violet/20 pl-3 lg:border-l-0 lg:pl-0 lg:pt-4 lg:border-t lg:order-3">
              <p className="text-4xl font-extrabold text-white leading-none">
                <CountUp end={TOTAL_WEBSITES} suffix="+" />
              </p>
              <p className="mt-2 text-white font-semibold text-sm sm:text-lg leading-snug lg:hidden">
                Managed in total
              </p>
              <p className="mt-1 lg:mt-2 text-xs sm:text-sm text-violet">
                <span className="hidden lg:inline">websites managed in total, </span>including{' '}
                {PREVIOUS_CLIENTS} previous clients
              </p>
            </div>
            <ul className="col-span-2 lg:col-span-1 lg:order-2 grid grid-cols-2 lg:grid-cols-1 gap-1.5 text-xs sm:text-sm text-left">
              {SERVICE_SCOPE.map((sc) => (
                <li
                  key={sc.label}
                  className="flex items-center justify-between gap-2 card-inner px-2.5 sm:px-3 py-1.5">
                  <span className="text-violet leading-tight">{sc.label}</span>
                  <span className="text-white font-semibold tabular-nums">{sc.count}</span>
                </li>
              ))}
            </ul>
            <ul className="col-span-2 lg:col-span-1 lg:order-4 flex flex-wrap justify-center gap-2">
              {CLIENT_LOCATIONS.map((loc) => (
                <li key={loc} className="chip inline-flex items-center gap-1.5">
                  <MapPin size={12} aria-hidden="true" />
                  {loc}
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="lg:col-span-8 grid grid-cols-2 gap-3 sm:gap-4 content-start">
            {featured.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 90} className="h-full min-w-0">
                <Link
                  href={`/clients#${slugify(ind.name)}`}
                  className="industry-feature card spotlight hover-lift group h-full flex flex-col p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="icon-tile icon-tile-sm">
                      <Icon name={ind.icon} size={18} />
                    </span>
                    <span className="text-right">
                      <span className="block text-3xl sm:text-4xl font-extrabold gradient-text leading-none tabular-nums">
                        {ind.count}
                      </span>
                      <span className="block mt-1 text-xs text-violet uppercase tracking-wide sm:tracking-wider">
                        active clients
                      </span>
                    </span>
                  </div>
                  <h3 className="mt-3 text-base sm:text-lg font-bold text-white group-hover:text-pink transition-colors">
                    {ind.name}
                  </h3>
                  <ThumbStack sites={sitesFor(ind.name)} max={2} small className="sm:hidden mt-3" />
                  <ThumbStack sites={sitesFor(ind.name)} max={4} className="hidden sm:flex" />
                  <span className="mt-auto pt-3 sm:pt-4 inline-flex items-center gap-1.5 text-sm text-pink font-medium">
                    <span className="sm:hidden">View</span>
                    <span className="hidden sm:inline">See these websites</span>
                    <ArrowRight
                      size={15}
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}

            <Reveal delay={180} className="col-span-2 card spotlight p-4 sm:p-5">
              <h3 className="text-xs font-semibold tracking-widest text-pink uppercase">
                More industries
              </h3>
              <ul className="mt-2 grid grid-cols-2 gap-x-4 sm:gap-x-8">
                {others.map((ind) => {
                  const sites = sitesFor(ind.name);
                  const row = (
                    <>
                      <span className="icon-tile icon-tile-sm">
                        <Icon name={ind.icon} size={16} />
                      </span>
                      <span className="flex-1 min-w-0 text-xs sm:text-base text-white font-medium leading-snug">
                        {ind.name}
                      </span>
                      {sites.length > 0 && (
                        <ThumbStack sites={sites} max={2} small className="hidden sm:flex" />
                      )}
                      <span className="w-5 sm:w-6 text-right text-base sm:text-lg font-extrabold gradient-text tabular-nums">
                        {ind.count}
                      </span>
                    </>
                  );
                  return (
                    <li key={ind.name} className="industry-li">
                      {sites.length > 0 ? (
                        <Link
                          href={`/clients#${slugify(ind.name)}`}
                          className="industry-row group flex items-center gap-2 sm:gap-3 py-2">
                          {row}
                        </Link>
                      ) : (
                        <span className="industry-row flex items-center gap-2 sm:gap-3 py-2">
                          {row}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
        <Reveal className="mt-8 text-center">
          <Link href="/clients" className="btn-link group">
            View all client websites
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
