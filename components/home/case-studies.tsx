/* eslint-disable react/require-default-props */
import Link from 'next/link';
import { ArrowRight, MapPin } from 'react-feather';
import { CountUp, Icon, Reveal, SectionHeading } from '@shared-components';
import {
  CASE_STUDIES,
  CLIENT_LOCATIONS,
  INDEXATION,
  INDUSTRIES,
  MULTI_PLATFORM_EXAMPLES,
  platformCount,
  platformHref,
  SERVICE_SCOPE
} from '@utils/data';
import { CaseStudy } from '@utils/types';
import TopicIcon from '../../shared/components/topic-icon';

function WorkList({ items }: { items: string[] }): JSX.Element {
  return (
    <ul className="space-y-2">
      {items.map((w) => (
        <li key={w} className="flex items-start gap-3 text-sm sm:text-base text-violet">
          <TopicIcon label={w} size={16} className="mt-1" />
          {w}
        </li>
      ))}
    </ul>
  );
}

function CaseHeader({ cs, compact = false }: { cs: CaseStudy; compact?: boolean }): JSX.Element {
  return (
    <>
      <p className="text-xs font-semibold tracking-widest text-pink uppercase">
        Case study {cs.number}
      </p>
      <h3
        className={`mt-2 ${
          compact ? 'text-base sm:text-2xl' : 'text-2xl sm:text-3xl'
        } font-extrabold text-white leading-tight`}>
        {cs.title}
      </h3>
      <p className={`mt-2 text-sm text-violet ${compact ? 'hidden sm:block' : ''}`}>
        <span className="text-white font-medium">Context:</span> {cs.context}
      </p>
    </>
  );
}

