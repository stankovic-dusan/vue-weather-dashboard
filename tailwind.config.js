/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "main-bg": "var(--color-main-background)",
        "header-bg": "var( --color-header-background)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        light: "var(--color-light)",
        dark: "var(--color-dark)",
        grey: "var(--color-grey)",
        custom: "var(--color-custom)",
        icon: "var(--color-icons)",
        active: "var(--color-active)",
      },
    },
    screens: {
      sm: { max: "800px" },
    },
  },
  plugins: [],
};
