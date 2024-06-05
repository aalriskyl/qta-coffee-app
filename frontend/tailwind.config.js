/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure to include all relevant file extensions
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          100: '#f7e8d6',
          200: '#e8c3a0',
          300: '#d9a27a',
          400: '#c88050',
          500: '#b56526',
          600: '#9c561f',
          700: '#814619',
          800: '#663612',
          900: '#4d280c',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
