import tinycolor from 'tinycolor2'

import { hslColorMap } from './hsl-color-map.js'

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
  green: hslColorMap(135, 57, [45, 54, 75, 85]),
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
