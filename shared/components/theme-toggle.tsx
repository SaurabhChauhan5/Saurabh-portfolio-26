/* eslint-disable react/require-default-props */
import { useEffect, useRef, useState } from 'react';
import { Check, Moon, Sun, Sunset } from 'react-feather';

export type Theme = 'light' | 'dark' | 'dusk';

const THEMES: {
  id: Theme;
  label: string;
  note: string;
  icon: typeof Sun;
  color: string;
  ink: string;
}[] = [
  {
    id: 'light',
    label: 'Light',
    note: 'Clean analytics',
    icon: Sun,
    color: '#f8fafc',
    ink: '#1a73e8'
  },
  { id: 'dark', label: 'Dark', note: 'Navy + blue', icon: Moon, color: '#121833', ink: '#8ab4f8' },
  { id: 'dusk', label: 'Dusk', note: 'Navy + rose', icon: Sunset, color: '#232946', ink: '#eebbc3' }
];

const isTheme = (t: unknown): t is Theme => t === 'light' || t === 'dark' || t === 'dusk';

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.add('theme-anim');
  root.dataset.theme = theme;
  const color = THEMES.find((t) => t.id === theme)?.color || '#f8fafc';
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((m) => m.setAttribute('content', color));
  window.setTimeout(() => root.classList.remove('theme-anim'), 400);
}

// Theme picker (Light / Dark / Dusk). The initial theme is set before paint by the
// script in _document: the saved choice, otherwise the device's light/dark setting.
export default function ThemeToggle({ className = '' }: { className?: string }): JSX.Element {
  const [theme, setTheme] = useState<Theme>('light');
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(isTheme(current) ? current : 'light');
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

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const choose = (next: Theme) => {
    apply(next);
    setTheme(next);
    setOpen(false);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Private mode or blocked storage: the choice still applies for this visit.
    }
  };

  const Current = THEMES.find((t) => t.id === theme)?.icon || Sun;
  return (
    <div ref={wrap} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="theme-toggle"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Theme: ${THEMES.find((t) => t.id === theme)?.label}. Change theme`}
        title="Change theme">
        <Current size={17} aria-hidden="true" />
      </button>
      {open && (
        <ul role="menu" aria-label="Choose a theme" className="theme-menu">
          {THEMES.map(({ id, label, note, icon: ThemeIcon, color, ink }) => (
            <li key={id} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={theme === id}
                onClick={() => choose(id)}
                className={`theme-option ${theme === id ? 'is-active' : ''}`}>
                <span
                  className="theme-swatch"
                  style={{ background: color, color: ink }}
                  aria-hidden="true">
                  <ThemeIcon size={14} />
                </span>
                <span className="flex-1 text-left leading-tight">
                  <span className="block font-medium">{label}</span>
                  <span className="block text-xs opacity-80">{note}</span>
                </span>
                {theme === id && <Check size={15} aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
