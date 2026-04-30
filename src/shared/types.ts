import { LSP4_TOKEN_TYPES } from '@lukso/lsp-smart-contracts'

import { SEARCH_RESULT_TYPES, STANDARDS } from './enums'

export type Address = `0x${string}`

export type InputSize = 'small' | 'medium' | 'large' | 'x-large'

export type FunctionMap<T extends string, Return = string> = Partial<
  Record<T, () => Return>
>

export type ProfileSize =
  | '2x-small'
  | 'x-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large'
  | '2x-large'

export type SearchResultType = `${SEARCH_RESULT_TYPES}`

export type Standard = `${STANDARDS}`

export type IconOptions = {
  width: number
  height: number
  color: string
  strokeWidth: number
  secondaryColor?: string
}

export type TokenType = (typeof LSP4_TOKEN_TYPES)[keyof typeof LSP4_TOKEN_TYPES]

export type DatePickerDateFormat = 'short' | 'long'

export type DatePickerTimeFormat = '12h' | '24h' | 'auto'

export type DatePickerWeekStartDay = 'monday' | 'sunday'

export type DatePickerPresetUnit =
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'

/**
 * Preset time value. Either a special sentinel or a relative offset object.
 * - `'now'` — resolves to the current date and time
 * - `'forever'` — resolves to no date (clears the value, emits empty string)
 * - `'pick'` — opens the calendar for manual selection
 * - `{ amount, unit }` — adds `amount` units to the current date (use negative for past)
 */
export type DatePickerPresetTime =
  | 'now'
  | 'forever'
  | 'pick'
  | { amount: number; unit: DatePickerPresetUnit }

export type DatePickerPreset = {
  label: string
  time: DatePickerPresetTime
}
