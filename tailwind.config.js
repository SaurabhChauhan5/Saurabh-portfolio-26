module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{js,ts,jsx,tsx}',
    './shared/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', 'Poppins', 'system-ui', 'sans-serif']
      },
      // Analytics dashboard light theme. Token names kept from the old palette:
      // blue = text on accent, navy = alt section, white = headings, violet = body, pink = accent.
      colors: {
        blue: '#FFFFFF',
        navy: '#FFFFFF',
        surface: '#FFFFFF',
        pink: '#1A73E8',
        violet: '#64748B',
        white: '#1E293B'
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
