module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: { oswald: ['"Oswald"'] },
    extend: {},
  },
  variants: {
    extend: {
      padding: ["hover", "group-hover"],
      scale: ["group-hover"],
      transform: ["group-hover"],
      brightness: ["hover"],
    },
  },
  plugins: [],
};
