/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Satoshi', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
