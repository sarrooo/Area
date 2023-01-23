/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#A6EAFF',
          100: '#E5F3F7',
          200: '#DEF2F8',
          300: '#D5F0F9',
          400: '#CDEFFA',
          500: '#C5EEFB',
          600: '#BEEDFC',
          700: '#B5ECFD',
          800: '#AEEBFE',
          900: '#A6EAFF',
        },
      },
      fontFamily: {
        poppins: ['Poppins'],
      },
    },
  },
  plugins: [],
}
