import { describe, it, expect } from 'vitest'

import {
  disallowComma,
  disallowLeadingDot,
  disallowMultipleDots,
  disallowDecimal,
  allowNumbersAndDot,
  allowAlphanumeric,
  allowDash,
  allowUnderscore,
} from '../rules'

const input = (value: string, selectionStart = value.length) =>
  ({ value, selectionStart }) as HTMLInputElement

describe('disallowComma', () => {
  it('has type disallow', () => {
    expect(disallowComma.type).toBe('disallow')
  })

  describe('validate', () => {
    it('blocks comma', () => {
      expect(disallowComma.validate(input(''), ',')).toBe(false)
    })

    it('allows any other character', () => {
      expect(disallowComma.validate(input(''), '1')).toBe(true)
      expect(disallowComma.validate(input(''), '.')).toBe(true)
      expect(disallowComma.validate(input(''), 'a')).toBe(true)
    })
  })

  describe('sanitize', () => {
    it('removes all commas', () => {
      expect(disallowComma.sanitize('1,000,000')).toBe('1000000')
    })

    it('leaves comma-free values unchanged', () => {
      expect(disallowComma.sanitize('1000')).toBe('1000')
    })
  })
})

describe('disallowLeadingDot', () => {
  it('has type disallow', () => {
    expect(disallowLeadingDot.type).toBe('disallow')
  })

  describe('validate', () => {
    it('blocks dot at position 0', () => {
      expect(disallowLeadingDot.validate(input('', 0), '.')).toBe(false)
    })

    it('allows dot when not at position 0', () => {
      expect(disallowLeadingDot.validate(input('0', 1), '.')).toBe(true)
    })

    it('allows non-dot characters at position 0', () => {
      expect(disallowLeadingDot.validate(input('', 0), '5')).toBe(true)
    })
  })

  describe('sanitize', () => {
    it('strips leading dots', () => {
      expect(disallowLeadingDot.sanitize('.5')).toBe('5')
      expect(disallowLeadingDot.sanitize('...5')).toBe('5')
    })

    it('leaves values without leading dot unchanged', () => {
      expect(disallowLeadingDot.sanitize('0.5')).toBe('0.5')
    })
  })
})

describe('disallowMultipleDots', () => {
  it('has type disallow', () => {
    expect(disallowMultipleDots.type).toBe('disallow')
  })

  describe('validate', () => {
    it('blocks a second dot', () => {
      expect(disallowMultipleDots.validate(input('1.5'), '.')).toBe(false)
    })

    it('allows first dot', () => {
      expect(disallowMultipleDots.validate(input('1'), '.')).toBe(true)
    })

    it('allows non-dot characters regardless', () => {
      expect(disallowMultipleDots.validate(input('1.5'), '3')).toBe(true)
    })
  })

  describe('sanitize', () => {
    it('collapses multiple dots keeping the first', () => {
      expect(disallowMultipleDots.sanitize('1.2.3')).toBe('1.23')
      expect(disallowMultipleDots.sanitize('1.2.3.4')).toBe('1.234')
    })

    it('leaves single-dot values unchanged', () => {
      expect(disallowMultipleDots.sanitize('1.5')).toBe('1.5')
    })

    it('leaves dot-free values unchanged', () => {
      expect(disallowMultipleDots.sanitize('123')).toBe('123')
    })
  })
})

describe('disallowDecimal', () => {
  it('has type disallow', () => {
    expect(disallowDecimal.type).toBe('disallow')
  })

  describe('validate', () => {
    it('blocks dot', () => {
      expect(disallowDecimal.validate(input(''), '.')).toBe(false)
    })

    it('allows digits and other characters', () => {
      expect(disallowDecimal.validate(input(''), '5')).toBe(true)
      expect(disallowDecimal.validate(input(''), 'a')).toBe(true)
    })
  })

  describe('sanitize', () => {
    it('removes all dots', () => {
      expect(disallowDecimal.sanitize('1.2.3')).toBe('123')
    })

    it('leaves dot-free values unchanged', () => {
      expect(disallowDecimal.sanitize('123')).toBe('123')
    })
  })
})

