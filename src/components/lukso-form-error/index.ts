import { html, nothing } from 'lit'
import { property } from 'lit/decorators.js'

import { safeCustomElement } from '@/shared/safe-custom-element'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.scss?inline'

@safeCustomElement('lukso-form-error')
export class LuksoFormError extends TailwindStyledElement(style) {
  @property({ type: String, reflect: true })
  error: string

  render() {
    return this.error
      ? html`
          <lukso-sanitize
            html-content=${this.error ? this.error : nothing}
            class="paragraph-inter-12-regular text-red-65 pt-2"
          ></lukso-sanitize>
        `
      : nothing
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-form-error': LuksoFormError
  }
}