function IndexationChart({ compact = false }: { compact?: boolean }): JSX.Element {
  const beforePct = (INDEXATION.before / INDEXATION.after) * 100;
  return (
    <figure
      className={`card-inner ${
        compact ? 'p-4 sm:p-6' : 'p-6 sm:p-8'
      } h-full flex flex-col justify-center`}>
      <p className="text-sm text-violet">Indexed pages</p>
      <p
        className={`mt-1 ${
          compact ? 'text-5xl sm:text-6xl' : 'text-5xl sm:text-7xl'
        } font-extrabold gradient-text leading-none`}>
        <CountUp end={INDEXATION.after} suffix="+" duration={2000} />
      </p>
      <p className="mt-2 text-sm text-violet">
        up from approximately <span className="text-white font-semibold">{INDEXATION.before}</span>
      </p>

      <div className={compact ? 'mt-5 space-y-3' : 'mt-8 space-y-5'}>
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
      <figcaption className={`${compact ? 'mt-4' : 'mt-6'} text-xs text-violet/80 leading-relaxed`}>
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
      className="card spotlight hover-lift p-4 sm:p-6 flex flex-col min-w-0">
      <CaseHeader cs={cs} compact />
      <ul className="hidden sm:block mt-4 space-y-1.5 flex-1">
        {cs.work.slice(0, 2).map((w) => (
          <li key={w} className="flex items-start gap-2 text-sm text-violet">
            <TopicIcon label={w} size={14} className="mt-0.5" />
            {w}
          </li>
        ))}
      </ul>
      <Link
        href={`/case-studies#${cs.id}`}
        className="mt-auto pt-3 sm:hidden inline-flex items-center gap-1 text-sm text-pink font-medium">
        Read
        <span className="sr-only"> case study: {cs.title}</span>
        <ArrowRight size={14} aria-hidden="true" />
      </Link>
      <Link
        href={`/case-studies#${cs.id}`}
        className="hidden sm:inline-flex btn-link group mt-5 self-start">
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
      className={`section ${preview ? 'bg-navy/60' : 'pt-4'}`}>
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
            lead="Technical, multi-platform and local SEO work from real client projects, presented factually and without inflated claims."
          />
        )}

        {/* Case study 01 — featured */}
        <Reveal
          as="article"
          className="card spotlight card-glow overflow-hidden grid lg:grid-cols-2 scroll-mt-28"
          id={indexation.id}>
          {preview ? (
            <div className="p-4 sm:p-8 flex flex-col">
              <CaseHeader cs={indexation} compact />
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-pink font-medium">
                {indexation.result}
              </p>
              <ul className="hidden sm:block mt-4 space-y-1.5">
                {indexation.work.slice(0, 3).map((w) => (
                  <li key={w} className="flex items-start gap-2 text-sm text-violet">
                    <TopicIcon label={w} size={14} className="mt-0.5" />
                    {w}
                  </li>
                ))}
              </ul>
              <Link
                href={`/case-studies#${indexation.id}`}
                className="btn-link group mt-4 sm:mt-5 self-start">
                Read case study
                <span className="sr-only">: {indexation.title}</span>
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          ) : (
            <div className="p-6 sm:p-10">
              <CaseHeader cs={indexation} />
              <h4 className="mt-6 text-white font-semibold">Problem</h4>
              <p className="mt-1 text-violet">{indexation.problem}</p>
              <h4 className="mt-6 mb-3 text-white font-semibold">Work performed</h4>
              <WorkList items={indexation.work} />
              <h4 className="mt-6 text-white font-semibold">Result</h4>
              <p className="mt-1 text-pink font-medium">{indexation.result}</p>
            </div>
          )}
          <div className={preview ? 'px-3 pb-3 sm:p-5 lg:pl-0' : 'p-4 sm:p-6 lg:p-8 lg:pl-0'}>
            <IndexationChart compact={preview} />
          </div>
        </Reveal>

        {preview ? (
          <div className="mt-3 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-6">
            <TeaserCard cs={multiPlatform} delay={0} />
            <TeaserCard cs={local} delay={120} />
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <Reveal
              as="article"
              className="card spotlight overflow-hidden grid lg:grid-cols-2 scroll-mt-28"
              id={multiPlatform.id}>
              <div className="p-6 sm:p-10">
                <CaseHeader cs={multiPlatform} />
                <h4 className="mt-6 mb-3 text-white font-semibold">Work included</h4>
                <WorkList items={multiPlatform.work} />
              </div>
              <div className="p-4 sm:p-6 lg:p-8 lg:pl-0">
                <div className="card-inner p-6 h-full">
                  <h4 className="text-xs font-semibold tracking-widest text-pink uppercase">
                    Platform experience examples
                  </h4>
                  <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                    {MULTI_PLATFORM_EXAMPLES.map((ex) => (
                      <li key={ex.platform} className="platform-example">
                        <span className="brand-tile">
                          <TopicIcon label={ex.platform} size={22} />
                        </span>
                        <span>
                          <span className="block text-white font-semibold">{ex.platform}</span>
                          <span className="block mt-0.5 text-sm text-violet leading-snug">
                            {ex.sites
                              .filter((st) => st.url)
                              .slice(0, 3)
                              .map((st, k) => (
                                <span key={st.name}>
                                  {k > 0 && <span aria-hidden="true"> · </span>}
                                  <a
                                    href={st.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block py-1 text-violet underline decoration-violet/40 underline-offset-2 hover:text-pink hover:decoration-pink transition-colors">
                                    {st.name}
                                    <span className="sr-only"> (opens in a new tab)</span>
                                  </a>
                                </span>
                              ))}
                          </span>
                          <Link
                            href={platformHref(ex.platform)}
                            className="mt-1 inline-flex items-center gap-1 py-1.5 text-xs text-pink font-medium hover:underline">
                            View all {platformCount(ex.platform)}
                            <span className="sr-only"> {ex.platform} websites</span>
                            <span aria-hidden="true">→</span>
                          </Link>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs text-violet/80">
                    Listed as platform experience examples, not performance claims.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal
              as="article"
              className="card spotlight overflow-hidden grid lg:grid-cols-2 scroll-mt-28"
              id={local.id}>
              <div className="p-6 sm:p-10">
                <CaseHeader cs={local} />
                <h4 className="mt-6 mb-3 text-white font-semibold">Work included</h4>
                <WorkList items={local.work} />
                <div className="mt-8 card-inner p-4 flex items-center gap-4">
                  <span className="pulse-dot" aria-hidden="true" />
                  <p className="text-sm text-violet">
                    An ongoing part of my day-to-day SEO work for{' '}
                    <span className="text-white font-semibold">Australian business clients</span>.
                  </p>
                </div>
              </div>
              <div className="p-4 sm:p-6 lg:p-8 lg:pl-0">
                <div className="card-inner p-6 h-full">
                  <h4 className="text-xs font-semibold tracking-widest text-pink uppercase">
                    Where this work applies
                  </h4>
                  <p className="mt-2 text-sm text-violet">
                    Local and service businesses among my active clients:
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {INDUSTRIES.map((ind) => (
                      <li key={ind.name} className="chip inline-flex items-center gap-1.5">
                        <Icon name={ind.icon} size={13} className="text-pink" />
                        {ind.name}
                      </li>
                    ))}
                  </ul>
                  <h4 className="mt-6 text-xs font-semibold tracking-widest text-pink uppercase">
                    Locations
                  </h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {CLIENT_LOCATIONS.map((loc) => (
                      <li key={loc} className="chip inline-flex items-center gap-1.5">
                        <MapPin size={13} className="text-pink" aria-hidden="true" />
                        {loc}
                      </li>
                    ))}
                  </ul>
                  <h4 className="mt-6 text-xs font-semibold tracking-widest text-pink uppercase">
                    Service scope
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {SERVICE_SCOPE.map((sc) => (
                      <li
                        key={sc.label}
                        className="flex items-center justify-between gap-3 rounded-xl border border-violet/15 px-3 py-2 text-sm">
                        <span className="text-violet">{sc.label}</span>
                        <span className="text-white font-semibold tabular-nums">{sc.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
