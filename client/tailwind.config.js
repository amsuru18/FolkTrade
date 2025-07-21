module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light mode
        white: "#ffffff",
        smokewhite: "#f5f6fa",
        blue: {
          DEFAULT: "#2563eb",
          light: "#60a5fa",
          dark: "#1e40af",
        },
        // Dark mode
        black: "#18181b",
        gray: {
          DEFAULT: "#27272a",
          light: "#52525b",
          dark: "#18181b",
        },
        purple: {
          DEFAULT: "#a78bfa",
          dark: "#7c3aed",
        },
      },
      backgroundImage: {
        "gradient-light": "linear-gradient(135deg, #f5f6fa 0%, #e0e7ff 100%)",
        "gradient-dark": "linear-gradient(135deg, #18181b 0%, #7c3aed 100%)",
      },
    },
  },
  plugins: [],
};
