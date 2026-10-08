// rgb() colour backed by a "r, g, b" CSS variable, with Tailwind opacity support.
const themeVar = (name) => ({ opacityVariable, opacityValue }) => {
  if (opacityValue !== undefined) return `rgba(var(${name}), ${opacityValue})`;
  if (opacityVariable !== undefined) return `rgba(var(${name}), var(${opacityVariable}, 1))`;
  return `rgb(var(${name}))`;
};

module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{js,ts,jsx,tsx}',
    './shared/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // handled by [data-theme] CSS variables
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', 'Poppins', 'system-ui', 'sans-serif']
      },
      // Theme colours come from CSS variables in styles/global.css (light and dark).
      // Token names are kept from the original palette:
      // blue = text on accent, navy = alt section, white = headings, violet = body, pink = accent.
      colors: {
        blue: '#FFFFFF',
        navy: themeVar('--c-surface-2'),
        surface: themeVar('--c-surface'),
        pink: '#1A73E8',
        violet: themeVar('--c-body'),
        white: themeVar('--c-heading')
      },
      animation: {
        spin: 'spin 14s linear infinite',
        translateright: 'translateright 1.5s ease-in-out infinite'
      },
      boxShadow: {
        'light-xl': '0 15px 30px -15px rgba(26, 115, 232, 0.45)',
        'violet-5xl': '0px 6px 40px -8px rgba(15,23,42,0.12)'
      },
      keyframes: {
        translateright: {
          '0%,100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(12px)' }
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
