/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          yellow: '#FF9900',
          darkblue: '#131921',
          lightblue: '#232F3E',
          gray: '#EAEDED',
          accent: '#146EB4',
        },
      },
    },
  },
  plugins: [],
}