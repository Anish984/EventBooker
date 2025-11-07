import { defineConfig } from "tailwindcss";

export default defineConfig({
  darkMode: "class", // enable 'dark' class strategy
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        subtleText: "rgb(var(--subtleText) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          hover: "rgb(var(--accent-hover) / <alpha-value>)",
        },
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
      },
    },
  },
});
