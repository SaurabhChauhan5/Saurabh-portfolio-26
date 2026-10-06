import Link from 'next/link';
import { BUILT_WITH, NAV_LINKS, PROFILE, RESUME_PATH } from '@utils/data';

export default function Footer(): JSX.Element {
  return (
    <footer className="bg-navy border-t border-violet/10 text-violet">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="text-white font-bold text-lg">{PROFILE.name}</p>
          <p className="mt-1 text-sm">{PROFILE.positioning}</p>
          <p className="mt-3 text-sm">{PROFILE.location}</p>
        </div>
        <nav aria-label="Footer">
          <p className="text-white font-semibold mb-3">Explore</p>
          <ul className="grid grid-cols-2 gap-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-pink transition-colors">
                  {l.title}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink transition-colors">
                Resume
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <p className="text-white font-semibold mb-3">Get in touch</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${PROFILE.email}`}
                className="hover:text-pink transition-colors break-words">
                {PROFILE.email}
              </a>
            </li>
            <li>
              <a href={PROFILE.phoneHref} className="hover:text-pink transition-colors">
                {PROFILE.phone}
              </a>
            </li>
            <li className="flex gap-4 pt-1">
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink transition-colors">
                LinkedIn
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink transition-colors">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-violet/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-violet/80">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-2">
            Built with
            {BUILT_WITH.map((t) => (
              <span key={t.name} className="inline-flex items-center gap-1.5 text-violet">
                <img
                  src={t.icon}
                  alt=""
                  width={14}
                  height={14}
                  loading="lazy"
                  className="w-3.5 h-3.5 object-contain"
                />
                {t.name}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
