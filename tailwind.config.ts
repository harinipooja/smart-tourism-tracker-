import type { Config } from 'tailwindcss';

/**
 * Colour palette inspired by nature, travel and adventure:
 *  - brand  : deep forest / emerald greens
 *  - lagoon : tropical teal-blue (beaches & water)
 *  - sunset : warm amber/orange (adventure, sunsets)
 *  - sand   : warm neutral backdrops
 */
const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#edfcf4',
          100: '#d3f8e3',
          200: '#aaefcb',
          300: '#72e0ad',
          400: '#3ac98b',
          500: '#16ae72',
          600: '#0a8c5c',
          700: '#09704b',
          800: '#0a593e',
          900: '#094934',
          950: '#03291d',
        },
        lagoon: {
          50: '#eefaff',
          100: '#d8f2ff',
          200: '#b9e9ff',
          300: '#89dcff',
          400: '#52c5ff',
          500: '#29a6f7',
          600: '#1487ec',
          700: '#116ed8',
          800: '#1559af',
          900: '#174c8a',
          950: '#122f54',
        },
        sunset: {
          50: '#fff9ed',
          100: '#fff1d4',
          200: '#ffdfa8',
          300: '#ffc771',
          400: '#ffa338',
          500: '#fd8612',
          600: '#ee6908',
          700: '#c54f09',
          800: '#9c3e10',
          900: '#7e3510',
          950: '#441906',
        },
        sand: {
          50: '#fbf9f6',
          100: '#f4efe8',
          200: '#e8ded1',
          300: '#d8c6b1',
          400: '#c3a88b',
          500: '#b18f6d',
          600: '#a37c5c',
          700: '#88654c',
          800: '#705343',
          900: '#5c4538',
          950: '#31231d',
        },
        ink: '#08201a',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(6, 46, 34, 0.25)',
        card: '0 18px 40px -20px rgba(6, 46, 34, 0.35)',
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 20px 45px -20px rgba(22,174,114,0.55)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #0a593e 0%, #0a8c5c 45%, #29a6f7 100%)',
        'sunset-gradient': 'linear-gradient(120deg, #fd8612 0%, #ee6908 50%, #c54f09 100%)',
        'hero-mesh':
          'radial-gradient(1200px 600px at 10% 0%, rgba(41,166,247,0.35), transparent 60%), radial-gradient(900px 500px at 90% 10%, rgba(22,174,114,0.45), transparent 55%), radial-gradient(700px 500px at 50% 100%, rgba(253,134,18,0.25), transparent 60%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        float: 'float 5s ease-in-out infinite',
        shimmer: 'shimmer 1.6s infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
