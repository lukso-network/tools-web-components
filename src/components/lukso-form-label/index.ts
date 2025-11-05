import { html, nothing } from 'lit'
import { property } from 'lit/decorators.js'

import { safeCustomElement } from '@/shared/safe-custom-element'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.scss?inline'

@safeCustomElement('lukso-form-label')
export class LuksoFormLabel extends TailwindStyledElement(style) {
  @property({ type: String, attribute: 'for-name', reflect: true })
  forName: string

  render() {
    return html`
      <label
        for=${this.forName ? this.forName : nothing}
        class="heading-inter-14-bold text-neutral-20 pb-2 block"
        ><slot></slot
      ></label>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-form-label': LuksoFormLabel
  }
}
