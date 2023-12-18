/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        customBgColor: '#F5ECDF',
        'D3CABD': '#D3CABD',
      },
      fontFamily: {
        Allura: ["Allura", "cursive"],
        Playfair: ['Playfair Display', "serif"],
       },
    },
  },
  plugins: [],
}
