/* eslint-disable react/require-default-props */
import Link from 'next/link';
import { ArrowRight } from 'react-feather';
import { Reveal, SectionHeading } from '@shared-components';
import ScrollTimeline from '../../shared/components/scroll-timeline';
import { EXPERIENCE } from '@utils/data';
import { Role } from '@utils/types';

const PREVIEW_BULLETS = 4;

function RoleCard({ role, preview }: { role: Role; preview: boolean }): JSX.Element {
  const isSeo = role.kind === 'seo';
  const current = !role.endDate;
  const bullets = preview
    ? role.responsibilities.slice(0, isSeo ? PREVIEW_BULLETS : 2)
    : role.responsibilities;
  const hidden = role.responsibilities.length - bullets.length;

  return (
    <li className="timeline-item relative pl-12 sm:pl-16 pb-12 last:pb-0">
      <span
        className={`timeline-dot ${current ? 'timeline-dot-current' : ''}`}
        aria-hidden="true"
      />
      <Reveal
        as="article"
        variant="left"
        className={`card spotlight timeline-card ${isSeo ? 'p-6 sm:p-8' : 'p-5 sm:p-6'}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
          <div>
            {current && <p className="badge-live mb-3">Current role</p>}
            <h3 className={`${isSeo ? 'text-xl sm:text-2xl' : 'text-lg'} font-bold text-white`}>
              {role.position}
            </h3>
            <p className="mt-1 text-pink font-medium">
              {role.companyUrl ? (
                <a
                  href={role.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {role.company}
                </a>
              ) : (
                role.company
              )}
            </p>
          </div>
          <div className="text-sm text-violet sm:text-right">
            <p className="font-semibold text-white">
              <time>{role.startDate}</time> – {current ? 'Present' : <time>{role.endDate}</time>}
            </p>
            <p>{role.location}</p>
          </div>
        </div>
        {!isSeo && <p className="mt-3 chip inline-block">Development background</p>}
        <ul
          className={`mt-5 grid gap-2 ${
            !preview && isSeo && role.responsibilities.length > 6 ? 'md:grid-cols-2 md:gap-x-8' : ''
          }`}
        >
          {bullets.map((r) => (
            <li key={r} className="flex items-start gap-2 text-sm text-violet leading-relaxed">
              <span
                className="mt-2 w-1.5 h-1.5 rounded-full bg-pink flex-shrink-0"
                aria-hidden="true"
              />
              {r}
            </li>
          ))}
        </ul>
        {preview && hidden > 0 && (
          <p className="mt-3 text-xs text-violet/80">
            + {hidden} more {hidden === 1 ? 'responsibility' : 'responsibilities'}
          </p>
        )}
      </Reveal>
    </li>
  );
}

type Props = {
  preview?: boolean;
  headingLevel?: 'page' | 'section';
};

export default function Experience({
  preview = false,
  headingLevel = 'section'
}: Props): JSX.Element {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className={headingLevel === 'page' ? 'pb-20' : 'section'}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {headingLevel === 'section' && (
          <SectionHeading
            index="07"
            id="experience-title"
            eyebrow="Career"
            title={
              <>
                Professional <span className="text-pink">Experience</span>
              </>
            }
            lead="SEO first, with a development foundation underneath it."
          />
        )}
        {headingLevel === 'page' && (
          <h2 id="experience-title" className="sr-only">
            Career timeline
          </h2>
        )}
        <ScrollTimeline>
          {EXPERIENCE.map((role) => (
            <RoleCard key={`${role.position}-${role.startDate}`} role={role} preview={preview} />
          ))}
        </ScrollTimeline>
        {preview && (
          <Reveal className="mt-10 text-center">
            <Link href="/experience" className="btn-link group">
              View full experience
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
