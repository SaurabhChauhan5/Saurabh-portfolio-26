import { Activity, Award, BookOpen, Briefcase, List, MapPin, Search, Tool } from 'react-feather';
import { Reveal, SectionHeading } from '@shared-components';
import { ACTIVE_WEBSITES, AGENCY, PROFILE } from '@utils/data';

const BR = '/images/brands';

const FACTS = [
  { icon: MapPin, label: 'Based in', value: 'Gurugram, India · remote' },
  { icon: Briefcase, label: 'Working with', value: 'Australian businesses' },
  { icon: Award, label: 'Degree', value: 'B.Tech, Computer Science & Engineering' },
  {
    icon: BookOpen,
    label: 'Currently studying',
    value: 'MBA, Business Analytics & Digital Marketing'
  }
];

const TOOLS = [
  { name: 'Google Search Console', icon: `${BR}/googlesearchconsole.svg` },
  { name: 'GA4', icon: `${BR}/googleanalytics.svg` },
  { name: 'SEMrush', icon: `${BR}/semrush.svg` },
  { name: 'PageSpeed Insights', icon: `${BR}/pagespeedinsights.svg` },
  { name: 'Rank Math', icon: `${BR}/rankmath.png` },
  { name: 'Google Business Profile', icon: `${BR}/google.png` }
];

const PLATFORMS = [
  { name: 'HTML', icon: `${BR}/html5.svg` },
  { name: 'WordPress', icon: `${BR}/wordpress.svg` },
  { name: 'Shopify', icon: `${BR}/shopify.svg` },
  { name: 'Wix', icon: `${BR}/wix.svg` }
];

const WORKFLOW = [
  {
    step: 'Audit',
    icon: Search,
    text: 'Crawl, index, sitemap, robots.txt, canonical, schema and Core Web Vitals checks.'
  },
  {
    step: 'Prioritize',
    icon: List,
    text: 'Turn findings into clear technical SEO requirements and priorities.'
  },
  {
    step: 'Implement',
    icon: Tool,
    text: 'Fix it myself where I can, or guide developers through the change.'
  },
  {
    step: 'Monitor',
    icon: Activity,
    text: 'Track indexing and visibility in Search Console, GA4 and SEMrush.'
  }
];

function LogoRow({
  title,
  items
}: {
  title: string;
  items: { name: string; icon: string }[];
}): JSX.Element {
  return (
    <div>
      <h3 className="text-xs font-semibold tracking-widest text-pink uppercase">{title}</h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((t) => (
          <li key={t.name} className="logo-pill">
            <img src={t.icon} alt="" width={18} height={18} loading="lazy" />
            {t.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function About(): JSX.Element {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          id="about-title"
          eyebrow="About me"
          title={
            <>
              Search expertise, <span className="text-pink">engineering</span> mindset.
            </>
          }
        />
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7 space-y-8">
            <Reveal className="space-y-5 text-base sm:text-lg leading-relaxed text-violet">
              <p className="text-xl sm:text-2xl text-white leading-snug font-medium">
                I&apos;m an SEO Specialist managing SEO across{' '}
                <span className="gradient-text font-bold">
                  {ACTIVE_WEBSITES} active Australian business websites
                </span>{' '}
                at I Market &amp; Manage Private Limited (
                <a
                  href={AGENCY.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink hover:underline">
                  {AGENCY.name}
                </a>
                ).
              </p>
              <p>
                My work covers technical, on-page, off-page, local and eCommerce SEO on HTML,
                WordPress, Shopify and Wix websites.
              </p>
              <p>
                With a B.Tech in Computer Science &amp; Engineering and a front-end development
                background, I understand how websites are built. That lets me talk to developers on
                their terms and take technical SEO fixes all the way through to implementation.
              </p>
            </Reveal>

            <Reveal as="dl" delay={80} className="grid grid-cols-2 gap-3">
              {FACTS.map(({ icon: FactIcon, label, value }) => (
                <div
                  key={label}
                  className="card-inner p-3 sm:p-4 flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
                  <span className="icon-tile icon-tile-sm flex-shrink-0">
                    <FactIcon size={16} aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-xs text-violet">{label}</dt>
                    <dd className="text-sm text-white font-medium leading-snug">{value}</dd>
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal delay={140} className="space-y-6">
              <LogoRow title="Tools I use every day" items={TOOLS} />
              <LogoRow title="Platforms" items={PLATFORMS} />
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal variant="right" className="card spotlight card-glow p-6 sm:p-8">
              <h3 className="text-white font-bold text-lg">How I work with dev teams</h3>
              <p className="mt-1 text-sm text-violet">
                SEO + technical web knowledge + developer collaboration.
              </p>
              <ol className="mt-6 relative workflow">
                {WORKFLOW.map(({ step, icon: StepIcon, text }, i) => (
                  <li key={step} className="relative pl-12 pb-6 last:pb-0">
                    <span className="workflow-num">{i + 1}</span>
                    <p className="flex items-center gap-2 text-white font-semibold">
                      {step}
                      <StepIcon size={15} className="text-pink" aria-hidden="true" />
                    </p>
                    <p className="text-sm text-violet leading-relaxed">{text}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 pt-5 border-t border-violet/20 text-sm text-violet">
                Reach me at{' '}
                <a href={`mailto:${PROFILE.email}`} className="text-pink hover:underline">
                  {PROFILE.email}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
