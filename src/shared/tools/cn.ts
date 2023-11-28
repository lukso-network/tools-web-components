import { extendTailwindMerge } from 'tailwind-merge'
import { clsx, ClassValue } from 'clsx'

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
      colors: Object.entries(colorPalette).reduce((acc, currentVal) => {
        const colors = Object.keys(currentVal[1]).map(
          c => `text-${currentVal[0]}-${c}`
        )
        return [...acc, ...colors]
      }, []),
      borderRadius: Object.keys(borderRadius).map(s => `rounded-${s}`),
    },
    classGroups: {
      shadow: [{ shadow: Object.keys(boxShadows).map(s => `shadow-${s}`) }],
      'font-size': Object.keys(fontSizes).map(s => `text-${s}`),
      'font-weight': Object.keys(fontWeights).map(s => `font-${s}`),
      scale: Object.keys(scales).map(s => `scale-${s}`),
      h: Object.keys(heights).map(s => `h-${s}`),
      leading: Object.keys(lineHeights).map(s => `leading-${s}`),
    },
  },
})

export const cn = (...inputs: ClassValue[]) => {
  return customTwMerge(clsx(inputs))
}
