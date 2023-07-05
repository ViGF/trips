/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primaryDarker: '#312A4F',
        primary: '#590BD8',
        primaryLighter: '#DDD5EA',
        dark: '#717171',
        grayLighter: '#BBBFBF'
      },
      textColor: {
        dark: '#717171'
      }
    },
  },
  plugins: [],
}
