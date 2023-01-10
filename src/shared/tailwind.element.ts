import { LitElement, unsafeCSS } from 'lit'

import style from './tailwind.global.scss?inline'

const tailwindElement = unsafeCSS(style)

export const TailwindStyledElement = (style: any): typeof LitElement =>
  class extends LitElement {
    static styles = style
      ? [tailwindElement, unsafeCSS(style)]
      : [tailwindElement]
  }

export class TailwindElement extends LitElement {
  static styles = [tailwindElement]
}
