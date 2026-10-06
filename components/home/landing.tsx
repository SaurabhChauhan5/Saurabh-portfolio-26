import { Button } from '@shared-components';
import { PROFILE, RESUME_PATH } from '@utils/data';
import RotatingWord from '../../shared/components/rotating-word';
import KeywordGlobe from '../../shared/components/keyword-globe';

const AUDIT_CHECKS = [
  'Crawlability',
  'Indexability',
  'XML sitemaps',
  'robots.txt',
  'Canonical tags',
  'Schema markup',
  'Internal linking',
  'Core Web Vitals'
];

function AuditBadge(): JSX.Element {
  return (
    <div className="audit-badge card card-glow shadow-violet-5xl" aria-hidden="true">
      <div className="flex items-center gap-2 text-xs text-violet">
        <span className="w-2.5 h-2.5 rounded-full bg-pink/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-violet/60" />
        <span className="ml-1 tracking-wide">Technical SEO audit</span>
      </div>
      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
        {AUDIT_CHECKS.map((item, i) => (
          <li
            key={item}
            className="audit-row flex items-center gap-2 text-xs text-white"
            style={{ animationDelay: `${500 + i * 120}ms` }}>
            <span className="audit-check audit-check-sm">
              <svg viewBox="0 0 16 16" width="9" height="9" fill="none">
                <path
                  d="M3 8.5l3 3 7-7"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const BR = '/images/brands';
const HERO_PLATFORMS = [
  { name: 'HTML', icon: `${BR}/html5.svg` },
  { name: 'WordPress', icon: `${BR}/wordpress.svg` },
  { name: 'Shopify', icon: `${BR}/shopify.svg` },
  { name: 'Wix', icon: `${BR}/wix.svg` }
];

const GLOBE_WORDS = [
  'Crawlability',
  'XML sitemaps',
  'robots.txt',
  'Canonicals',
  'Schema',
  'Core Web Vitals',
  'Indexing',
  'Internal links',
  'PageSpeed',
  'Search Console',
  'GA4',
  'SEMrush',
  'Rank Math',
  'Local SEO',
  'Google Business Profile',
  'Citations',
  'Backlinks',
  'Meta titles',
  'Descriptions',
  'Headings',
  'Semantic HTML',
  'Shopify',
  'WordPress',
  'Wix',
  'HTML',
  'Structured data',
  'LCP',
  'CLS',
  'INP',
  'Keywords',
  'Landing pages',
  'Site architecture',
  'Redirects',
  'Alt text',
  'Mobile-first',
  'Audits'
];

const TOOLS = [
  'Google Search Console',
  'GA4',
  'SEMrush',
  'PageSpeed Insights',
  'Rank Math',
  'Core Web Vitals',
  'Schema.org',
  'WordPress',
  'Shopify',
  'Wix',
  'HTML5',
  'Git & GitHub'
];

function ToolsMarquee(): JSX.Element {
  return (
    <div
      className="marquee relative mt-12 lg:mt-14 border-y border-violet/10 py-4"
      aria-label="Tools and platforms I use">
      <ul className="marquee-track">
        {/* The second copy only exists for the seamless loop. */}
        {[
          ...TOOLS.map((t) => ({ tool: t, copy: false })),
          ...TOOLS.map((t) => ({ tool: t, copy: true }))
        ].map(({ tool, copy }) => (
          <li
            key={`${tool}${copy ? '-copy' : ''}`}
            aria-hidden={copy ? 'true' : undefined}
            className="marquee-item">
            <span className="marquee-dot" aria-hidden="true" />
            {tool}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Landing(): JSX.Element {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 lg:pt-32">
      <div className="hero-glow" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />
      <span
        data-parallax="-0.12"
        className="absolute right-0 bottom-0 w-2/3 md:w-1/2 lg:w-1/3 pointer-events-none"
        aria-hidden="true">
        <img
          src="/images/vectors/ellipse.svg"
          alt=""
          width={500}
          height={500}
          className="w-full opacity-60"
        />
      </span>
      <span
        data-parallax="0.2"
        className="absolute left-1/2 top-28 hidden sm:block pointer-events-none"
        aria-hidden="true">
        <img
          src="/images/vectors/triangle.svg"
          alt=""
          width={64}
          height={64}
          className="w-12 md:w-16 animate-spin opacity-80"
        />
      </span>

      <div className="relative max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7">
          <p className="availability hero-anim">
            <span className="pulse-dot" aria-hidden="true" />
            {PROFILE.credibility}
          </p>
          <h1 id="hero-title" className="mt-6 font-extrabold text-white leading-none">
            <span className="flex flex-wrap items-center gap-3 text-xl sm:text-2xl text-violet font-semibold mb-3">
              {PROFILE.name}
              <span className="hero-tag">Technical SEO</span>
            </span>
            <span className="block text-5xl sm:text-6xl xl:text-7xl tracking-tight">
              SEO <span className="shimmer-text">Specialist</span>
            </span>
          </h1>
          <p
            className="mt-5 text-2xl sm:text-3xl font-semibold text-white hero-anim"
            style={{ animationDelay: '80ms' }}>
            I make websites{' '}
            <RotatingWord
              className="serif-accent text-pink"
              words={['indexable.', 'crawlable.', 'faster.', 'easier to find.', 'locally visible.']}
            />
          </p>
          <ul
            className="hero-focus mt-5 hero-anim"
            style={{ animationDelay: '120ms' }}
            aria-label="Focus areas">
            {PROFILE.focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          <p
            className="mt-5 text-base sm:text-lg text-violet leading-relaxed max-w-xl hero-anim"
            style={{ animationDelay: '200ms' }}>
            {PROFILE.summary} With a B.Tech in Computer Science and a front-end development
            background, I speak your developers&apos; language.
          </p>

          <div
            className="mt-7 flex flex-wrap items-center gap-4 hero-anim"
            style={{ animationDelay: '280ms' }}>
            <Button href="/case-studies">View SEO Work</Button>
            <Button href="/connect" type="outlined">
              Contact Me
            </Button>
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-violet hover:text-pink transition-colors px-1 py-2">
              Download Resume
            </a>
          </div>

          <div
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 hero-anim"
            style={{ animationDelay: '340ms' }}>
            <span className="text-xs font-semibold tracking-widest text-violet/80 uppercase">
              Platforms
            </span>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Platforms">
              {HERO_PLATFORMS.map((p) => (
                <li key={p.name} className="hero-platform">
                  <img src={p.icon} alt="" width={20} height={20} />
                  {p.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-5 hero-anim" style={{ animationDelay: '300ms' }}>
          {/* Desktop: the keyword globe, with the compact audit badge underneath it. */}
          <div className="hidden lg:flex flex-col items-center">
            <div className="relative w-full globe-stage">
              <KeywordGlobe words={GLOBE_WORDS} className="hero-globe" />
            </div>
            <div className="float-slow -mt-2">
              <AuditBadge />
            </div>
          </div>
          {/* Phones and tablets: the compact audit badge (no globe). */}
          <div className="lg:hidden flex justify-center float-slow">
            <AuditBadge />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToolsMarquee />
      </div>
    </section>
  );
}
