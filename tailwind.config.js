/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primaryColor: "#0E5EF7", // Blue color or this can be used instead #135bec
        backgroundBase: "#FAFAFA",
        backgroundLight: "#EFF4FF",
        mutedOrange: "#e67e22",
        mutedOrangeLight: "#F9E8D9",
      },
    },
  },
  plugins: [],
};
