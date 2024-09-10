/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        imsLightPurple: '#B990E9',
        imsPurple: '#7D2CE0',
        imsDarkPurple: '#4A02A3',
      },
    },
  },
  plugins: [],
}
