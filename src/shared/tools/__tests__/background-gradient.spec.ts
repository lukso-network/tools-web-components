import { describe, expect, it } from 'vitest'

import { backgroundGradient } from '../background-gradient'

describe('backgroundGradient', () => {
  it('returns default gradient when no address is provided', () => {
    expect(backgroundGradient()).toBe(
      'linear-gradient(90deg, #24354210, #24354220)'
    )
  })

  it('returns default gradient when address is undefined', () => {
    expect(backgroundGradient(undefined)).toBe(
      'linear-gradient(90deg, #24354210, #24354220)'
    )
  })

  it('returns correct gradient for a valid address', () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678'
    expect(backgroundGradient(address)).toBe(
      'linear-gradient(90deg, #12345680, #34567880)'
    )
  })

  it('returns default gradient when address shorter than expected gracefully', () => {
    const address = '0x1234'
    expect(backgroundGradient(address)).toBe(
      'linear-gradient(90deg, #24354210, #24354220)'
    )
  })

  it('returns default gradient when address without 0x prefix', () => {
    const address = '1234567890abcdef1234567890abcdef12345678'
    expect(backgroundGradient(address)).toBe(
      'linear-gradient(90deg, #24354210, #24354220)'
    )
  })

  it('returns default gradient when empty string address', () => {
    expect(backgroundGradient('')).toBe(
      'linear-gradient(90deg, #24354210, #24354220)'
    )
  })
})