describe('allowNumbersAndDot', () => {
  it('has type allow', () => {
    expect(allowNumbersAndDot.type).toBe('allow')
  })

  describe('validate', () => {
    it('allows digits', () => {
      for (const d of '0123456789') {
        expect(allowNumbersAndDot.validate(input(''), d)).toBe(true)
      }
    })

    it('allows dot', () => {
      expect(allowNumbersAndDot.validate(input(''), '.')).toBe(true)
    })

    it('blocks letters and symbols', () => {
      expect(allowNumbersAndDot.validate(input(''), 'a')).toBe(false)
      expect(allowNumbersAndDot.validate(input(''), '!')).toBe(false)
      expect(allowNumbersAndDot.validate(input(''), ',')).toBe(false)
    })
  })

  describe('sanitize', () => {
    it('strips non-numeric, non-dot characters', () => {
      expect(allowNumbersAndDot.sanitize('1a2b.3')).toBe('12.3')
      expect(allowNumbersAndDot.sanitize('abc')).toBe('')
    })

    it('leaves valid values unchanged', () => {
      expect(allowNumbersAndDot.sanitize('123.45')).toBe('123.45')
    })
  })
})

describe('allowAlphanumeric', () => {
  it('has type allow', () => {
    expect(allowAlphanumeric.type).toBe('allow')
  })

  describe('validate', () => {
    it('allows uppercase letters', () => {
      expect(allowAlphanumeric.validate(input(''), 'A')).toBe(true)
      expect(allowAlphanumeric.validate(input(''), 'Z')).toBe(true)
    })

    it('allows lowercase letters', () => {
      expect(allowAlphanumeric.validate(input(''), 'a')).toBe(true)
      expect(allowAlphanumeric.validate(input(''), 'z')).toBe(true)
    })

    it('allows digits', () => {
      for (const d of '0123456789') {
        expect(allowAlphanumeric.validate(input(''), d)).toBe(true)
      }
    })

    it('rejects underscore, hyphen, spaces, and special characters', () => {
      expect(allowAlphanumeric.validate(input(''), '_')).toBe(false)
      expect(allowAlphanumeric.validate(input(''), '-')).toBe(false)
      expect(allowAlphanumeric.validate(input(''), ' ')).toBe(false)
      expect(allowAlphanumeric.validate(input(''), '!')).toBe(false)
      expect(allowAlphanumeric.validate(input(''), '.')).toBe(false)
    })
  })

  describe('sanitize', () => {
    it('strips non-alphanumeric characters', () => {
      expect(allowAlphanumeric.sanitize('MY TOKEN!')).toBe('MYTOKEN')
      expect(allowAlphanumeric.sanitize('MY_TOKEN-1')).toBe('MYTOKEN1')
    })

    it('leaves alphanumeric strings unchanged', () => {
      expect(allowAlphanumeric.sanitize('TOKEN')).toBe('TOKEN')
      expect(allowAlphanumeric.sanitize('Token123')).toBe('Token123')
    })

    it('returns empty string when all characters are invalid', () => {
      expect(allowAlphanumeric.sanitize('!@#$%')).toBe('')
    })
  })
})

describe('allowDash', () => {
  it('has type allow', () => {
    expect(allowDash.type).toBe('allow')
  })

  describe('validate', () => {
    it('allows hyphen', () => {
      expect(allowDash.validate(input(''), '-')).toBe(true)
    })

    it('rejects all other characters', () => {
      expect(allowDash.validate(input(''), 'a')).toBe(false)
      expect(allowDash.validate(input(''), '1')).toBe(false)
      expect(allowDash.validate(input(''), '_')).toBe(false)
      expect(allowDash.validate(input(''), ' ')).toBe(false)
    })
  })

  describe('sanitize', () => {
    it('strips everything except hyphens', () => {
      expect(allowDash.sanitize('a-b-c')).toBe('--')
      expect(allowDash.sanitize('abc')).toBe('')
    })

    it('leaves hyphen-only strings unchanged', () => {
      expect(allowDash.sanitize('--')).toBe('--')
    })
  })
})

describe('allowUnderscore', () => {
  it('has type allow', () => {
    expect(allowUnderscore.type).toBe('allow')
  })

  describe('validate', () => {
    it('allows underscore', () => {
      expect(allowUnderscore.validate(input(''), '_')).toBe(true)
    })

    it('rejects all other characters', () => {
      expect(allowUnderscore.validate(input(''), 'a')).toBe(false)
      expect(allowUnderscore.validate(input(''), '1')).toBe(false)
      expect(allowUnderscore.validate(input(''), '-')).toBe(false)
      expect(allowUnderscore.validate(input(''), ' ')).toBe(false)
    })
  })

  describe('sanitize', () => {
    it('strips everything except underscores', () => {
      expect(allowUnderscore.sanitize('a_b_c')).toBe('__')
      expect(allowUnderscore.sanitize('abc')).toBe('')
    })

    it('leaves underscore-only strings unchanged', () => {
      expect(allowUnderscore.sanitize('__')).toBe('__')
    })
  })
})
