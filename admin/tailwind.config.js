/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Amana-Janaza : Noir & Or
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E2C97E",
          dark: "#A07830",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          light: "#2D2D2D",
          lighter: "#3D3D3D",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        arabic: ["Amiri", "serif"],
      },
    },
  },
  plugins: [],
};
