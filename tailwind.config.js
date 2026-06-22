/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#f3f3f3',
      cyan: {
        DEFAULT: '#f3f3f3',
        50: '#000000', 100: '#000000', 200: '#000000', 300: '#808080', 400: '#a6a6a6', 500: '#f3f3f3', 600: '#f3f3f3', 700: '#f3f3f3', 800: '#000000', 900: '#000000',
      },
      slate: {
        DEFAULT: '#a6a6a6',
        50: '#000000', 100: '#000000', 200: '#e5e7eb', 300: '#e5e7eb', 400: '#a6a6a6', 500: '#a6a6a6', 600: '#808080', 700: '#808080', 800: '#000000', 900: '#000000', 950: '#000000',
      },
      gray: {
        DEFAULT: '#a6a6a6',
        50: '#000000', 100: '#000000', 200: '#e5e7eb', 300: '#e5e7eb', 400: '#a6a6a6', 500: '#a6a6a6', 600: '#808080', 700: '#808080', 800: '#000000', 900: '#000000', 950: '#000000',
      },
      emerald: {
        DEFAULT: '#f3f3f3',
        50: '#000000', 100: '#000000', 200: '#000000', 300: '#808080', 400: '#a6a6a6', 500: '#f3f3f3', 600: '#f3f3f3', 700: '#f3f3f3', 800: '#000000', 900: '#000000',
      },
      blue: {
        DEFAULT: '#f3f3f3',
        50: '#000000', 100: '#000000', 200: '#000000', 300: '#808080', 400: '#a6a6a6', 500: '#f3f3f3', 600: '#f3f3f3', 700: '#f3f3f3', 800: '#000000', 900: '#000000',
      },
      red: {
        DEFAULT: '#f3f3f3',
        50: '#000000', 100: '#000000', 200: '#000000', 300: '#808080', 400: '#a6a6a6', 500: '#f3f3f3', 600: '#f3f3f3', 700: '#f3f3f3', 800: '#000000', 900: '#000000',
      },
      yellow: {
        DEFAULT: '#f3f3f3',
        50: '#000000', 100: '#000000', 200: '#000000', 300: '#808080', 400: '#a6a6a6', 500: '#f3f3f3', 600: '#f3f3f3', 700: '#f3f3f3', 800: '#000000', 900: '#000000',
      },
      orange: {
        DEFAULT: '#f3f3f3',
        50: '#000000', 100: '#000000', 200: '#000000', 300: '#808080', 400: '#a6a6a6', 500: '#f3f3f3', 600: '#f3f3f3', 700: '#f3f3f3', 800: '#000000', 900: '#000000',
      }
    },
    extend: {
      fontFamily: {
        'moderniz': ['__ppSemiBold_e86be0', '__ppSemiBold_Fallback_e86be0', 'sans-serif'],
        'bauhaus': ['__ppSemiBold_e86be0', '__ppSemiBold_Fallback_e86be0', 'sans-serif'],
        'sans': ['__ppSemiBold_e86be0', '__ppSemiBold_Fallback_e86be0', 'sans-serif'],
      },
      animation: {
        shadowFade: 'shadowFade 5s infinite ease-in-out',
        gradient: 'gradient 8s linear infinite',
      },
      keyframes: {
        shadowFade: {
          '0%, 100%': { filter: 'drop-shadow(-1px 6px 3px rgba(243, 243, 243, 0.5))' },
          '50%': { filter: 'drop-shadow(-1px 6px 3px rgba(243, 243, 243, 0.3))' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}
