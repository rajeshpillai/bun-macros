export default {
  content: ["./src/**/*.{ts, tsx}", "./docs-html/*.html"],
  theme: {
    extend: {}
  },
  plugins: [require("@tailwindcss/typography")],
};
