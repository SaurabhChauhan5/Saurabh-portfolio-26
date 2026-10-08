/* eslint-disable react/require-default-props */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Clock, Moon, Sun, Sunset } from 'react-feather';
import { autoTheme, Theme, ThemePref } from '../utils/theme';

type Option = {
  id: ThemePref;
  label: string;
  note: string;
  icon: typeof Sun;
  color: string;
  ink: string;
};

// Ordered by time of day: Auto, then day, late evening, night.
const OPTIONS: Option[] = [
  { id: 'auto', label: 'Auto', note: 'By time of day', icon: Clock, color: 'transparent', ink: '' },
  { id: 'light', label: 'Light', note: 'Day', icon: Sun, color: '#f8fafc', ink: '#1a73e8' },
  {
    id: 'dusk',
    label: 'Dusk',
    note: 'Late evening',
    icon: Sunset,
    color: '#232946',
    ink: '#eebbc3'
  },
  { id: 'dark', label: 'Midnight', note: 'Night', icon: Moon, color: '#121833', ink: '#8ab4f8' }
];

const BAR_COLOR: Record<Theme, string> = { light: '#f8fafc', dusk: '#232946', dark: '#121833' };
const isTheme = (t: unknown): t is Theme => t === 'light' || t === 'dark' || t === 'dusk';

function apply(theme: Theme, animate = true) {
  const root = document.documentElement;
  if (root.dataset.theme === theme) return;
  if (animate) root.classList.add('theme-anim');
  root.dataset.theme = theme;
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((m) => m.setAttribute('content', BAR_COLOR[theme]));
  window.setTimeout(() => root.classList.remove('theme-anim'), 400);
}

const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

function readPref(): ThemePref {
  try {
    const saved = localStorage.getItem('theme');
    if (isTheme(saved)) return saved;
  } catch {
    // Storage blocked: fall back to Auto.
  }
  return 'auto';
}

// Theme picker. "Auto" follows the local time (light by day, dusk in the late
// evening, midnight at night) and the device's dark-mode setting.
export default function ThemeToggle({ className = '' }: { className?: string }): JSX.Element {
  const [pref, setPref] = useState<ThemePref>('auto');
  const [theme, setTheme] = useState<Theme>('light');
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  const resolve = useCallback((p: ThemePref, animate = true) => {
    const next = p === 'auto' ? autoTheme(new Date(), prefersDark()) : p;
    apply(next, animate);
    setTheme(next);
  }, []);

  useEffect(() => {
    const p = readPref();
    setPref(p);
    const current = document.documentElement.dataset.theme;
    setTheme(isTheme(current) ? current : 'light');
  }, []);

  // In Auto, re-check every minute and when the device setting changes.
  useEffect(() => {
    if (pref !== 'auto') return undefined;
    const tick = () => resolve('auto');
    const id = window.setInterval(tick, 60000);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', tick);
    document.addEventListener('visibilitychange', tick);
    return () => {
      window.clearInterval(id);
      mq.removeEventListener?.('change', tick);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [pref, resolve]);

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

  const choose = (next: ThemePref) => {
    setPref(next);
    resolve(next);
    setOpen(false);
    try {
      if (next === 'auto') localStorage.removeItem('theme');
      else localStorage.setItem('theme', next);
    } catch {
      // Storage blocked: the choice still applies for this visit.
    }
  };

  const active = OPTIONS.find((o) => o.id === theme);
  const ButtonIcon = active?.icon || Sun;
  const autoNote = `Now: ${active?.label}`;
  return (
    <div ref={wrap} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="theme-toggle"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Theme: ${
          pref === 'auto' ? `Auto (${active?.label})` : active?.label
        }. Change theme`}
        title="Change theme">
        <ButtonIcon size={17} aria-hidden="true" />
        {pref === 'auto' && <span className="theme-auto-dot" aria-hidden="true" />}
      </button>
      {open && (
        <ul role="menu" aria-label="Choose a theme" className="theme-menu">
          {OPTIONS.map(({ id, label, note, icon: OptIcon, color, ink }) => (
            <li key={id} role="none" className={id === 'auto' ? 'theme-auto-row' : ''}>
              <button
                type="button"
                role="menuitemradio"
                aria-checked={pref === id}
                onClick={() => choose(id)}
                className={`theme-option ${pref === id ? 'is-active' : ''}`}>
                <span
                  className="theme-swatch"
                  style={id === 'auto' ? undefined : { background: color, color: ink }}
                  aria-hidden="true">
                  <OptIcon size={14} />
                </span>
                <span className="flex-1 text-left leading-tight">
                  <span className="block font-medium">{label}</span>
                  <span className="block text-xs opacity-80">
                    {id === 'auto' ? autoNote : note}
                  </span>
                </span>
                {pref === id && <Check size={15} aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
