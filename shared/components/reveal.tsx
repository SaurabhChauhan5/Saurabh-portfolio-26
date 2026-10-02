/* eslint-disable react/require-default-props */
import { CSSProperties, ElementType, ReactNode, useEffect, useRef, useState } from 'react';

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

// Fires once when the element first scrolls into view.
export function useInView<T extends Element>(
  rootMargin = '0px 0px -10% 0px'
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variant?: 'up' | 'left' | 'right' | 'scale';
  id?: string;
};

// Content is server-rendered and visible without JS; the hidden start state
// only applies once the `js` class is on <html> (see _document).
export function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  variant = 'up',
  id
}: RevealProps): JSX.Element {
  const [ref, inView] = useInView<HTMLElement>();
  const style: CSSProperties = delay ? { transitionDelay: `${delay}ms` } : undefined;
  return (
    <Tag
      ref={ref}
      id={id}
      style={style}
      className={`reveal reveal-${variant} ${inView ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  );
}

type CountUpProps = {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

// Renders the final value on the server (crawlers and no-JS users see the real
// number), then counts up from zero the first time it scrolls into view.
export function CountUp({
  end,
  suffix = '',
  duration = 1600,
  className = ''
}: CountUpProps): JSX.Element {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(end);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!prefersReducedMotion()) {
      setValue(0);
      setArmed(true);
    }
  }, []);

  useEffect(() => {
    if (!armed || !inView) return undefined;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * end));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [armed, inView, end, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}
