/* eslint-disable react/no-array-index-key */
import { useEffect, useRef } from 'react';

type Props = {
  // Words wrapped in *asterisks* are highlighted in pink when lit.
  text: string;
  className?: string;
};

// A statement whose words light up one by one as it travels up the viewport
// (the "scroll-lit statement" from aaadigital.com.au). The full sentence is
// real text in the HTML, so it is readable without JS and by crawlers.
export default function ScrollLit({ text, className = '' }: Props): JSX.Element {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const spans = Array.from(el.querySelectorAll<HTMLElement>('.lit-word'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      spans.forEach((s) => s.classList.add('is-lit'));
      return undefined;
    }
    el.classList.add('is-armed');
    let last = -1;
    let frame = 0;
    const paint = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.4;
      const p = Math.min(Math.max((start - r.top) / (r.height + (start - end)), 0), 1);
      const lit = Math.round(p * spans.length);
      if (lit === last) return;
      spans.forEach((s, i) => s.classList.toggle('is-lit', i < lit));
      last = lit;
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
    <p ref={ref} className={`scroll-lit ${className}`}>
      {words.map((word, i) => {
        const accent = word.startsWith('*');
        const clean = word.replace(/\*/g, '');
        return (
          <span key={i} className={`lit-word ${accent ? 'lit-accent' : ''}`}>
            {clean}{' '}
          </span>
        );
      })}
    </p>
  );
}
