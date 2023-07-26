/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      'sans': ['Roboto']
    },
    extend: {
      boxShadow: {
        'custom-sm': "-3px 3px 0px 0px rgba(0,0,0,1)",
        'custom-md': "-6px 6px 0px 0px rgba(0,0,0,1)",
        'custom-lg': "-9px 9px 0px 0px rgba(0,0,0,1)",
        'customHover-sm': "-8px 8px 0px 0px rgba(0,0,0,1)",
        'customHover-md': "-11px 11px 0px 0px rgba(0,0,0,1)",
        'customHover-lg': "-14px 14px 0px 0px rgba(0,0,0,1)",
      },
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

