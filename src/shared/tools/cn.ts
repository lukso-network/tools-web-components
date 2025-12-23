import { extendTailwindMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

import {
  colorPalette,
  boxShadows,
  fontSizes,
  fontWeights,
  lineHeights,
  scales,
  heights,
  borderRadius,
} from './tailwind-config'

const customTwMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: Object.entries(colorPalette).reduce((acc, currentVal) => {
        const colors = Object.keys(currentVal[1]).map(
          c => `${currentVal[0]}-${c}`
        )
        return acc.concat(colors)
      }, [] as string[]),
    },
    classGroups: {
      shadow: [{ shadow: Object.keys(boxShadows).map(s => `${s}`) }],
      'font-size': [{ text: Object.keys(fontSizes) }],
      'font-weight': [{ font: Object.keys(fontWeights) }],
      rounded: [{ rounded: Object.keys(borderRadius) }],
      scale: [{ scale: Object.keys(scales) }],
      h: [{ h: Object.keys(heights) }],
      leading: [{ leading: Object.keys(lineHeights) }],
    },
  },
})

export const cn = (...inputs: ClassValue[]) => {
  return customTwMerge(clsx(inputs))
}
