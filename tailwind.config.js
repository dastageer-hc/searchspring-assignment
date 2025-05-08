/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
     screens: {
        xxs: '320px',
      },
      fontFamily: {
        "open-sans": ["Open Sans", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        // Add other fonts
      },
    },
  },
  plugins: [],
};

