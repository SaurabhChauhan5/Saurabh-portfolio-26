import Link from 'next/link';
import { ArrowRight, MapPin } from 'react-feather';
import { CountUp, Icon, Reveal, SectionHeading } from '@shared-components';
import {
  ACTIVE_CLIENT_BUSINESSES,
  ACTIVE_WEBSITES,
  AGENCY,
  CLIENT_LOCATIONS,
  INDUSTRIES,
  PREVIOUS_CLIENTS,
  SERVICE_SCOPE,
  TOTAL_WEBSITES
} from '@utils/data';

export default function Clients(): JSX.Element {
  const max = Math.max(...INDUSTRIES.map((i) => i.count));
  return (
    <section aria-labelledby="clients-title" className="section relative overflow-hidden">
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
            className="lg:col-span-4 card card-glow spotlight p-8 flex flex-col justify-center text-center">
            <p className="text-6xl sm:text-7xl font-extrabold gradient-text leading-none">
              <CountUp end={ACTIVE_WEBSITES} />
            </p>
            <p className="mt-3 text-white font-semibold text-lg">Active business websites</p>
            <p className="mt-1 text-sm text-violet">
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
            <ul className="mt-5 space-y-1.5 text-sm text-left">
              {SERVICE_SCOPE.map((sc) => (
                <li
                  key={sc.label}
                  className="flex items-center justify-between gap-3 card-inner px-3 py-2">
                  <span className="text-violet">{sc.label}</span>
                  <span className="text-white font-semibold tabular-nums">{sc.count}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-violet/20">
              <p className="text-4xl font-extrabold text-white leading-none">
                <CountUp end={TOTAL_WEBSITES} />
              </p>
              <p className="mt-2 text-sm text-violet">
                websites managed in total, including {PREVIOUS_CLIENTS} previous clients
              </p>
            </div>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {CLIENT_LOCATIONS.map((loc) => (
                <li key={loc} className="chip inline-flex items-center gap-1.5">
                  <MapPin size={12} aria-hidden="true" />
                  {loc}
                </li>
              ))}
            </ul>
          </Reveal>
          <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INDUSTRIES.map((ind, i) => (
              <Reveal
                as="li"
                key={ind.name}
                delay={i * 60}
                className="card spotlight p-4 sm:p-5 hover-lift">
                <div className="flex items-center gap-3">
                  <span className="icon-tile icon-tile-sm">
                    <Icon name={ind.icon} size={18} />
                  </span>
                  <span className="flex-1 text-sm sm:text-base text-white font-medium leading-snug">
                    {ind.name}
                  </span>
                  <span className="text-xl font-extrabold gradient-text tabular-nums">
                    {ind.count}
                  </span>
                </div>
                <span
                  className="mt-3 block h-1 rounded-full bg-violet/10 overflow-hidden"
                  aria-hidden="true">
                  <span
                    className="grow-bar block h-full rounded-full bg-gradient-to-r from-violet to-pink"
                    style={{ width: `${(ind.count / max) * 100}%` }}
                  />
                </span>
                <span className="sr-only">
                  {ind.count} active {ind.count === 1 ? 'client' : 'clients'}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal className="mt-10 text-center">
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
