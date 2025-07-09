export type Address = `0x${string}`

export type InputSize = 'small' | 'medium'

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
