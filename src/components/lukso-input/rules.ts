/**
 * Type definition for a validation rule applied to number input fields.
 *
 * - `name`: Unique identifier for the rule (used for logging/debugging).
 * - `validate`: Function that receives the HTML input and the last typed key,
 *    and returns a boolean indicating whether the input is valid.
 * - `sanitize`: Function that receives the full value (e.g. after paste/autofill)
 *    and returns a cleaned version that satisfies the rule.
 */
type InputRule = {
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
