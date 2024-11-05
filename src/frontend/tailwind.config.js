/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        navbarGradient: "linear-gradient(180deg, #000 0%, #242142 100%)",
      },
      boxShadow:{
        navbarShadow: '0px -2px 2px 0px rgba(83, 83, 83, 0.25)',
        searchbarShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [],
}