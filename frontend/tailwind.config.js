module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  daisyui: {},
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
