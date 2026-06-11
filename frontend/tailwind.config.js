/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'bg-black': '#1A1A1A',
        'btp-black': '#1A1A1A',
        'btpb-orange': '#FF8C00',
        'bg-orange': '#FF8C00',
      },
      borderRadius: {
        '30px': '30px',
      },
      fontFamily: {
        'montserrat': ['Montserrat_700Bold', 'Montserrat_400Regular'],
      },
    },
  },
  plugins: [],
}