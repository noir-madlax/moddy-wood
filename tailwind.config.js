/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F4A261',
        background: '#FDF8F4',
        tarot: {
          bg: '#2B2B44',
          card: '#1E1E2F',
        },
      },
    },
  },
  plugins: [],
} 