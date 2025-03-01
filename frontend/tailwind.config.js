/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          primary: '#4B0082',
          dark: '#2D004D',
        },
        purple: {
          button: '#6A0DAD',
          hover: '#8A2BE2',
          border: '#D8BFD8',
        },
        background: {
          card: '#F8F4FF',
          page: '#FFFFFF',
        },
        text: {
          dark: '#333333',
          light: '#FFFFFF',
        },
        accent: {
          gold: '#FFD700',
        },
      },
    },
  },
  plugins: [
    daisyui,
  ],
}