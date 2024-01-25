/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#060007",
        "dark-licorice": "#0A0004",
        "dark-blue": "#070411",
        "rich-black": "#050F18",
        "smoky-black": "#070600",
        "gold-text ": {
          light: "#f1d6a8bb",
          default: "#f1d6a8bb",
          dark: "#ff16d1",
        },
      },
      backgroundColor: (theme) => ({
        DEFAULT: theme("colors.dark-licorice"),
      }),
      textColor: (theme) => ({
        DEFAULT: theme("colors.gold-text.light"),
      }),
      borderColor: (theme) => ({
        DEFAULT: theme("colors.gold-text.dark"),
      }),
    },
  },
  plugins: [],
};
