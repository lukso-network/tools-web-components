/**
 * Type definition for a validation rule applied to number input fields.
 *
 * - `name`: Unique identifier for the rule (used for logging/debugging).
 * - `validate`: Function that receives the HTML input and the last typed key,
 *    and returns a boolean indicating whether the input is valid.
 */
type Rule = {
  name: string
  validate: (input: HTMLInputElement, key: string) => boolean
}

/**
 * Rule: Disallow the comma (`,`) character in the input.
 *
 * This ensures that users only use dots (`.`) as decimal separators,
 * which is standard in most programming and blockchain contexts.
 */
export const noComma: Rule = {
  name: 'noComma',
  validate: (_, key) => !key.includes(','),
}

/**
 * Rule: Prevent the user from starting the input with a dot (`.`).
 *
 * For example, `.5` will be considered invalid; `0.5` is preferred.
 * This helps avoid format inconsistencies and parsing errors.
 */
export const noLeadingDot: Rule = {
  name: 'noLeadingDot',
  validate: (input, key) => !(key === '.' && input.selectionStart === 0),
}

/**
 * Rule: Allow only one decimal point (`.`) in the input.
 *
 * This ensures valid decimal numbers like `123.45`,
 * and rejects invalid ones like `123.4.5`.
 */
export const onlyOneDot: Rule = {
  name: 'onlyOneDot',
  validate: (input, key) => !(key === '.' && input.value.split('.').length > 1),
}

/**
 * Rule: Accept only digits (`0-9`) and a dot (`.`), or an empty string (when deleting).
 *
 * This prevents letters, symbols, and other invalid characters
 * from being typed into the input field, but allows clearing the field.
 */
export const onlyNumbersAndDot: Rule = {
  name: 'onlyNumbersAndDot',
  validate: (_, key) => key === '' || /^[0-9.]$/.test(key),
}

/**
 * Rule: Disallow the decimal point (`.`) character in the input.
 *
 * This ensures that users can only enter whole numbers (integers),
 * preventing decimal values from being entered.
 */
export const noDecimal: Rule = {
  name: 'noDecimal',
  validate: (_, key) => key !== '.',
}
