import type { InputRule } from '@/components/lukso-input/rules'

/**
 * Rule: Allow only valid hour values (1–12) for 12-hour (AM/PM) format.
 *
 * - Single digit 1–9 are always valid while typing.
 * - Two digits are valid only if the resulting number is between 1 and 12.
 */
export const isHour12: InputRule = {
  name: 'isHour12',
  type: 'disallow',
  validate: (input, key) => {
    if (key === '' || !/^[0-9]$/.test(key)) return true
    // Allow 0 only when the existing value is "1" (to form "10")
    if (key === '0') return input.value === '1'
    // Any other digit 1–9 is always accepted; sanitize handles multi-digit results
    return /^[1-9]$/.test(key)
  },
  sanitize: value => {
    const cleaned = value.replace(/\D/g, '')
    if (!cleaned) return '0'
    const num = parseInt(cleaned, 10)
    if (isNaN(num) || num < 1) return '0'
    if (num <= 12) return String(num)
    // > 12: use the last digit typed (e.g. "35" → "5")
    const last = parseInt(cleaned[cleaned.length - 1], 10)
    return last >= 1 ? String(last) : '0'
  },
}

/**
 * Rule: Allow only valid hour values (0–23) for 24-hour format.
 *
 * - First digit can be 0, 1, or 2.
 * - If first digit is 2, second digit can only be 0–3.
 */
export const isHour24: InputRule = {
  name: 'isHour24',
  type: 'disallow',
  validate: (input, key) => {
    if (key === '' || !/^[0-9]$/.test(key)) return true
    const next =
      input.value.slice(0, input.selectionStart ?? 0) +
      key +
      input.value.slice(input.selectionEnd ?? 0)
    let num = parseInt(next, 10)
    if (next.length === 1) return num >= 0 && num <= 2
    if (next.length === 2 && next[0] === '2') return num <= 23
    if (next.length === 3 && (next[0] !== '0' || next[1] === '0')) {
      const digit1 = next[0]
      const digit2 = next[2]
      num = parseInt(digit1 + digit2, 10)

      return num >= 0 && num <= 59
    }
    return num >= 0 && num <= 23
  },
  sanitize: value => {
    let num = parseInt(value.replace(/\D/g, ''), 10)
    if (isNaN(num)) return '00'
    if (value.length === 3 && (value[0] !== '0' || value[1] === '0')) {
      const digit1 = value[0]
      const digit2 = value[2]
      num = parseInt(digit1 + digit2, 10)

      return num >= 0 && num <= 59 ? String(num) : '00'
    }
    return String(Math.max(0, Math.min(23, num))).padStart(2, '0')
  },
}

/**
 * Rule: Allow only valid minute values (0–59).
 *
 * - First digit can only be 0–5.
 * - Second digit can be 0–9.
 */
export const isMinute: InputRule = {
  name: 'isMinute',
  type: 'disallow',
  validate: (input, key) => {
    if (key === '') return true
    if (!/^[0-9]$/.test(key)) return false

    const next =
      input.value.slice(0, input.selectionStart ?? 0) +
      key +
      input.value.slice(input.selectionEnd ?? 0)
    let num = parseInt(next, 10)
    if (next.length === 1) return num >= 0 && num <= 5
    if (next.length === 3 && (next[0] !== '0' || next[1] === '0')) {
      const digit1 = next[0]
      const digit2 = next[2]
      num = parseInt(digit1 + digit2, 10)

      return num >= 0 && num <= 59
    }
    return num >= 0 && num <= 59
  },
  sanitize: value => {
    const cleaned = value.replace(/\D/g, '')
    let num = parseInt(cleaned, 10)
    if (!cleaned) return '00'
    if (cleaned.length === 1) return cleaned + '0'
    if (cleaned.length === 3 && (cleaned[0] !== '0' || cleaned[1] === '0')) {
      const digit1 = cleaned[0]
      const digit2 = cleaned[2]
      num = parseInt(digit1 + digit2, 10)

      return num >= 0 && num <= 59 ? String(num) : '00'
    }

    return String(Math.max(0, Math.min(59, num))).padStart(2, '0')
  },
}

/**
 * Union of all available time-picker rule names.
 */
export type TimePickerRuleName = 'isHour24' | 'isHour12' | 'isMinute'

/**
 * Lookup map from rule name to rule object.
 */
export const RULES_MAP: Record<TimePickerRuleName, InputRule> = {
  isHour24,
  isHour12,
  isMinute,
}
