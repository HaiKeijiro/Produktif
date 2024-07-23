/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: {
          main: "#BABA66",
          success: "#3AB975",
          warning: "#F6A007",
          failed: "#EF3B2F",
          info: "#5A40B6",
        },
        neutral: {
          light: "#F3F3F3",
          black: "#1D1D29"
        },
        kanban: {
          mainBg: "#0D1117",
          columnBg: "#161C22",
        },
      },
    },
  },
  plugins: [],
};
