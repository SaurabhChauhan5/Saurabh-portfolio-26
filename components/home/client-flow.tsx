import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'react-feather';
import { CLIENT_GROUPS, ACTIVE_WEBSITES } from '@utils/data';

// One site from each industry first, then the rest, so the strip shows variety.
const ordered = (() => {
  const firsts = CLIENT_GROUPS.map((g) => ({ ...g.sites[0], industry: g.industry }));
  const rest = CLIENT_GROUPS.flatMap((g) =>
    g.sites.slice(1).map((s) => ({ ...s, industry: g.industry }))
  );
  return [...firsts, ...rest].slice(0, 10);
})();

// Horizontal strip of client screenshots. It scrolls sideways on its own
// (swipe, trackpad or the arrow buttons) rather than pinning the page, so it
// never adds empty scroll height to the home page.
export default function ClientFlow(): JSX.Element {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return undefined;
    const update = () =>
      setEdge({
        start: vp.scrollLeft <= 4,
        end: vp.scrollLeft + vp.clientWidth >= vp.scrollWidth - 4
      });
    update();
    vp.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      vp.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const card = vp.querySelector('.flow-card') as HTMLElement | null;
    vp.scrollBy({ left: dir * ((card?.offsetWidth || 400) + 24), behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="flow-title" className="client-flow relative">
      <div className="flow-panel">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-end justify-between gap-6 mb-8 lg:mb-12">
          <div>
            <div className="flex items-center">
              <span className="eyebrow-line mr-3" aria-hidden="true" />
              <p className="font-medium gradient-text text-sm md:text-base tracking-wide uppercase">
                Recent work
              </p>
            </div>
            <h2
              id="flow-title"
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Websites I <span className="text-pink">work on</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flow-arrow"
              onClick={() => step(-1)}
              disabled={edge.start}
              aria-label="Previous websites">
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="flow-arrow"
              onClick={() => step(1)}
              disabled={edge.end}
              aria-label="Next websites">
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <Link href="/clients" className="btn-link group ml-2">
              All {ACTIVE_WEBSITES} websites
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <div ref={viewportRef} className="flow-viewport">
          <ul className="flow-track">
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
      </div>
    </section>
  );
}
