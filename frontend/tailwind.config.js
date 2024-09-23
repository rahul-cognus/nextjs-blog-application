/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.8rem',
        'sm': '1.5rem',
        'lg': '2rem',
        'xl': '3rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary': '#2163e8',
        'success': '#0cbc87',
        'warning': '#f7c32e',
      },
      fontSize: {
        '10': '10px',
        '15': '15px'
      }
    },
  },
  plugins: [],
};
