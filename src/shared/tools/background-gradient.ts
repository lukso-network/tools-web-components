import { isAddress } from 'viem'

/**
 * Generates a background gradient based on the provided address.
 *
 * @param address
 */
export const backgroundGradient = (address?: string) => {
  let gradientStart = '#24354210' // bg-neutral-20/10
  let gradientEnd = '#24354220' // bg-neutral-20/20
  const opacity = '80' // 50% in hex format

  if (address && isAddress(address)) {
    gradientStart = `#${address.slice(2, 8)}${opacity}`
    gradientEnd = `#${address.slice(36, 42)}${opacity}`
  }

  return `linear-gradient(90deg, ${gradientStart}, ${gradientEnd})`
}
