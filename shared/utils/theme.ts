export type Theme = 'light' | 'dark' | 'dusk';
export type ThemePref = Theme | 'auto';

// Auto theme by local time: day = light, late evening = dusk, night = midnight (dark).
// A device set to dark mode never gets the light theme; daytime becomes midnight instead.
export const DUSK_FROM = 18; // 6:00 pm
export const NIGHT_FROM = 22; // 10:00 pm
export const DAY_FROM = 6; // 6:00 am

export function autoTheme(date = new Date(), prefersDark = false): Theme {
  const h = date.getHours();
  if (h >= NIGHT_FROM || h < DAY_FROM) return 'dark';
  if (h >= DUSK_FROM) return 'dusk';
  return prefersDark ? 'dark' : 'light';
}

// Same rules, inlined into _document so the theme is set before the first paint.
export const THEME_BOOT_SCRIPT = `(function(){var p;try{p=localStorage.getItem('theme')}catch(e){}var t=p;if(t!=='light'&&t!=='dark'&&t!=='dusk'){var h=new Date().getHours(),d=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;t=(h>=${NIGHT_FROM}||h<${DAY_FROM})?'dark':h>=${DUSK_FROM}?'dusk':d?'dark':'light'}document.documentElement.dataset.theme=t})()`;
