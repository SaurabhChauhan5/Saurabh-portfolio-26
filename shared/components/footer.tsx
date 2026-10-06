import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUp, Clock, GitHub, Linkedin, Mail, MapPin, Phone } from 'react-feather';
import { EXPERTISE, NAV_LINKS, PROFILE, RESUME_PATH } from '@utils/data';
import Icon from './icon';

const SOCIAL = [
  { label: 'LinkedIn', href: PROFILE.linkedin, icon: Linkedin, external: true },
  { label: 'GitHub', href: PROFILE.github, icon: GitHub, external: true },
  { label: 'Email', href: `mailto:${PROFILE.email}`, icon: Mail },
  { label: 'Phone', href: PROFILE.phoneHref, icon: Phone }
];

// Local time in Gurugram, filled in on the client to avoid hydration mismatches.
function LocalTime(): JSX.Element {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-AU', {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          minute: '2-digit'
        })
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time || '--:--'}</span>;
}

export default function Footer(): JSX.Element {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="site-footer relative overflow-hidden bg-navy border-t border-violet/10 text-violet">
      <div className="footer-glow" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <span className="logo-ring">
              <img
                src="/images/logo-light.svg"
                alt=""
                width={40}
                height={40}
                loading="lazy"
                className="w-8 h-8"
              />
            </span>
            <span className="text-white font-bold text-lg group-hover:text-pink transition-colors">
              {PROFILE.name}
            </span>
          </Link>
          <p className="mt-3 text-sm text-pink font-medium">{PROFILE.positioning}</p>
          <p className="mt-3 text-sm leading-relaxed max-w-xs">
            Technical, local and eCommerce SEO for Australian businesses across HTML, WordPress,
            Shopify and Wix.
          </p>
          <ul className="mt-5 flex gap-2.5">
            {SOCIAL.map(({ label, href, icon: SIcon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="social-btn"
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <SIcon size={17} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <p className="footer-heading">Explore</p>
          <ul className="space-y-1 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="footer-link">
                  {l.title}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link">
                Resume
              </a>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <p className="footer-heading">Expertise</p>
          <ul className="space-y-1 text-sm">
            {EXPERTISE.map((g) => (
              <li key={g.title}>
                <Link href="/#expertise" className="footer-link inline-flex items-center gap-2">
                  <Icon name={g.icon} size={14} className="text-pink" />
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <p className="footer-heading">Get in touch</p>
          <ul className="space-y-1 text-sm">
            <li>
              <a
                href={`mailto:${PROFILE.email}`}
                className="footer-link inline-flex items-center gap-2 break-all">
                <Mail size={14} className="text-pink flex-shrink-0" aria-hidden="true" />
                {PROFILE.email}
              </a>
            </li>
            <li>
              <a href={PROFILE.phoneHref} className="footer-link inline-flex items-center gap-2">
                <Phone size={14} className="text-pink flex-shrink-0" aria-hidden="true" />
                {PROFILE.phone}
              </a>
            </li>
            <li className="inline-flex items-center gap-2 py-1">
              <MapPin size={14} className="text-pink flex-shrink-0" aria-hidden="true" />
              {PROFILE.location}
            </li>
            <li className="flex items-center gap-2 py-1">
              <Clock size={14} className="text-pink flex-shrink-0" aria-hidden="true" />
              <span>
                <LocalTime /> in Gurugram
              </span>
            </li>
          </ul>
          <Link href="/connect" className="nav-cta mt-5">
            Let&apos;s talk
          </Link>
        </div>
      </div>

      <p className="footer-wordmark" aria-hidden="true">
        {PROFILE.name}
      </p>

      <div className="relative border-t border-violet/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4 text-xs text-violet/80">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </p>
          <button type="button" onClick={toTop} className="back-to-top">
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
