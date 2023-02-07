/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-green": "#86efac",
        "secondary-blue": "#bfdbfe",
        "faded-yellow": "#fdf9d3",
      },
    },
    container: {
      padding: "2rem",
      center: true,
    },
    gridTemplateColumns: {
      fluid: "repeat(auto-fit,minmax(15rem,1fr))",
    },
  },
  plugins: [],
};
