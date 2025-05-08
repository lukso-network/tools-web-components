import tinycolor from 'tinycolor2'

import { hslColorMap } from './hsl-color-map.js'

export const boxShadows = {
  'button-medium-hover-primary': '0px 20px 16px -16px rgba(0, 0, 0, 0.4)',
  'button-medium-hover-secondary': '0px 20px 16px -16px rgba(0, 0, 0, 0.12)',
  'button-medium-press-primary': '0px 12px 16px -16px rgba(0, 0, 0, 0.4)',
  'button-medium-press-secondary': '0px 12px 16px -16px rgba(0, 0, 0, 0.12)',
  'button-small-hover-primary': '0px 10px 8px -8px rgba(0, 0, 0, 0.4)',
  'button-small-hover-secondary': '0px 10px 8px -8px rgba(0, 0, 0, 0.12)',
  'button-small-press-primary': '0px 6px 8px -8px rgba(0, 0, 0, 0.4)',
  'button-small-press-secondary': '0px 6px 8x -8px rgba(0, 0, 0, 0.12)',
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
  'neutral-inner-shadow-top': 'inset 0 7px 9px -7px rgb(18 41 74 / 21%)',
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
  'wizard-step': '1px 1px 8px #FFFFFF, inset 1px 1px 4px rgba(0, 0, 0, 0.16)',
  'wizard-line': 'inset 0px 0px 2px rgba(0, 0, 0, 0.14)',
  'neutral-shadow-round':
    '0px 7px 5px 0px rgba(63, 93, 116, 0.00), 0px 0px 10px 0px rgba(63, 93, 116, 0.02), 0px 3px 10px 0px rgba(63, 93, 116, 0.08), 0px 4px 4px 0px rgba(63, 93, 116, 0.13), 0px 1px 2px 0px rgba(63, 93, 116, 0.15), 0px 0px 3px 0px rgba(63, 93, 116, 0.16)',
  'neutral-shadow-round-1xl':
    '0px 27px 12px 0px rgba(63, 93, 116, 0.00), 0px 18px 7px 0px rgba(63, 93, 116, 0.02), 0px 10px 6px 0px rgba(63, 93, 116, 0.08), 0px 4px 4px 0px rgba(63, 93, 116, 0.13), 0px 1px 2px 0px rgba(63, 93, 116, 0.15), 0px 0px 14px 0px rgba(63, 93, 116, 0.16)',
  'neutral-shadow-round-2xl':
    '0px 85px 24px 0px rgba(63, 93, 116, 0.00), 0px 54px 22px 0px rgba(63, 93, 116, 0.02), 0px 30px 18px 0px rgba(63, 93, 116, 0.08), 0px 14px 14px 0px rgba(63, 93, 116, 0.13), 0px 3px 7px 0px rgba(63, 93, 116, 0.15), 0px 0px 23px 0px rgba(63, 93, 116, 0.16)',
  'neutral-shadow-round-3xl':
    '0px 185px 52px 0px rgba(63, 93, 116, 0.00), 0px 118px 47px 0px rgba(63, 93, 116, 0.02), 0px 67px 40px 0px rgba(63, 93, 116, 0.08), 0px 30px 30px 0px rgba(63, 93, 116, 0.13), 0px 7px 16px 0px rgba(63, 93, 116, 0.15), 0px 0px 30px 0px rgba(63, 93, 116, 0.16)',
}

export const fontSizes = {
  6: '6px',
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
}

export const fontWeights = {
  100: '100',
  200: '200',
  300: '300',
  400: '400',
  500: '500',
  600: '600',
  700: '700',
  800: '800',
  900: '900',
}

export const lineHeights = {
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
}

export const scales = {
  98: '.98',
}

export const heights = {
  78: '78px',
}

export const borderRadius = {
  0: '0',
  4: '4px',
  8: '8px',
  10: '10px',
  12: '12px',
  16: '16px',
  24: '24px',
}

export const spacing = {
  18: '4,5rem', // 72px
  22: '5.5rem', // 88px
  30: '7.5rem', // 120px
}

export type ColorMap = {
  [key: string]: string
}

/**
 * Color palette based on the structure thats compatible with Tailwind config
 */
export const colorPalette = {
  neutral: hslColorMap(
    206,
    30,
    [
      10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
      97, 98, 100,
    ]
  ),
  honey: hslColorMap(42, 93, [72, 75, 82, 85, 92]),
  coral: hslColorMap(14, 87, [65, 74, 75, 84, 85, 94]),
  warm: hslColorMap(25, 100, [77, 87, 97]),
  'sea-salt': hslColorMap(180, 17, [57, 67, 88]),
  cloud: hslColorMap(200, 38, [43, 75, 88]),
  ocean: hslColorMap(209, 38, [38, 75, 88]),
  sky: hslColorMap(209, 64, [64, 75, 85]),
  lukso: hslColorMap(335, 33, [70, 80, 90]),
  yellow: hslColorMap(36, 100, [55, 65, 75, 85]),
  green: hslColorMap(135, 57, [45, 54, 63, 75, 85]),
  blue: hslColorMap(216, 96, [50, 60, 75, 85]),
  red: hslColorMap(0, 75, [55, 65, 75, 85]),
  purple: hslColorMap(230, 24, [94, 82, 63, 58, 51, 41, 31, 15]),
  pink: hslColorMap(11, 73, [97, 96, 95, 94, 93, 92, 91, 90]),
  'gradient-1': {
    start: '#D39B9D',
    end: '#9071D1',
  },
  'gradient-2': {
    start: '#F8DAD3',
    end: '#CC99AE',
  },
  'gradient-3': {
    start: tinycolor({ h: 230, s: 20, l: 28 }).toHexString(),
    end: tinycolor({ h: 230, s: 24, l: 51 }).toHexString(),
  },
}

/**
 * Splits a color map into smaller color maps
 *
 * @param colors - color map to split
 * @param from - index to start from
 * @param to - index to end at
 * @returns a new color map
 */
const splitColor = (colors: ColorMap, from: number, to: number): ColorMap => {
  return Object.keys(colors)
    .slice(from, to)
    .reduce((result, key) => {
      result[key] = colors[key]

      return result
    }, {})
}

/**
 * Color map subsets that can be used in the Storybook preview
 */
export const neutral1 = splitColor(colorPalette.neutral, 0, 8)
export const neutral2 = splitColor(colorPalette.neutral, 8, 16)
export const neutral3 = splitColor(
  colorPalette.neutral,
  16,
  Object.keys(colorPalette.neutral).length
)
