/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      colors: {
        dark: {
          100: '#1A1A1A',
          200: '#2A2A2A',
          300: '#3A3A3A',
          400: '#4A4A4A',
          500: '#5A5A5A',
        }
      }
    },
  },
  plugins: [],
} 