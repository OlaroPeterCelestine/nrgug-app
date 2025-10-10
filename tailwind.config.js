/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'scroll-horizontal': 'scroll-horizontal 30s linear infinite',
        'auto-run': 'autoRun 20s linear infinite',
        'reverse-play': 'reversePlay 20s linear infinite',
      },
      keyframes: {
        'scroll-horizontal': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'autoRun': {
          'from': { left: '100%' },
          'to': { left: 'calc(var(--width) * -1)' },
        },
        'reversePlay': {
          'from': { left: 'calc(var(--width) * -1)' },
          'to': { left: '100%' },
        },
      },
    },
  },
  plugins: [],
};
