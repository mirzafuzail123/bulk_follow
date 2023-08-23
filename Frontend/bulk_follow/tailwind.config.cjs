/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports ={
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
    colors: {
      
      // 'primary':'#6BC9A8',
      // 'dark-primary':'#63B095',
      'primary':'#BE3455',
      'dark-primary':'#E3486D',
      'secondary':'#354168',
      'dark-gray':'#f9f9fc'
    },
      },

    screens: {
      'xs': '375px',
      ...defaultTheme.screens,
    },
    
  },
  plugins: [
    require('tailwind-scrollbar'),

  ],
}



