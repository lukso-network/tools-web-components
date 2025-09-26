import { describe, it, expect } from 'vitest'

import { checkAccessibility } from '../accessibility-checker'

describe('accessibility-checker with axe-core', () => {
  it('should return no violations for empty content', async () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    try {
      const result = await checkAccessibility(div)

      expect(result.hasViolations).toBe(false)
      expect(result.violationCount).toBe(0)
      expect(result.violations).toHaveLength(0)
    } finally {
      document.body.removeChild(div)
    }
  })

  it('should integrate with axe-core successfully', async () => {
    // Test basic functionality - axe-core integration is working if no errors are thrown
    const div = document.createElement('div')
    const p = document.createElement('p')
    p.textContent = 'Hello World'
    div.appendChild(p)
    document.body.appendChild(div)

    try {
      const result = await checkAccessibility(div)

      // Basic structure should be correct
      expect(result).toHaveProperty('violations')
      expect(result).toHaveProperty('hasViolations')
      expect(result).toHaveProperty('violationCount')
      expect(Array.isArray(result.violations)).toBe(true)
      expect(typeof result.hasViolations).toBe('boolean')
      expect(typeof result.violationCount).toBe('number')
    } finally {
      document.body.removeChild(div)
    }
  })

  it('should properly map axe violation structure', async () => {
    // Even if no violations are found, the structure should be correct
    const div = document.createElement('div')
    const p = document.createElement('p')
    p.textContent = 'Accessible content'
    div.appendChild(p)
    document.body.appendChild(div)

    try {
      const result = await checkAccessibility(div)

      expect(result.violationCount).toBe(result.violations.length)
      expect(result.hasViolations).toBe(result.violations.length > 0)

      // If there are violations, they should have the correct structure
      if (result.violations.length > 0) {
        const violation = result.violations[0]
        expect(violation).toHaveProperty('id')
        expect(violation).toHaveProperty('impact')
        expect(violation).toHaveProperty('description')
        expect(violation).toHaveProperty('help')
        expect(violation).toHaveProperty('nodes')
        expect(Array.isArray(violation.nodes)).toBe(true)
      }
    } finally {
      document.body.removeChild(div)
    }
  })
})
