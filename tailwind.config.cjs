/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        'ace-violet': '#7c3aed',
        'ace-cyan': '#06b6d4',
      },
    },
  },
  plugins: [],
}
