export type Address = `0x${string}`

export type InputSize = 'small' | 'medium'

export type FunctionMap<T extends string, Return = string> = Partial<
  Record<T, () => Return>
>
