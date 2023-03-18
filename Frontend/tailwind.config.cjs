/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["ceraRoundPro", "sans-serif"],
    },
    extend: {
      height: {
        128: "90vh",
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      colors: {
        primary: "#1e293b",
        secondary: "#d4d4d4",
        tertiary: "#bfdbfe",
        primarybg: "#0f172a",
      },
    },
  },
  plugins: [],
};
