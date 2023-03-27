/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./**/*.html"
  ],
  theme: {
    screens: {
      'xs': '0px',
      'sm': '480px',
      'md': '640px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {},
  },
  plugins: [],
}
