/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(var(--dark-primary))",
        secondary: "rgba(var(--dark-secondary))",
        tertiary: "rgba(var(--dark-tertiary))",
      },
      backgroundColor: {
        primary: "rgba(var(--dark-primary))",
        secondary: "rgba(var(--dark-secondary))",
        tertiary: "rgba(var(--dark-tertiary))",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
