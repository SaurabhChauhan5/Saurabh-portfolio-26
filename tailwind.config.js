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
      colors: {
        blue: '#232946',
        navy: '#1b2038',
        surface: '#2a3152',
        pink: '#EEBBC3',
        violet: '#B8C1EC',
        white: '#FFFFFE'
      },
      animation: {
        spin: 'spin 14s linear infinite',
        translateright: 'translateright 1.5s ease-in-out infinite'
      },
      boxShadow: {
        'light-xl': '0 15px 30px -15px rgba(256, 256, 256, 0.3)',
        'violet-5xl': '0px 6px 58px -8px rgba(184,193,236,0.36)'
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
