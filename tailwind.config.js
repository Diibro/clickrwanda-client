/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit-200': 'repeat(auto-fit, minmax(200px, 1fr))',
        'auto-fill-200': 'repeat(auto-fill, minmax(200px, 1fr))',
        'auto-fit-250': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fill-250': 'repeat(auto-fill, minmax(250px, 1fr))',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        main: {
          "blue-700": "#12394f",
          "blue-600": "#0091E2",
          "blue-500": "#00A3FF",
          "gold-600-50":"#e5921d50",
          "gold-600":"#925602",
          "gold-500":"#E5931D",
          "gold-100": "#FFF6E8",
          "red-500" : "#FA3C53",
          "green-600":"#28C238",
          "purple-600": "#4515ad"
        }
      }
    }
  },
  plugins: [
  ],
}

