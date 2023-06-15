/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        oil: {
          primary: '#191919', // Màu chính
          secondary: '#8B8B8B', // Màu phụ
        },
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}