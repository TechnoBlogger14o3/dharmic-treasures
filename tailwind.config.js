/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FBF6EA',
        saffron: {
          DEFAULT: '#C45C26',
          dark: '#A44A1C',
          light: '#F4E4D4',
        },
        maroon: '#6B2B1F',
        gold: {
          DEFAULT: '#C9A227',
          light: '#E6D59A',
        },
        ink: '#3B2A1A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Tiro Devanagari Hindi', 'Noto Serif Devanagari', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
