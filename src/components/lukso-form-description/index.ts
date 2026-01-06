import { html, nothing } from 'lit'
import { property } from 'lit/decorators.js'

import { safeCustomElement } from '@/shared/safe-custom-element'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.css?inline'

@safeCustomElement('lukso-form-description')
export class LuksoFormDescription extends TailwindStyledElement(style) {
  @property({ type: String, reflect: true })
  description: string

  render() {
    return this.description
      ? html`
          <lukso-sanitize
            html-content=${this.description ? this.description : nothing}
            class="paragraph-inter-12-regular text-neutral-20 pb-2"
          ></lukso-sanitize>
        `
      : nothing
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-form-description': LuksoFormDescription
  }
}
