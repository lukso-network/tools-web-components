const { colorPalette } = require('./tools/color-palette.cjs')

module.exports = {
  content: ['**/*.{ts,html,css,scss}'],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      apax: ['Apax', 'sans-serif'],
      mono: ['"PT Mono"', 'sans-serif'],
    },
    extend: {
      colors: colorPalette,
      boxShadow: {
        'button-hover-primary': '0px 20px 16px -16px rgba(0, 0, 0, 0.4)',
        'button-hover-secondary': '0px 20px 16px -16px rgba(0, 0, 0, 0.12)',
        '1xl': '0px 0px 16px rgba(189, 206, 219, 0.4)',
        '2xl':
          '0px 36px 80px rgba(189, 206, 219, 0.3), 0px 5.01331px 33.4221px rgba(189, 206, 219, 0.0503198), 0px 2.68036px 17.869px rgba(189, 206, 219, 0.0417275), 0px 1.50259px 10.0172px rgba(189, 206, 219, 0.035), 0px 0.798012px 5.32008px rgba(189, 206, 219, 0.0282725), 0px 0.332071px 2.21381px rgba(189, 206, 219, 0.0196802)',
        '3xl':
          '0px 12px 80px rgba(189, 206, 219, 0.3), 0px 73.78px 33.4221px rgba(189, 206, 219, 0.0803), 0px 22.3363px 17.869px rgba(189, 206, 219, 0.0417275), 0px 12.5216px 10.0172px rgba(189, 206, 219, 0.035), 0px 6.6501px 5.32008px rgba(189, 206, 219, 0.0282725), 0px 2.76726px 2.21381px rgba(189, 206, 219, 0.0196802)',
      },
      fontSize: {
        8: '8px',
        10: '10px',
        12: '12px',
        13: '13px',
        14: '14px',
        16: '16px',
        17: '17px',
        21: '21px',
        24: '24px',
        26: '26px',
      },
      fontWeight: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      },
      lineHeight: {
        12: '12px',
        14: '14px',
        15: '15px',
        17: '17px',
        20: '20px',
        22: '22px',
        24: '24px',
        26: '26px',
        28: '28px',
        31: '31px',
      },
    },
  },
  plugins: [],
}
