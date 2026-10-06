import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowUpRight, Download, GitHub, Linkedin, Mail, Menu, Phone, X } from 'react-feather';
import { NAV_LINKS, PROFILE, RESUME_PATH } from '@utils/data';

// Tracks scroll position for the glass background, the progress bar and the
// hide-on-scroll-down / show-on-scroll-up behaviour.
function useScrollState(): {
  scrolled: boolean;
  hidden: boolean;
  progressRef: React.RefObject<HTMLDivElement>;
} {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;
    const update = () => {
      frame = 0;
      const { scrollY } = window;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 40);
      const delta = scrollY - lastY;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && scrollY > 320);
        lastY = scrollY;
      }
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { scrolled, hidden, progressRef };
}

// Highlights the nav item for the section that crosses the line 45% down the
// viewport. Recomputed on every scroll frame so fast (smooth) scrolling can't
// leave a stale highlight behind.
function useActiveSection(enabled: boolean): string {
  const [active, setActive] = useState('');
  useEffect(() => {
    if (!enabled) return undefined;
    const navIds = NAV_LINKS.filter((l) => l.section).map((l) => l.section);
    let frame = 0;
    const update = () => {
      frame = 0;
      if (window.scrollY < window.innerHeight * 0.5) {
        setActive('');
        return;
      }
      const line = window.innerHeight * 0.45;
      const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
      const current = sections.find((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= line && r.bottom > line;
      });
      setActive(current && navIds.includes(current.id) ? current.id : '');
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);
  return active;
}

const SOCIAL = [
  { label: 'LinkedIn', href: PROFILE.linkedin, icon: Linkedin, external: true },
  { label: 'GitHub', href: PROFILE.github, icon: GitHub, external: true },
  { label: 'Email', href: `mailto:${PROFILE.email}`, icon: Mail },
  { label: 'Phone', href: PROFILE.phoneHref, icon: Phone }
];

const Navbar = (): JSX.Element => {
  const router = useRouter();
  const isHome = router.pathname === '/';
  const [open, setOpen] = useState(false);
  const { scrolled, hidden, progressRef } = useScrollState();
  const activeSection = useActiveSection(isHome);
  const isActive = (item: (typeof NAV_LINKS)[number]): boolean =>
    item.section
      ? isHome && activeSection === item.section
      : router.pathname === item.href || (item.match || []).includes(router.pathname);
  const isHidden = hidden && !open;

  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on('routeChangeStart', close);
    router.events.on('hashChangeStart', close);
    return () => {
      router.events.off('routeChangeStart', close);
      router.events.off('hashChangeStart', close);
    };
  }, [router.events]);

  // Let sticky elements (e.g. the clients filter bar) follow the header.
  useEffect(() => {
    document.documentElement.classList.toggle('nav-hidden', isHidden);
  }, [isHidden]);

  // Lock page scroll and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return undefined;
    const html = document.documentElement;
    html.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      html.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header
      className={`site-header fixed top-0 inset-x-0 z-40 ${isHidden ? 'is-hidden' : ''} ${
        scrolled || open ? 'nav-glass shadow-2xl' : 'bg-transparent'
      }`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 transition-all duration-300 ${
          scrolled ? 'h-16' : 'h-20'
        }`}>
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <span className="logo-ring">
            <img
              src="/images/logo-light.svg"
              alt=""
              width={40}
              height={40}
              className="w-8 h-8 transition-transform duration-300 group-hover:rotate-12"
            />
          </span>
          <span className="leading-tight">
            <span className="block text-white font-bold text-base">{PROFILE.name}</span>
            <span className="flex items-center gap-1.5 text-violet text-xs tracking-wide">
              <span className="pulse-dot pulse-dot-sm" aria-hidden="true" />
              {PROFILE.title}
            </span>
          </span>
        </Link>

        <ul className="nav-pill hidden lg:flex items-center">
          {NAV_LINKS.filter((item) => item.href !== '/connect').map((item) => {
            const active = isActive(item);
            const currentType = item.section ? 'location' : 'page';
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? currentType : undefined}
                  className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                    active ? 'text-pink is-active' : 'text-white hover:text-pink'
                  }`}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-violet hover:text-pink transition-colors">
            <Download size={15} aria-hidden="true" />
            Resume
          </a>
          <Link
            href="/connect"
            aria-current={router.pathname === '/connect' ? 'page' : undefined}
            className="nav-cta">
            Let&apos;s talk
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          className="menu-btn lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}>
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu lg:hidden ${open ? 'is-open' : ''}`}
        hidden={!open}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col min-h-full">
          <ul className="space-y-1">
            {NAV_LINKS.map((item, i) => (
              <li key={item.href} style={{ animationDelay: `${60 + i * 40}ms` }}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item) ? 'page' : undefined}
                  className={`flex items-baseline gap-4 py-3 text-2xl font-bold border-b border-violet/10 ${
                    isActive(item) ? 'text-pink' : 'text-white'
                  }`}>
                  <span className="text-xs font-semibold text-violet tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/connect" onClick={() => setOpen(false)} className="nav-cta nav-cta-lg">
              Let&apos;s talk
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-violet/40 text-white font-medium">
              <Download size={16} aria-hidden="true" />
              Resume
            </a>
          </div>
          <div className="mt-auto pt-8">
            <p className="text-sm text-violet break-all">{PROFILE.email}</p>
            <ul className="mt-4 flex gap-3">
              {SOCIAL.map(({ label, href, icon: SIcon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="social-btn"
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    <SIcon size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
    </header>
  );
};

export default Navbar;
