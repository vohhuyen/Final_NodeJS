/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
  ],
  theme: {
    extend: {
        colors: {
            sky: {
                '500': '#your-sky-500-color-code',
            },
        },
    },
},
variants: {},
plugins: [],
}
