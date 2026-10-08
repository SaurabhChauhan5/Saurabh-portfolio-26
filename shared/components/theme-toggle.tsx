/* eslint-disable react/require-default-props */
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'react-feather';

type Theme = 'light' | 'dark';

const THEME_COLOR: Record<Theme, string> = { light: '#f8fafc', dark: '#121833' };

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.add('theme-anim');
  root.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
  window.setTimeout(() => root.classList.remove('theme-anim'), 400);
}

// Light/dark switch. The initial theme is set before paint by the script in _document
// (saved choice, otherwise the device setting); this button only flips and saves it.
export default function ThemeToggle({ className = '' }: { className?: string }): JSX.Element {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    // Follow the device setting until the visitor picks a theme themselves.
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem('theme');
      } catch {
        saved = null;
      }
      if (saved) return;
      const next: Theme = e.matches ? 'dark' : 'light';
      apply(next);
      setTheme(next);
    };
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    apply(next);
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Private mode or blocked storage: the switch still works for this visit.
    }
    window.dispatchEvent(new Event('themechange'));
  };

  const dark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      className={`theme-toggle ${className}`}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Light theme' : 'Dark theme'}>
      {dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  );
}
