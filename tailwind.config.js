/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      'sans': ['Roboto']
    },
    extend: {
      colors: {
        eavid: {
          100: '#C4E1D8',
          200: '#89C3B1',
          300: '#6CB49E',
          400: '#4EA58A',
          500: '#309676',
          600: '#128662',
        }
      }
    },
  },
  plugins: [],
}

