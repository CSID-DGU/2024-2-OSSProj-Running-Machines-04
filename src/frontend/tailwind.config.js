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
        signatureGradient: 'linear-gradient(90deg, #9993E5 0%, #B1FF8C 100%)',
        courseGradient: 'linear-gradient(0deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.40) 100%), linear-gradient(90deg, #9993E5 0%, #B1FF8C 100%)'
      },
      boxShadow:{
        navbarShadow: '0px -2px 2px 0px rgba(83, 83, 83, 0.25)',
        searchbarShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}