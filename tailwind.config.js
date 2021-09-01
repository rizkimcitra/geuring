module.exports = {
  mode: "jit",
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: '"Poppins", sans-serif',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
