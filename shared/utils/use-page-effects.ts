import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Site-wide effects, each driven by a single listener:
//  - Lenis smooth scrolling (with header-aware in-page anchors)
//  - .spotlight cards get a soft glow that follows the pointer (desktop only)
//  - [data-parallax="0.15"] decorative elements drift slightly as you scroll
const HEADER_OFFSET = 84;

export default function usePageEffects(): void {
  const router = useRouter();

  // Smooth, eased scrolling (Lenis), as on aaadigital.com.au. Skipped for
  // reduced-motion users; every scroll-driven effect keeps working either way
  // because Lenis still moves the real window scroll position.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let lenis: { raf: (t: number) => void; scrollTo: (t: unknown, o?: unknown) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cancelled = false;

    const onClick = (ev: MouseEvent) => {
      if (!lenis || ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey) return;
      const a = (ev.target as Element)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!a || a.classList.contains('skip-link')) return;
      const url = new URL(a.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash || url.hash === '#') return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      ev.preventDefault();
      lenis.scrollTo(el, { offset: -HEADER_OFFSET });
      window.history.replaceState(null, '', url.hash);
    };

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        syncTouch: false,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t))
      });
      document.documentElement.classList.add('lenis');
      const raf = (t: number) => {
        lenis?.raf(t);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });
    document.addEventListener('click', onClick, true);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      document.removeEventListener('click', onClick, true);
      lenis?.destroy();
      document.documentElement.classList.remove('lenis');
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element)?.closest?.('.spotlight') as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    if (!items.length) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      items.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.1');
        const r = el.parentElement?.getBoundingClientRect();
        if (!r || r.bottom < -200 || r.top > vh + 200) return;
        const offset = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [router.asPath]);
}
