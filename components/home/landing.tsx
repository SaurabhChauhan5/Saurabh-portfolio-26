import { Button } from '@shared-components';
import RotatingWord from '../../shared/components/rotating-word';
import KeywordGlobe from '../../shared/components/keyword-globe';
import { PROFILE, RESUME_PATH } from '@utils/data';

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

function AuditCard(): JSX.Element {
  return (
    <div
      className="audit-card card card-glow relative w-full max-w-md mx-auto shadow-violet-5xl"
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 px-5 py-3 border-b border-violet/20">
        <span className="w-3 h-3 rounded-full bg-pink/80" />
        <span className="w-3 h-3 rounded-full bg-violet/60" />
        <span className="w-3 h-3 rounded-full bg-violet/30" />
        <span className="ml-3 text-xs text-violet tracking-wide">Technical SEO audit</span>
      </div>
      <div className="relative px-5 py-4 overflow-hidden">
        <span className="audit-scan" />
        <ul className="space-y-2.5">
          {AUDIT_CHECKS.map((item, i) => (
            <li
              key={item}
              className="audit-row flex items-center justify-between text-sm text-white"
              style={{ animationDelay: `${500 + i * 140}ms` }}
            >
              <span className="flex items-center gap-3">
                <span className="audit-check">
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
                    <path
                      d="M3 8.5l3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {item}
              </span>
              <span className="h-1.5 rounded-full bg-violet/20 w-16 sm:w-24 overflow-hidden">
                <span
                  className="audit-bar block h-full bg-gradient-to-r from-pink to-violet"
                  style={{ animationDelay: `${600 + i * 140}ms` }}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-5 py-3 border-t border-violet/20 flex flex-wrap gap-2">
        {['HTML', 'WordPress', 'Shopify', 'Wix'].map((p) => (
          <span key={p} className="chip">
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

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
            style={{ animationDelay: `${500 + i * 120}ms` }}
          >
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
      className="marquee relative mt-14 lg:mt-20 border-y border-violet/10 py-4"
      aria-label="Tools and platforms I use"
    >
      <ul className="marquee-track">
        {[...TOOLS, ...TOOLS].map((tool, i) => (
          // The second copy only exists for the seamless loop.
          // eslint-disable-next-line react/no-array-index-key
          <li
            key={`${tool}-${i}`}
            aria-hidden={i >= TOOLS.length ? 'true' : undefined}
            className="marquee-item"
          >
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
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 lg:pt-36">
      <div className="hero-glow" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />
      <span
        data-parallax="-0.12"
        className="absolute right-0 bottom-0 w-2/3 md:w-1/2 lg:w-1/3 pointer-events-none"
        aria-hidden="true"
      >
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
        aria-hidden="true"
      >
        <img
          src="/images/vectors/triangle.svg"
          alt=""
          width={64}
          height={64}
          className="w-12 md:w-16 animate-spin opacity-80"
        />
      </span>

      <div className="relative max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <p className="availability hero-anim">
            <span className="pulse-dot" aria-hidden="true" />
            {PROFILE.credibility}
          </p>
          <h1 id="hero-title" className="mt-6 font-extrabold text-white leading-none">
            <span className="block text-2xl sm:text-3xl text-violet font-semibold mb-3">
              {PROFILE.name}
            </span>
            <span className="block text-5xl sm:text-6xl xl:text-7xl tracking-tight">
              SEO <span className="shimmer-text">Specialist</span>
            </span>
          </h1>
          <p
            className="mt-5 text-2xl sm:text-3xl font-semibold text-white hero-anim"
            style={{ animationDelay: '80ms' }}
          >
            I make websites{' '}
            <RotatingWord
              className="serif-accent text-pink"
              words={['crawlable.', 'indexable.', 'faster.', 'easier to find.', 'locally visible.']}
            />
          </p>
          <ul
            className="mt-6 flex flex-wrap gap-2 hero-anim"
            style={{ animationDelay: '120ms' }}
            aria-label="Focus areas"
          >
            {PROFILE.focusAreas.map((area) => (
              <li key={area} className="focus-pill">
                {area}
              </li>
            ))}
          </ul>
          <p
            className="mt-6 text-base sm:text-lg text-violet leading-relaxed max-w-xl hero-anim"
            style={{ animationDelay: '200ms' }}
          >
            {PROFILE.summary}
          </p>
          <p
            className="mt-4 flex items-start gap-3 text-sm sm:text-base text-white max-w-xl hero-anim"
            style={{ animationDelay: '260ms' }}
          >
            <span
              className="mt-2 w-2 h-2 rounded-full bg-violet flex-shrink-0"
              aria-hidden="true"
            />
            <span>
              B.Tech in Computer Science with a front-end development background, so I speak your
              developers&apos; language.
            </span>
          </p>

          <div
            className="mt-8 flex flex-wrap items-center gap-4 hero-anim"
            style={{ animationDelay: '340ms' }}
          >
            <Button href="/case-studies">View SEO Work</Button>
            <Button href="/connect" type="outlined">
              Contact Me
            </Button>
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener"
              className="link-underline text-violet hover:text-pink transition-colors px-1 py-2"
            >
              Download Resume
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 hero-anim" style={{ animationDelay: '300ms' }}>
          {/* Desktop: the keyword globe, with the compact audit badge underneath it. */}
          <div className="hidden lg:flex flex-col items-center">
            <div className="relative w-full globe-stage">
              <KeywordGlobe words={GLOBE_WORDS} className="hero-globe" />
            </div>
            <div className="float-slow mt-2">
              <AuditBadge />
            </div>
          </div>
          {/* Phones and tablets: the full audit card (no globe). */}
          <div className="lg:hidden float-slow">
            <AuditCard />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToolsMarquee />
      </div>
    </section>
  );
}
