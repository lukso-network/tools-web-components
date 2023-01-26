const { colorPalette } = require('./tools/color-palette.cjs')

module.exports = {
  content: ['**/*.{ts,html,css,scss,mdx}'],
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
        'button-press-primary': '0px 12px 16px -16px rgba(0, 0, 0, 0.4)',
        'button-press-secondary': '0px 12px 16px -16px rgba(0, 0, 0, 0.12)',
        '1xl': '0px 0px 16px rgba(189, 206, 219, 0.4)',
        '2xl':
          '0px 36px 80px rgba(189, 206, 219, 0.3), 0px 5.01331px 33.4221px rgba(189, 206, 219, 0.0503198), 0px 2.68036px 17.869px rgba(189, 206, 219, 0.0417275), 0px 1.50259px 10.0172px rgba(189, 206, 219, 0.035), 0px 0.798012px 5.32008px rgba(189, 206, 219, 0.0282725), 0px 0.332071px 2.21381px rgba(189, 206, 219, 0.0196802)',
        '3xl':
          '0px 12px 80px rgba(189, 206, 219, 0.3), 0px 73.78px 33.4221px rgba(189, 206, 219, 0.0803), 0px 22.3363px 17.869px rgba(189, 206, 219, 0.0417275), 0px 12.5216px 10.0172px rgba(189, 206, 219, 0.035), 0px 6.6501px 5.32008px rgba(189, 206, 219, 0.0282725), 0px 2.76726px 2.21381px rgba(189, 206, 219, 0.0196802)',
        'neutral-drop-shadow':
          '0px 9px 4px rgba(63, 93, 116, 0.01), 0px 5px 3px rgba(63, 93, 116, 0.04), 0px 2px 2px rgba(63, 93, 116, 0.07), 0px 1px 1px rgba(63, 93, 116, 0.08), 0px 0px 0px rgba(63, 93, 116, 0.08)',
        'neutral-drop-shadow-1xl':
          '0px 18px 7px rgba(63, 93, 116, 0.02), 0px 10px 6px rgba(63, 93, 116, 0.08), 0px 4px 4px rgba(63, 93, 116, 0.13), 0px 1px 2px rgba(63, 93, 116, 0.15), 0px 0px 0px rgba(63, 93, 116, 0.16)',
        'neutral-drop-shadow-2xl':
          '0px 54px 22px rgba(63, 93, 116, 0.02), 0px 30px 18px rgba(63, 93, 116, 0.08), 0px 14px 14px rgba(63, 93, 116, 0.13), 0px 3px 7px rgba(63, 93, 116, 0.15), 0px 0px 0px rgba(63, 93, 116, 0.16)',
        'neutral-drop-shadow-3xl':
          '0px 118px 47px rgba(63, 93, 116, 0.02), 0px 67px 40px rgba(63, 93, 116, 0.08), 0px 30px 30px rgba(63, 93, 116, 0.13), 0px 7px 16px rgba(63, 93, 116, 0.15), 0px 0px 0px rgba(63, 93, 116, 0.16)',
        'pink-drop-shadow':
          '0px 9px 4px rgba(112, 96, 92, 0.01), 0px 5px 3px rgba(112, 96, 92, 0.04), 0px 2px 2px rgba(112, 96, 92, 0.07), 0px 1px 1px rgba(112, 96, 92, 0.08), 0px 0px 0px rgba(112, 96, 92, 0.08)',
        'pink-drop-shadow-1xl':
          '0px 17px 7px rgba(112, 96, 92, 0.02), 0px 10px 6px rgba(112, 96, 92, 0.08), 0px 4px 4px rgba(112, 96, 92, 0.13), 0px 1px 2px rgba(112, 96, 92, 0.15), 0px 0px 0px rgba(112, 96, 92, 0.16)',
        'pink-drop-shadow-2xl':
          '0px 54px 21px rgba(112, 96, 92, 0.02), 0px 30px 18px rgba(112, 96, 92, 0.08), 0px 13px 13px rgba(112, 96, 92, 0.13), 0px 3px 7px rgba(112, 96, 92, 0.15), 0px 0px 0px rgba(112, 96, 92, 0.16)',
        'pink-drop-shadow-3xl':
          '0px 117px 47px rgba(112, 96, 92, 0.02), 0px 66px 40px rgba(112, 96, 92, 0.08), 0px 29px 29px rgba(112, 96, 92, 0.13), 0px 7px 16px rgba(112, 96, 92, 0.15), 0px 0px 0px rgba(112, 96, 92, 0.16)',
        'neutral-inner-shadow':
          'inset 0px 9px 3px rgba(63, 93, 116, 0.01), inset 0px 5px 3px rgba(63, 93, 116, 0.04), inset 0px 2px 2px rgba(63, 93, 116, 0.07), inset 0px 1px 1px rgba(63, 93, 116, 0.08)',
        'neutral-inner-shadow-1xl':
          'inset 0px 19px 8px rgba(63, 93, 116, 0.02), inset 0px 11px 6px rgba(63, 93, 116, 0.08), inset 0px 5px 5px rgba(63, 93, 116, 0.13), inset 0px 1px 3px rgba(63, 93, 116, 0.15)',
        'neutral-inner-shadow-2xl':
          'inset 0px 60px 24px rgba(63, 93, 116, 0.02), inset 0px 34px 20px rgba(63, 93, 116, 0.08), inset 0px 15px 15px rgba(63, 93, 116, 0.13), inset 0px 4px 8px rgba(63, 93, 116, 0.15)',
        'neutral-inner-shadow-3xl':
          'inset 0px 130px 52px rgba(63, 93, 116, 0.02), inset 0px 73px 44px rgba(63, 93, 116, 0.08), inset 0px 33px 33px rgba(63, 93, 116, 0.13), inset 0px 8px 18px rgba(63, 93, 116, 0.15)',
        'neutral-above-shadow':
          '0px 0px 24px rgba(63, 93, 116, 0.1), 0px 0px 10.4625px rgba(63, 93, 116, 0.0675), 0px 0px 3.9px rgba(63, 93, 116, 0.05), 0px 0px 1.3875px rgba(63, 93, 116, 0.0325)',
        'neutral-above-shadow-1xl':
          '0px 0px 32px rgba(63, 93, 116, 0.1), 0px 0px 18.46px rgba(63, 93, 116, 0.0675), 0px 0px 11.9px rgba(63, 93, 116, 0.05), 0px 0px 9.39px rgba(63, 93, 116, 0.0325)',
        'neutral-above-shadow-2xl':
          '0px 0px 40px rgba(63, 93, 116, 0.1), 0px 0px 26.46px rgba(63, 93, 116, 0.0675), 0px 0px 19.9px rgba(63, 93, 116, 0.05), 0px 0px 17.39px rgba(63, 93, 116, 0.0325)',
        'neutral-above-shadow-3xl':
          '0px 0px 48px rgba(63, 93, 116, 0.1), 0px 0px 34.46px rgba(63, 93, 116, 0.0675), 0px 0px 27.9px rgba(63, 93, 116, 0.05), 0px 0px 25.39px rgba(63, 93, 116, 0.0325)',
        'pink-above-shadow':
          '0px 0px 24px rgba(112, 96, 92, 0.1), 0px 0px 10.4625px rgba(112, 96, 92, 0.0675), 0px 0px 3.9px rgba(112, 96, 92, 0.05), 0px 0px 1.3875px rgba(112, 96, 92, 0.0325)',
        'pink-above-shadow-1xl':
          '0px 0px 32px rgba(112, 96, 92, 0.1), 0px 0px 18.46px rgba(112, 96, 92, 0.0675), 0px 0px 11.9px rgba(112, 96, 92, 0.05), 0px 0px 9.39px rgba(112, 96, 92, 0.0325)',
        'pink-above-shadow-2xl':
          '0px 0px 40px rgba(112, 96, 92, 0.1), 0px 0px 26.46px rgba(112, 96, 92, 0.0675), 0px 0px 19.9px rgba(112, 96, 92, 0.05), 0px 0px 17.39px rgba(112, 96, 92, 0.0325)',
        'pink-above-shadow-3xl':
          '0px 0px 48px rgba(112, 96, 92, 0.1), 0px 0px 34.46px rgba(112, 96, 92, 0.0675), 0px 0px 27.9px rgba(112, 96, 92, 0.05), 0px 0px 25.39px rgba(112, 96, 92, 0.0325)',
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
      transitionDuration: {
        25: '25ms',
        250: '250ms',
      },
      scale: {
        98: '.98',
      },
    },
  },
  plugins: [],
}
