import { Reveal, SectionHeading } from '@shared-components';
import { ABOUT_AREAS } from '@utils/data';

const WORKFLOW = [
  {
    step: 'Audit',
    text: 'Crawl, index, sitemap, robots.txt, canonical, schema and Core Web Vitals checks.'
  },
  {
    step: 'Prioritize',
    text: 'Turn findings into clear technical SEO requirements and priorities.'
  },
  { step: 'Implement', text: 'Fix it myself where I can, or guide developers through the change.' },
  { step: 'Monitor', text: 'Track indexing and visibility in Search Console, GA4 and SEMrush.' }
];

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
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          <Reveal className="lg:col-span-7 space-y-5 text-violet text-base sm:text-lg leading-relaxed">
            <p>
              I am an <strong className="text-white font-semibold">SEO Specialist</strong> with
              experience in technical, on-page, off-page, local and eCommerce SEO for Australian
              businesses across HTML, WordPress, Shopify and Wix.
            </p>
            <p>
              I currently manage SEO across{' '}
              <strong className="text-white font-semibold">
                24 active Australian business websites
              </strong>{' '}
              at I Market &amp; Manage Private Limited (
              <a
                href="https://aaadigital.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink hover:underline">
                AAA Digital
              </a>
              ), Australia.
            </p>
            <p>
              I also have a B.Tech in Computer Science &amp; Engineering and a front-end development
              background, so I understand HTML, CSS, JavaScript, website structure, performance and
              developer implementation requirements. That lets me communicate with developers on
              their terms and guide technical SEO fixes through to implementation. I am currently
              pursuing an MBA in Business Analytics &amp; Digital Marketing.
            </p>
            <div className="pt-2">
              <h3 className="text-white font-semibold text-base mb-3">My work spans</h3>
              <ul className="flex flex-wrap gap-2">
                {ABOUT_AREAS.map((area) => (
                  <li key={area} className="chip">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal variant="right" className="card spotlight p-6 sm:p-8">
              <h3 className="text-white font-bold text-lg">How I work with dev teams</h3>
              <p className="mt-1 text-sm text-violet">
                SEO + technical web knowledge + developer collaboration.
              </p>
              <ol className="mt-6 relative workflow">
                {WORKFLOW.map((w, i) => (
                  <li key={w.step} className="relative pl-12 pb-6 last:pb-0">
                    <span className="workflow-num">{i + 1}</span>
                    <p className="text-white font-semibold">{w.step}</p>
                    <p className="text-sm text-violet leading-relaxed">{w.text}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
