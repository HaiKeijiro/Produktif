/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FAFAF9",
        },
        background: {
          light: "#F3F4F6",
        },
        button: {
          light: "#1E3A8A"
        },
        text: {
          light: "#374151",
          dark: "#F3F4F6"
        }
      },
    },
  },
  plugins: [],
};
