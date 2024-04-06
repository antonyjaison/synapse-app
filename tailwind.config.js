/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        fontclr: "#4D4D4D",
        cardbg: "#FFFEFE",
        cardborder: "#E4E5E7"
      }
    },
  },
  plugins: [],
}

