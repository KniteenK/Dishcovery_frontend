const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|ripple|spinner).js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fc8019', //swiggy orange
        secondary: '#fd9c4b', // lighter orange
        // text: '#333333',
        // background: '#f4f4f4',
      },
    },
  },
  plugins: [nextui()],
};
