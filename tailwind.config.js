/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lusion-black': '#0a0a0a',
        'lusion-purple': '#c20023', // Mapped to Red
        'brand-dark': '#331019',
        'brand-red': '#c20023',
        'brand-orange': '#ff6600',
        'brand-yellow': '#fffb00',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right top, #000000, #331019, #620f24, #920728, #c20023, #d82d1e, #ed4b15, #ff6600, #ff8d00, #ffb300, #ffd700, #fffb00)',
        'text-safe-gradient': 'linear-gradient(to right, #c20023, #ff6600, #fffb00)',
      },
      fontFamily: {
        sans: ['Kode Mono', 'monospace'],
        heading: ['Anta', 'sans-serif'],
        mono: ['Kode Mono', 'monospace'],
        tech: ['Unica One', 'sans-serif'],
        pixel: ['Pixelify Sans', 'cursive'],
      }
    },
  },
  plugins: [],
}
