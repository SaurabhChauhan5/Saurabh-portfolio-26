/* eslint-disable react/require-default-props */
import Link from 'next/link';
import { ArrowRight } from 'react-feather';
import { CountUp, Reveal, SectionHeading } from '@shared-components';
import { CASE_STUDIES, INDEXATION, MULTI_PLATFORM_EXAMPLES } from '@utils/data';
import { CaseStudy } from '@utils/types';

function WorkList({ items }: { items: string[] }): JSX.Element {
  return (
    <ul className="space-y-2">
      {items.map((w) => (
        <li key={w} className="flex items-start gap-3 text-sm sm:text-base text-violet">
          <svg
            className="mt-1 flex-shrink-0 text-pink"
            viewBox="0 0 16 16"
            width="14"
            height="14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 8.5l3 3 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {w}
        </li>
      ))}
    </ul>
  );
}

function CaseHeader({ cs }: { cs: CaseStudy }): JSX.Element {
  return (
    <>
      <p className="text-xs font-semibold tracking-widest text-pink uppercase">
        Case study {cs.number}
      </p>
      <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white leading-tight">
        {cs.title}
      </h3>
      <p className="mt-2 text-sm text-violet">
        <span className="text-white font-medium">Context:</span> {cs.context}
      </p>
    </>
  );
}

function IndexationChart(): JSX.Element {
  const beforePct = (INDEXATION.before / INDEXATION.after) * 100;
  return (
    <figure className="card-inner p-6 sm:p-8 h-full flex flex-col justify-center">
      <p className="text-sm text-violet">Indexed pages</p>
      <p className="mt-1 text-5xl sm:text-7xl font-extrabold gradient-text leading-none">
        <CountUp end={INDEXATION.after} suffix="+" duration={2000} />
      </p>
      <p className="mt-2 text-sm text-violet">
        up from approximately <span className="text-white font-semibold">{INDEXATION.before}</span>
      </p>

      <div className="mt-8 space-y-5">
        <div>
          <div className="flex justify-between text-xs text-violet mb-2">
            <span>Before</span>
            <span>~{INDEXATION.before}</span>
          </div>
          <div className="h-4 rounded-full bg-violet/10 overflow-hidden">
            <span
              className="grow-bar block h-full rounded-full bg-violet/60"
              style={{ width: `${beforePct}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-violet mb-2">
            <span>After</span>
            <span className="text-white font-semibold">
              {INDEXATION.after.toLocaleString('en-US')}+
            </span>
          </div>
          <div className="h-4 rounded-full bg-violet/10 overflow-hidden">
            <span
              className="grow-bar block h-full rounded-full bg-gradient-to-r from-violet to-pink"
              style={{ width: '100%', transitionDelay: '250ms' }}
            />
          </div>
        </div>
      </div>
      <figcaption className="mt-6 text-xs text-violet/80 leading-relaxed">
        Indexed page count as monitored in Google Search Console. This case study measures
        indexation only — not traffic or rankings.
      </figcaption>
    </figure>
  );
}

function TeaserCard({ cs, delay }: { cs: CaseStudy; delay: number }): JSX.Element {
  return (
    <Reveal
      as="article"
      delay={delay}
      className="card spotlight hover-lift p-6 sm:p-8 flex flex-col"
    >
      <CaseHeader cs={cs} />
      <ul className="mt-5 space-y-2 flex-1">
        {cs.work.slice(0, 3).map((w) => (
          <li key={w} className="flex items-start gap-2 text-sm text-violet">
            <span
              className="mt-2 w-1.5 h-1.5 rounded-full bg-pink flex-shrink-0"
              aria-hidden="true"
            />
            {w}
          </li>
        ))}
      </ul>
      <Link href={`/case-studies#${cs.id}`} className="btn-link group mt-6 self-start">
        Read case study
        <span className="sr-only">: {cs.title}</span>
        <ArrowRight
          size={18}
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1"
        />
      </Link>
    </Reveal>
  );
}

type Props = {
  preview?: boolean;
};

export default function CaseStudies({ preview = false }: Props): JSX.Element {
  const [indexation, multiPlatform, local] = CASE_STUDIES;
  return (
    <section
      id="case-studies"
      aria-labelledby={preview ? 'case-studies-title' : undefined}
      aria-label={preview ? undefined : 'Case studies'}
      className={`section ${preview ? 'bg-navy/60' : 'pt-4'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {preview && (
          <SectionHeading
            index="04"
            id="case-studies-title"
            eyebrow="Featured work"
            title={
              <>
                SEO <span className="text-pink">Case Studies</span>
              </>
            }
            lead="Real work from client projects, described as it happened and without inflated numbers."
          />
        )}

        {/* Case study 01 — featured */}
        <Reveal
          as="article"
          className="card spotlight card-glow overflow-hidden grid lg:grid-cols-2"
          id={indexation.id}
        >
          <div className="p-6 sm:p-10">
            <CaseHeader cs={indexation} />
            <h4 className="mt-6 text-white font-semibold">Problem</h4>
            <p className="mt-1 text-violet">{indexation.problem}</p>
            <h4 className="mt-6 mb-3 text-white font-semibold">Work performed</h4>
            <WorkList items={indexation.work} />
            <h4 className="mt-6 text-white font-semibold">Result</h4>
            <p className="mt-1 text-pink font-medium">{indexation.result}</p>
          </div>
          <div className="p-4 sm:p-6 lg:p-8 lg:pl-0">
            <IndexationChart />
          </div>
        </Reveal>

        {preview ? (
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <TeaserCard cs={multiPlatform} delay={0} />
            <TeaserCard cs={local} delay={120} />
          </div>
        ) : (
          <div className="mt-6 grid lg:grid-cols-2 gap-6">
            <Reveal
              as="article"
              variant="left"
              className="card spotlight p-6 sm:p-8"
              id={multiPlatform.id}
            >
              <CaseHeader cs={multiPlatform} />
              <div className="mt-6">
                <WorkList items={multiPlatform.work} />
              </div>
              <h4 className="mt-6 mb-3 text-white font-semibold">Experience examples</h4>
              <dl className="grid sm:grid-cols-2 gap-3">
                {MULTI_PLATFORM_EXAMPLES.map((ex) => (
                  <div key={ex.platform} className="card-inner p-4">
                    <dt className="text-pink text-sm font-semibold">{ex.platform}</dt>
                    <dd className="mt-1 text-sm text-violet">{ex.sites.join(' · ')}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-violet/80">
                Listed as platform experience examples, not performance claims.
              </p>
            </Reveal>

            <Reveal
              as="article"
              variant="right"
              delay={120}
              className="card spotlight p-6 sm:p-8"
              id={local.id}
            >
              <CaseHeader cs={local} />
              <div className="mt-6">
                <WorkList items={local.work} />
              </div>
              <div className="mt-8 card-inner p-5 flex items-center gap-4">
                <span className="pulse-dot" aria-hidden="true" />
                <p className="text-sm text-violet">
                  An ongoing part of my day-to-day SEO work for{' '}
                  <span className="text-white font-semibold">Australian business clients</span>.
                </p>
              </div>
            </Reveal>
          </div>
        )}
        {preview && (
          <Reveal className="mt-10 text-center">
            <Link href="/case-studies" className="btn-link group">
              View all case studies
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
