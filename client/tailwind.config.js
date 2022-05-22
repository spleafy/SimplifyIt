const colors = require("tailwindcss/colors");

const withOpacityValue = (variable) => {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
};

module.exports = {
  // prefix: "cb-",
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/*.{html}"],
  theme: {
    extend: {
      keyframes: {
        scale: {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "80%": { transform: "scale(1.1)", opacity: "1" },
          "100%": { transform: "scale(1)" },
        },
        slideTop: {
          "0%": { transform: "translateY(10%)" },
          "80%": { transform: "translateY(-2%)" },
          "100%": { transform: "translateY(0%)" },
        },
        slideInOut: {
          "0%": { transform: "translateX(120%)" },
          "10%": { transform: "translateX(0%)" },
          "90%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(120%)" },
        },
      },
      animation: {
        scale: "scale 0.5s ease-in-out forwards",
        slideTop: "slideTop 0.3s ease-in-out forwards",
        slideInOut: "slideInOut 3s ease-in-out forwards",
      },
      colors: {
        primary: colors.blue,
        theme: {
          50: withOpacityValue("--theme-color-50"),
          100: withOpacityValue("--theme-color-100"),
          200: withOpacityValue("--theme-color-200"),
          300: withOpacityValue("--theme-color-300"),
          400: withOpacityValue("--theme-color-400"),
          500: withOpacityValue("--theme-color-500"),
          600: withOpacityValue("--theme-color-600"),
          700: withOpacityValue("--theme-color-700"),
          800: withOpacityValue("--theme-color-800"),
          900: withOpacityValue("--theme-color-900"),
        },
      },
    },
  },
  plugins: [],
};
