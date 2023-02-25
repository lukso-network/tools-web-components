import tinycolor from 'tinycolor2'

/**
 * Generates a color map for a given hue, saturation and lightness values
 *
 * @param {*} h - hue
 * @param {*} s - saturation
 * @param {*} l - lightness as an array
 * @returns object containing lightness as key and hex color as value e.g. { 10: '#000000', 20: '#111111' }
 */
export const hslColorMap = (h, s, l) => {
  const colors = {}

  for (let i = 0; i < l.length; i++) {
    const lightness = l[i]
    colors[lightness] = tinycolor({ h, s, l: lightness }).toHexString()
  }

  return colors
}
