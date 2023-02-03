import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

import { TailwindElement } from '@/shared/tailwind-element'

@customElement('lukso-username')
export class LuksoUsername extends TailwindElement {
  @property({ type: String })
  name = ''

  @property({ type: String })
  address = ''

  @property({ type: Number, attribute: 'max-width' })
  maxWidth = 200

  /** Width of the first 4 bytes of the address */
  private bytesWidth = 50

  addressTemplate = () => {
    return html`<span class="text-neutral-60"
      >#${this.address.slice(2, 6)}</span
    >`
  }

  nameTemplate = () => {
    return html`<span
      class="whitespace-nowrap overflow-hidden text-ellipsis
        text-gradient-to-r from-gradient-1-start to-gradient-1-end"
      >@${this.name}</span
    >`
  }

  render() {
    return html`<span class=""
      >${this.nameTemplate()}${this.address && this.addressTemplate()}</span
    >`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-username': LuksoUsername
  }
}
