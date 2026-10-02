/* eslint-disable react/require-default-props */
import { ReactNode, useEffect, useRef } from 'react';

type Props = { children: ReactNode; className?: string };

// Cards (.stack-card) are position:sticky with staggered tops, so they pile up
// as you scroll; covered cards shrink and dim behind the newcomer.
export default function StickyStack({ children, className = '' }: Props): JSX.Element {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const cards = Array.from(list.querySelectorAll<HTMLElement>('.stack-card'));
    let frame = 0;
    const paint = () => {
      frame = 0;
      const rects = cards.map((c) => c.getBoundingClientRect());
      cards.forEach((card, i) => {
        let depth = 0;
        for (let j = i + 1; j < cards.length; j += 1) {
          if (rects[j].top <= rects[i].top + 48 + (j - i) * 24) depth += 1;
        }
        card.style.setProperty('--depth', String(depth));
        card.classList.toggle('is-under', depth > 0);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ul ref={ref} className={`sticky-stack ${className}`}>
      {children}
    </ul>
  );
}
