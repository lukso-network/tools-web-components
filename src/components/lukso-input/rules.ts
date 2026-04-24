/**
 * Type definition for a validation rule applied to input fields.
 *
 * - `name`: Unique identifier for the rule (used for logging/debugging).
 * - `type`: Determines how the rule is combined with others.
 *    - `'disallow'` rules are AND-ed: every disallow rule must pass for a keystroke to be accepted.
 *    - `'allow'` rules are OR-ed: at least one allow rule must pass (when any allow rule is present).
 *    This lets you compose an allowlist from granular rules, e.g. allowAlphanumeric + allowDash.
 * - `validate`: Function that receives the HTML input and the last typed key,
 *    and returns a boolean indicating whether the input is valid.
 * - `sanitize`: Function that receives the full value (e.g. after paste/autofill)
 *    and returns a cleaned version that satisfies the rule.
 */
export type InputRule = {
  name: string
  type: 'allow' | 'disallow'
  validate: (input: HTMLInputElement, key: string) => boolean
  sanitize: (value: string) => string
}

/**
 * Rule: Disallow the comma (`,`) character in the input.
 *
 * This ensures that users only use dots (`.`) as decimal separators,
 * which is standard in most programming and blockchain contexts.
 */
export const disallowComma: InputRule = {
  name: 'disallowComma',
  type: 'disallow',
  validate: (_, key) => !key.includes(','),
  sanitize: value => value.replaceAll(',', ''),
}

/**
 * Rule: Disallow the input from starting with a dot (`.`).
 *
 * For example, `.5` will be considered invalid; `0.5` is preferred.
 * This helps avoid format inconsistencies and parsing errors.
 */
export const disallowLeadingDot: InputRule = {
  name: 'disallowLeadingDot',
  type: 'disallow',
  validate: (input, key) => !(key === '.' && input.selectionStart === 0),
  sanitize: value => value.replace(/^\.+/, ''),
}

/**
 * Rule: Disallow more than one decimal point (`.`) in the input.
 *
 * This ensures valid decimal numbers like `123.45`,
 * and rejects invalid ones like `123.4.5`.
 */
export const disallowMultipleDots: InputRule = {
  name: 'disallowMultipleDots',
  type: 'disallow',
  validate: (input, key) => !(key === '.' && input.value.split('.').length > 1),
  sanitize: value => {
    const [integer, ...decimals] = value.split('.')
    return decimals.length > 0 ? `${integer}.${decimals.join('')}` : integer
  },
}

/**
 * Rule: Disallow the decimal point (`.`) character in the input.
 *
 * This ensures that users can only enter whole numbers (integers),
 * preventing decimal values from being entered.
 */
export const disallowDecimal: InputRule = {
  name: 'disallowDecimal',
  type: 'disallow',
  validate: (_, key) => key !== '.',
  sanitize: value => value.replaceAll('.', ''),
}

/**
 * Rule: Allow digits (0–9) and a dot (`.`).
 *
 * Typically combined with disallowComma, disallowLeadingDot, and disallowMultipleDots
 * to enforce a valid decimal number format.
 */
export const allowNumbersAndDot: InputRule = {
  name: 'allowNumbersAndDot',
  type: 'allow',
  validate: (_, key) => /^[0-9.]$/.test(key),
  sanitize: value => value.replace(/[^0-9.]/g, ''),
}

/**
 * Rule: Allow alphanumeric characters (a–z, A–Z, 0–9).
 *
 * Use alone or combine with allowDash / allowUnderscore to extend the allowed set.
 */
export const allowAlphanumeric: InputRule = {
  name: 'allowAlphanumeric',
  type: 'allow',
  validate: (_, key) => /^[a-zA-Z0-9]$/.test(key),
  sanitize: value => value.replace(/[^a-zA-Z0-9]/g, ''),
}

/**
 * Rule: Allow the hyphen (`-`) character.
 *
 * Combine with allowAlphanumeric (and optionally allowUnderscore) to build
 * a character allowlist, e.g. for token symbols.
 */
export const allowDash: InputRule = {
  name: 'allowDash',
  type: 'allow',
  validate: (_, key) => key === '-',
  sanitize: value => value.replace(/[^-]/g, ''),
}

/**
 * Rule: Allow the underscore (`_`) character.
 *
 * Combine with allowAlphanumeric (and optionally allowDash) to build
 * a character allowlist, e.g. for token symbols.
 */
export const allowUnderscore: InputRule = {
  name: 'allowUnderscore',
  type: 'allow',
  validate: (_, key) => key === '_',
  sanitize: value => value.replace(/[^_]/g, ''),
}

/**
 * Union of all available input rule names.
 */
export type InputRuleName =
  | 'disallowComma'
  | 'disallowLeadingDot'
  | 'disallowMultipleDots'
  | 'disallowDecimal'
  | 'allowNumbersAndDot'
  | 'allowAlphanumeric'
  | 'allowDash'
  | 'allowUnderscore'

/**
 * Lookup map from rule name to rule object.
 */
export const RULES_MAP: Record<InputRuleName, InputRule> = {
  disallowComma,
  disallowLeadingDot,
  disallowMultipleDots,
  disallowDecimal,
  allowNumbersAndDot,
  allowAlphanumeric,
  allowDash,
  allowUnderscore,
}
