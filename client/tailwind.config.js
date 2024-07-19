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
          light: "#1E3A8A",
          success: "#10B981",
          cancel: "#EF4444",
        },
        text: {
          light: "#374151",
          dark: "#F3F4F6",
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
