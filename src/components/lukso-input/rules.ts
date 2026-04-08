/**
 * Type definition for a validation rule applied to number input fields.
 *
 * - `name`: Unique identifier for the rule (used for logging/debugging).
 * - `validate`: Function that receives the HTML input and the last typed key,
 *    and returns a boolean indicating whether the input is valid.
 * - `sanitize`: Function that receives the full value (e.g. after paste/autofill)
 *    and returns a cleaned version that satisfies the rule.
 */
export type InputRule = {
  name: string
  validate: (input: HTMLInputElement, key: string) => boolean
  sanitize: (value: string) => string
}

/**
 * Rule: Disallow the comma (`,`) character in the input.
 *
 * This ensures that users only use dots (`.`) as decimal separators,
 * which is standard in most programming and blockchain contexts.
 */
export const noComma: InputRule = {
  name: 'noComma',
  validate: (_, key) => !key.includes(','),
  sanitize: value => value.replaceAll(',', ''),
}

/**
 * Rule: Prevent the user from starting the input with a dot (`.`).
 *
 * For example, `.5` will be considered invalid; `0.5` is preferred.
 * This helps avoid format inconsistencies and parsing errors.
 */
export const noLeadingDot: InputRule = {
  name: 'noLeadingDot',
  validate: (input, key) => !(key === '.' && input.selectionStart === 0),
  sanitize: value => value.replace(/^\.+/, ''),
}

/**
 * Rule: Allow only one decimal point (`.`) in the input.
 *
 * This ensures valid decimal numbers like `123.45`,
 * and rejects invalid ones like `123.4.5`.
 */
export const onlyOneDot: InputRule = {
  name: 'onlyOneDot',
  validate: (input, key) => !(key === '.' && input.value.split('.').length > 1),
  sanitize: value => {
    const [integer, ...decimals] = value.split('.')
    return decimals.length > 0 ? `${integer}.${decimals.join('')}` : integer
  },
}

/**
 * Rule: Accept only digits (`0-9`) and a dot (`.`), or an empty string (when deleting).
 *
 * This prevents letters, symbols, and other invalid characters
 * from being typed into the input field, but allows clearing the field.
 */
export const onlyNumbersAndDot: InputRule = {
  name: 'onlyNumbersAndDot',
  validate: (_, key) => key === '' || /^[0-9.]$/.test(key),
  sanitize: value => value.replace(/[^0-9.]/g, ''),
}

/**
 * Rule: Disallow the decimal point (`.`) character in the input.
 *
 * This ensures that users can only enter whole numbers (integers),
 * preventing decimal values from being entered.
 */
export const noDecimal: InputRule = {
  name: 'noDecimal',
  validate: (_, key) => key !== '.',
  sanitize: value => value.replaceAll('.', ''),
}

/**
 * Rule: Allow only valid hour values (1–12) for 12-hour (AM/PM) format.
 *
 * - Single digit 1–9 are always valid while typing.
 * - Two digits are valid only if the resulting number is between 1 and 12.
 */
export const isHour12: InputRule = {
  name: 'isHour12',
  validate: (input, key) => {
    if (key === '' || !/^[0-9]$/.test(key)) return true
    const next =
      input.value.slice(0, input.selectionStart ?? 0) +
      key +
      input.value.slice(input.selectionEnd ?? 0)
    let num = parseInt(next, 10)
    if (next.length === 1) return num >= 0 && num <= 1
    if (next.length === 2 && next[0] === '2') return num <= 23
    if (next.length === 3 && (next[0] !== '0' || next[1] === '0')) {
      const digit1 = next[0]
      const digit2 = next[2]
      num = parseInt(digit1 + digit2, 10)

      return num >= 0 && num <= 59
    }
    return num >= 1 && num <= 12
  },
  sanitize: value => {
    let num = parseInt(value.replace(/\D/g, ''), 10)
    if (isNaN(num)) return '01'
    if (value.length === 3 && (value[0] !== '0' || value[1] === '0')) {
      const digit1 = value[0]
      const digit2 = value[2]
      num = parseInt(digit1 + digit2, 10)

      return num >= 0 && num <= 59 ? String(num) : '00'
    }
    return String(Math.max(1, Math.min(12, num))).padStart(2, '0')
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
