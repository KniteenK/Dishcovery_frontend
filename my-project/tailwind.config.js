const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|checkbox|slider|ripple|spinner|popover).js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f38105',//orange
        secondary: '#f8a62e', // Yellow
        tertiary: '#ee8a3d', // light orange
      },
    },
  },
  plugins: [nextui()],
};
