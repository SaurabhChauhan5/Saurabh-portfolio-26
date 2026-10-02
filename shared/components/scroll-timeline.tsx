/* eslint-disable react/require-default-props */
import { ReactNode, useEffect, useRef } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

// Vertical timeline whose pink line fills as you scroll. A glowing dot rides the
// tip of the line, and each item (.timeline-item) lights up once the dot reaches
// its marker. Progress is written to a CSS variable, so scrolling never re-renders React.
export default function ScrollTimeline({ children, className = '' }: Props): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      // The "reading line" sits a little below the middle of the viewport.
      const anchor = window.innerHeight * 0.55;
      const progress = reduce ? 1 : Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1);
      list.style.setProperty('--progress', progress.toFixed(4));
      list.classList.toggle('is-complete', progress >= 0.999);
      list.classList.toggle('is-started', progress > 0);

      const tip = rect.top + rect.height * progress;
      list.querySelectorAll<HTMLElement>('.timeline-item').forEach((item) => {
        const marker = item.querySelector<HTMLElement>('.timeline-dot');
        if (!marker) return;
        const markerTop = marker.getBoundingClientRect().top + marker.offsetHeight / 2;
        item.classList.toggle('is-active', reduce || tip >= markerTop);
      });
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

  return (
    <div ref={ref} className={`scroll-timeline relative ${className}`}>
      <span className="timeline-track" aria-hidden="true">
        <span className="timeline-fill" />
        <span className="timeline-head" />
      </span>
      <ol>{children}</ol>
    </div>
  );
}
