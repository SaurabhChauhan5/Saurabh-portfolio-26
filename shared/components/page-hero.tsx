/* eslint-disable react/require-default-props */
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: { name: string; href?: string }[];
  children?: ReactNode;
  art?: ReactNode;
};

// Shared header for inner pages: breadcrumb, H1 and lead, over the hero glow.
export default function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  art
}: Props): JSX.Element {
  return (
    <header className="page-hero relative overflow-hidden pt-32 pb-14 lg:pt-40 lg:pb-20">
      <div className="hero-glow" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />
      {art && (
        <div
          className="absolute right-0 lg:right-[6%] top-24 w-72 xl:w-96 hidden lg:block pointer-events-none float-slow"
          aria-hidden="true">
          {art}
        </div>
      )}
      <span
        data-parallax="0.12"
        className={`absolute right-0 top-24 w-1/2 lg:w-1/3 pointer-events-none hidden sm:block ${
          art ? 'lg:hidden' : ''
        }`}
        aria-hidden="true">
        <img
          src="/images/vectors/l-vector.svg"
          alt=""
          width={567}
          height={381}
          className="w-full opacity-70"
        />
      </span>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-violet mb-8 hero-anim">
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map((c, i) => (
              <li key={c.name} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {c.href ? (
                  <Link href={c.href} className="hover:text-pink transition-colors">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="flex items-center hero-anim" style={{ animationDelay: '60ms' }}>
          <span className="eyebrow-line mr-3" aria-hidden="true" />
          <p className="font-medium gradient-text text-sm md:text-base tracking-wide uppercase">
            {eyebrow}
          </p>
        </div>
        <h1 className="mt-4 max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
          {title}
        </h1>
        {lead && (
          <p
            className="mt-5 max-w-2xl text-base sm:text-lg text-violet leading-relaxed hero-anim"
            style={{ animationDelay: '140ms' }}>
            {lead}
          </p>
        )}
        {children && (
          <div className="mt-8 hero-anim" style={{ animationDelay: '220ms' }}>
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
