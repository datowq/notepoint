/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fern': {
          '50': '#f0f9f2',
          '100': '#daf1dd',
          '200': '#b8e2c1',
          '300': '#8acb9b',
          '400': '#5db176',
          '500': '#379255',
          '600': '#267541',
          '700': '#1e5e36',
          '800': '#1a4b2c',
          '900': '#163e25'
        },
        'peach': {
          '100': '#f6aca2',
          '200': '#f49b90',
          '300': '#f28b7d',
          '400': '#f07a6a',
          '500': '#ee6352'
        },
        'backgroundc': {
          '100': '#E0EFDA',
          '200': '#1B998B',
          '300': '#2E294E'
        }
      },
      fontFamily: {
        canadadry: ["canada-type-gibson", "sans-serif"],
        bungee: ["bungee", "sans-serif"],
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        cabin: ["Cabin Condensed", "sans-serif"]
      }
    },
  },
  plugins: [],
}