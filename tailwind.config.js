/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Add this line
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#110F19',
        lavender: '#C0A0FD',
        pastelPink: '#FFD1DC',
        oceanTeal: '#A0E7E5',
      },
    },
  },
  plugins: [],
}