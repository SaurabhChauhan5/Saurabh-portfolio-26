import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Two lightweight, site-wide effects driven by a single listener each:
//  - .spotlight cards get a soft glow that follows the pointer (desktop only)
//  - [data-parallax="0.15"] decorative elements drift slightly as you scroll
export default function usePageEffects(): void {
  const router = useRouter();

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
