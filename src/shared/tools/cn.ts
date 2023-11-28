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
  classGroups: {
    shadow: Object.keys(boxShadows).map(s => `shadow-${s}`),
    'font-size': Object.keys(fontSizes).map(s => `text-${s}`),
    'font-weight': Object.keys(fontWeights).map(s => `font-${s}`),
    'line-height': Object.keys(lineHeights).map(s => `leading-${s}`),
    scale: Object.keys(scales).map(s => `scale-${s}`),
    height: Object.keys(heights).map(s => `h-${s}`),
    borderRadius: Object.keys(borderRadius).map(s => `rounded-${s}`),
    colors: Object.entries(colorPalette).reduce((acc, currentVal) => {
      const colors = Object.keys(currentVal[1]).map(
        c => `text-${currentVal[0]}-${c}`
      )
      return [...acc, ...colors]
    }, []),
  },
})

export const cn = (...inputs: ClassValue[]) => {
  return customTwMerge(clsx(inputs))
}
