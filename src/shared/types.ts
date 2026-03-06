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
