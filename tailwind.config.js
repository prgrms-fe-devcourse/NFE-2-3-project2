/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      default: {
        white: "#FFFFFF",
        black: "#000000",
      },
      colors: {
        primary: "#FCC404",
        secondary: "#FBEFBF",
        highlight: "#F38304",
        "red-accent": "#FF2929",
        gray: {
          22: "#222222",
          c8: "#C8C8C8",
          ee: "#EEEEEE",
          "6c": "#6C6C6C",
          54: "#545454",
        },
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
