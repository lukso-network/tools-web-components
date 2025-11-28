import '@lukso/web-components'

// Dynamic type generation based on HTMLElementTagNameMap
type CamelToKebab<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Lowercase<T>}${CamelToKebab<U>}`
    : `${Lowercase<T>}-${CamelToKebab<U>}`
  : S

type ComponentProps<T> = {
  [K in keyof T as T[K] extends (...args: unknown[]) => unknown
    ? never
    : K]: T[K]
}

type KebabHTMLAttributes<T> = {
  [K in keyof ComponentProps<T> as CamelToKebab<
    K & string
  >]?: ComponentProps<T>[K]
}

type ReactWebComponentProps<T> = T extends HTMLElement
  ? React.DetailedHTMLProps<React.HTMLAttributes<T>, T> & KebabHTMLAttributes<T>
  : never

type CustomElementsOnly = {
  [K in keyof HTMLElementTagNameMap as K extends `${string}-${string}`
    ? K
    : never]: HTMLElementTagNameMap[K]
}

type CustomElements = {
  [K in keyof CustomElementsOnly]: ReactWebComponentProps<CustomElementsOnly[K]>
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
}
