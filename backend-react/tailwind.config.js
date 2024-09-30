/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "0.8rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#2163e8",
        success: "#0cbc87",
        warning: "#f7c32e",
      },
      fontSize: {
        10: "10px",
        15: "15px",
      },
    },
  },
  plugins: [],
};
