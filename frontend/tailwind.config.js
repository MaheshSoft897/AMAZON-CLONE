/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'amazon-orange': '#FF9900',
        'amazon-dark': '#131921',
        'amazon-light': '#232F3E',
      },
    },
  },
  plugins: [],
}

