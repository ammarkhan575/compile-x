/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        panel: `rgba(51, 51, 51, 1 )`,
        panelbody: `rgba(38, 38, 38, 1)`
      }
    }
  },
  plugins: []
};
