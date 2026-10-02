/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';

type Props = { words: string[]; interval?: number; className?: string };

// Cycles through words with a slide-up swap (like the hero on aaadigital.com.au).
// The first word is server-rendered; screen readers get the full list once.
export default function RotatingWord({ words, interval = 2400, className = '' }: Props): JSX.Element {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || words.length < 2) {
      return undefined;
    }
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <>
      <span className="sr-only">{words.join(', ')}</span>
      <span className={`rotator ${className}`} aria-hidden="true">
        {words.map((w, i) => {
          const prev = (index - 1 + words.length) % words.length;
          const state = i === index ? 'is-in' : i === prev ? 'is-out' : '';
          return (
            <span key={i} className={`rotator-word ${state}`}>
              {w}
            </span>
          );
        })}
      </span>
    </>
  );
}
