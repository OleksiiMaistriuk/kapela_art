/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#000000;",
        "dark-licorice": "#000000;",
        "dark-blue": "#000000;",
        "rich-black": "#000000;",
        "smoky-black": "#000000;",
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
