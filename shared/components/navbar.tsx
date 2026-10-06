import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X } from 'react-feather';
import { NAV_LINKS, PROFILE, RESUME_PATH } from '@utils/data';

function useScrollState(): { scrolled: boolean; progressRef: React.RefObject<HTMLDivElement> } {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const { scrollY } = window;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 40);
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

  return { scrolled, progressRef };
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

const Navbar = (): JSX.Element => {
  const router = useRouter();
  const isHome = router.pathname === '/';
  const [open, setOpen] = useState(false);
  const { scrolled, progressRef } = useScrollState();
  const activeSection = useActiveSection(isHome);
  const isActive = (item: (typeof NAV_LINKS)[number]): boolean =>
    item.section
      ? isHome && activeSection === item.section
      : router.pathname === item.href || (item.match || []).includes(router.pathname);

  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on('routeChangeStart', close);
    router.events.on('hashChangeStart', close);
    return () => {
      router.events.off('routeChangeStart', close);
      router.events.off('hashChangeStart', close);
    };
  }, [router.events]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled || open ? 'nav-glass shadow-2xl' : 'bg-transparent'
      }`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-16' : 'h-20'
        }`}>
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/images/logo-light.svg"
            alt=""
            width={40}
            height={40}
            className="w-9 h-9 transition-transform duration-300 group-hover:rotate-12"
          />
          <span className="leading-tight">
            <span className="block text-white font-bold text-base">{PROFILE.name}</span>
            <span className="block text-violet text-xs tracking-wide">{PROFILE.title}</span>
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((item) => {
            const active = isActive(item);
            const currentType = item.section ? 'location' : 'page';
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? currentType : undefined}
                  className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                    active ? 'text-pink is-active' : 'text-white hover:text-violet'
                  }`}>
                  {item.title}
                </Link>
              </li>
            );
          })}
          <li className="ml-3">
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-4 py-2 rounded-md border-2 border-pink text-pink text-sm font-medium hover:bg-pink hover:text-blue transition-colors">
              Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="lg:hidden text-white p-2 -mr-2"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}>
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`lg:hidden ${open ? 'block' : 'hidden'} border-t border-violet/20`}>
        <ul className="max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-1">
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item) ? 'page' : undefined}
                className={`block py-3 text-lg font-medium border-b border-violet/10 ${
                  isActive(item) ? 'text-pink' : 'text-white'
                }`}>
                {item.title}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-5 py-3 rounded-md bg-pink text-blue font-medium">
              Download Resume
            </a>
          </li>
        </ul>
      </div>

      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
    </header>
  );
};

export default Navbar;
