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
    keyframes: {
      popp: {
        from: {
          opacity: 0,
          transform: "translateY(3rem)",
        },
        to: {
          opacity: 1,
          transform: "translateY(0)",
        },
      },
      spin: {
        from: {
          transform: "rotate(0deg)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      },
      ripple: {
        from: {
          transform: "scale(0)",
          opacity: 0.3,
        },
        to: {
          transform: "scale(4)",
          opacity: 0,
        },
      },
    },
    animation: {
      "popping-up": "popp 1s ease-out forwards",
      spin: "spin 1s linear infinite",
      ripple: "ripple 2000ms linear",
    },
  },
  plugins: [],
};
