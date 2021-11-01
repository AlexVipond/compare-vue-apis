const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['Inconsolata', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        gray: colors.slate,
        primary: {
          '50': 'hsla(193, 83%, 95%, 1.0)',
          '100': 'hsla(196, 80%, 92%, 1.0)',
          '200': 'hsla(196, 77%, 85%, 1.0)',
          '300': 'hsla(197, 73%, 75%, 1.0)',
          '400': 'hsla(199, 72%, 62%, 1.0)',
          '500': 'hsla(201, 68%, 53%, 1.0)',
          '600': 'hsla(202, 67%, 45%, 1.0)',
          '700': 'hsla(204, 69%, 36%, 1.0)',
          '800': 'hsla(205, 66%, 31%, 1.0)',
          '900': 'hsla(206, 63%, 26%, 1.0)',
          '1000': 'hsla(210, 62%, 20%, 1.0)',
          '1100': 'hsla(209, 62%, 14%, 1.0)',
          '1200': 'hsla(210, 62%, 10%, 1.0)',
          '1300': 'hsla(211, 64%, 8%, 1.0)',
          '1400': 'hsla(210, 64%, 5%, 1.0)',
        },
      }
    }
  },
  plugins: [],
}
