const defaultTheme = require("tailwindcss/defaultTheme");
const filteredFonts = defaultTheme.fontFamily.sans.filter(
  font => font !== '"Apple Color Emoji"'
);

module.exports = {
  plugins: [require("@tailwindcss/custom-forms")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...filteredFonts]
      },
      colors: {
        "polar-night": {
          darkest: "#2E3440",
          darker: "#3B4252",
          dark: "#434C5E",
          light: "#4C566A"
        },
        "snow-storm": {
          light: "#D8DEE9",
          lighter: "#E5E9F0",
          lightest: "#ECEFF4"
        },
        frost: {
          green: "#8FBCBB",
          blueish: "#88C0D0",
          blue: "#81A1C1",
          bluer: "#5E81AC"
        },
        aurora: {
          red: "#BF616A",
          orange: "#D08770",
          yellow: "#EBCB8B",
          green: "#A3BE8C",
          purple: "#B48EAD"
        }
      },
      screens: {
        dm: { raw: "(prefers-color-scheme: dark)" }
      }
    }
  }
};
