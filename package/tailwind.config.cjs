const plugin = require('tailwindcss/plugin')

const { colorPalette } = require('./tools/color-palette.cjs')

/**
 * Add animation delay utilities. Example: .animation-delay-1000
 */
const animationDelayPlugin = plugin(function ({ addUtilities, theme, e }) {
  const values = theme('animationDelay')
  var utilities = Object.entries(values).map(([key, value]) => {
    return {
      [`.${e(`animation-delay-${key}`)}`]: { animationDelay: `${value}` },
    }
  })
  addUtilities(utilities)
})

/**
 * Add animation iteration utilities. Example: .animation-iteration-infinite
 */
const animationIterationPlugin = plugin(function ({ addUtilities, theme, e }) {
  const values = theme('animationIteration')
  var utilities = Object.entries(values).map(([key, value]) => {
    return {
      [`.${e(`animation-iteration-${key}`)}`]: {
        animationIterationCount: `${value}`,
      },
    }
  })
  addUtilities(utilities)
})

/**
 * Add animation duration utilities. Example: .animation-duration-1000
 */
const animationDuration = plugin(function ({ addUtilities, theme, e }) {
  const values = theme('animationDuration')
  var utilities = Object.entries(values).map(([key, value]) => {
    return {
      [`.${e(`animation-duration-${key}`)}`]: {
        animationDuration: `${value}`,
      },
    }
  })
  addUtilities(utilities)
})

/**
 * Add animation fill mode  utilities. Example: .animation-fill-forwards
 */
const animationFill = plugin(function ({ addUtilities, theme, e }) {
  const values = theme('animationFill')
  var utilities = Object.entries(values).map(([key, value]) => {
    return {
      [`.${e(`animation-fill-${key}`)}`]: {
        animationFillMode: `${value}`,
      },
    }
  })
  addUtilities(utilities)
})

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
        'wizard-step':
          '1px 1px 8px #FFFFFF, inset 1px 1px 4px rgba(0, 0, 0, 0.16)',
        'wizard-line': 'inset 0px 0px 2px rgba(0, 0, 0, 0.14)',
      },
      fontSize: {
        8: '8px',
        10: '10px',
        12: '12px',
        13: '13px',
        14: '14px',
        16: '16px',
        17: '17px',
        20: '20px',
        21: '21px',
        24: '24px',
        26: '26px',
        32: '32px',
        40: '40px',
        44: '44px',
        48: '48px',
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
        10: '10px',
        12: '12px',
        14: '14px',
        15: '15px',
        17: '17px',
        19: '19px',
        20: '20px',
        22: '22px',
        24: '24px',
        26: '26px',
        28: '28px',
        31: '31px',
        32: '32px',
        38: '38px',
        40: '40px',
        48: '48px',
        58: '58px',
      },
      transitionDuration: {
        25: '25ms',
        250: '250ms',
      },
      scale: {
        98: '.98',
      },
      height: {
        78: '78px',
      },
      animation: {
        'pulse-resize': 'pulse-resize 1s ease-in-out infinite',
        'resize-in': 'resize-in 0.5s ease-in-out',
        'fade-in': 'fade-in 0.5s ease-in-out',
        bounce2: 'bounce2 1s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-resize': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.7)' },
        },
        'resize-in': {
          '0%': { transform: 'scale(0.5)' },
          '100%': { transform: 'scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounce2: {
          '0%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(10)' },
        },
      },
      animationDelay: {
        none: '0s',
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
        500: '500ms',
        600: '600ms',
        700: '700ms',
        800: '800ms',
        900: '900ms',
        1000: '1000ms',
        1500: '1500ms',
        2000: '2000ms',
        3000: '3000ms',
        5000: '5000ms',
      },
      animationIteration: {
        infinite: 'infinite',
        1: '1',
        2: '2',
        3: '3',
      },
      animationDuration: {
        25: '25ms',
        50: '50ms',
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
        500: '500ms',
        600: '600ms',
        700: '700ms',
        800: '800ms',
        900: '900ms',
        1000: '1000ms',
        1500: '1500ms',
        2000: '2000ms',
        3000: '3000ms',
      },
      animationFill: {
        none: 'none',
        forwards: 'forwards',
        backwards: 'backwards',
        both: 'both',
      },
      borderRadius: {
        0: '0',
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        24: '24px',
      },
    },
  },
  plugins: [
    animationDelayPlugin,
    animationIterationPlugin,
    animationDuration,
    animationFill,
  ],
}
