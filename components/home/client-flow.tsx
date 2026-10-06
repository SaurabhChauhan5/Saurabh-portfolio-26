import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowRight, ExternalLink } from 'react-feather';
import { CLIENT_GROUPS, ACTIVE_WEBSITES } from '@utils/data';

// Six featured sites, one from each industry first, so the strip shows variety.
const ordered = (() => {
  const firsts = CLIENT_GROUPS.map((g) => ({ ...g.sites[0], industry: g.industry }));
  const rest = CLIENT_GROUPS.flatMap((g) =>
    g.sites.slice(1).map((s) => ({ ...s, industry: g.industry }))
  );
  return [...firsts, ...rest].slice(0, 6);
})();

// "Pinned horizontal" section from aaadigital.com.au: on desktop the section
// pins while vertical scrolling slides the client screenshots sideways. On
// small screens (or reduced motion) it is a normal swipeable row.
export default function ClientFlow(): JSX.Element {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wide = window.matchMedia('(min-width: 1024px)');
    let distance = 0;
    let frame = 0;

    const paint = () => {
      frame = 0;
      if (!outer.classList.contains('is-pinned')) return;
      const r = outer.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(Math.max(-r.top / span, 0), 1);
      track.style.transform = `translate3d(${(-p * distance).toFixed(1)}px, 0, 0)`;
      outer.style.setProperty('--flow-p', p.toFixed(3));
      document.documentElement.classList.toggle(
        'flow-active',
        r.top <= 1 && r.bottom >= window.innerHeight - 1
      );
    };
    const size = () => {
      const pin = wide.matches && !reduce;
      outer.classList.toggle('is-pinned', pin);
      if (!pin) {
        outer.style.height = '';
        track.style.transform = '';
        return;
      }
      const viewport = track.parentElement as HTMLElement;
      const pad = parseFloat(getComputedStyle(viewport).paddingLeft) || 0;
      distance = Math.max(0, track.scrollWidth - (viewport.clientWidth - pad * 2));
      outer.style.height = `${Math.round(distance + window.innerHeight)}px`;
      paint();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    size();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', size);
    window.addEventListener('load', size);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', size);
      window.removeEventListener('load', size);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove('flow-active');
    };
  }, []);

  return (
    <section ref={outerRef} aria-labelledby="flow-title" className="client-flow relative">
      <div className="flow-panel">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-end justify-between gap-6 mb-8 lg:mb-12">
          <div>
            <div className="flex items-center">
              <span className="eyebrow-line mr-3" aria-hidden="true" />
              <p className="font-medium gradient-text text-sm md:text-base tracking-wide uppercase">
                Featured websites
              </p>
            </div>
            <h2
              id="flow-title"
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Websites I <span className="text-pink">work on</span>
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <img
              src="/images/vectors/arrows-right.svg"
              alt=""
              aria-hidden="true"
              width={111}
              height={51}
              loading="lazy"
              className="flow-chevrons hidden lg:block w-16 h-auto"
            />
            <Link href="/clients" className="btn-link group">
              All {ACTIVE_WEBSITES} websites
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <div className="flow-viewport">
          <ul ref={trackRef} className="flow-track">
            {ordered.map((site) => (
              <li key={site.domain} className="flow-card">
                <a
                  href={`https://${site.domain}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card spotlight group block overflow-hidden h-full">
                  <div className="browser-bar" aria-hidden="true">
                    <span className="browser-dot" />
                    <span className="browser-dot" />
                    <span className="browser-dot" />
                    <span className="browser-url">{site.domain}</span>
                  </div>
                  <div className="relative aspect-16-10 overflow-hidden bg-navy">
                    <Image
                      src={site.img}
                      alt={`${site.name} website homepage`}
                      fill
                      sizes="(min-width: 1024px) 440px, 80vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between gap-3">
                    <span>
                      <span className="block text-white font-semibold group-hover:text-pink transition-colors">
                        {site.name}
                      </span>
                      <span className="block text-xs text-violet">{site.industry}</span>
                    </span>
                    <ExternalLink
                      size={16}
                      className="text-violet flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </div>
                </a>
              </li>
            ))}
            <li className="flow-card flow-card-end">
              <Link
                href="/clients"
                className="card card-glow h-full flex flex-col items-center justify-center text-center p-8 group">
                <span className="text-5xl font-extrabold gradient-text">{ACTIVE_WEBSITES}</span>
                <span className="mt-2 text-white font-semibold">active websites</span>
                <span className="mt-6 btn-link">
                  See them all
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div
          className="flow-progress max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8"
          aria-hidden="true">
          <span className="flow-progress-bar" />
        </div>
      </div>
    </section>
  );
}
