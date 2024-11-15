const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|checkbox|slider|ripple|spinner|popover).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
};
