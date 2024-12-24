/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        skyDark: "#E8F3FC",
        mainTextDark: "#6FBEFF",
        mainDark: "#81B4DD",
        lightGreyDark: "#E0E0E0",
        greyDark: "#C3C3C3",
        semiDarkGreyDark: "#646464",
        darkGreyDark: "#373737",
        lightBlackDark: "#2C2C2C",
        blackDark: "#252525",
        pinkDark: "#F95896",
        lightPurpleDark: "#E14584",
      },
      boxShadow: {
        "profile-inner": "inset 0px 4px 11px 0px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        pretendard: ["Pretendard"], //기본 폰트
        jalnan: ["yg-jalnan", "sans-serif"], //포인트 폰트
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
