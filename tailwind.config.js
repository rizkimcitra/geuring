module.exports = {
  mode: "jit",
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        med: "423px",
      },
      fontFamily: {
        poppins: '"Poppins", sans-serif',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
