import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit-html/directives/style-map.js'

import { sliceAddress } from '@/shared/tools/slice-address'
import { TailwindElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'

export type UsernameSize = 'small' | 'large'

@customElement('lukso-username')
export class LuksoUsername extends TailwindElement {
  @property({ type: String })
  name = ''

  @property({ type: String })
  address = ''

  @property({ type: Number, attribute: 'max-width' })
  maxWidth = 200

  @property({ type: 'string' })
  size: UsernameSize = 'large'

  @property({ type: Number, attribute: 'slice-by' })
  sliceBy = 8

  @property({ type: String, attribute: 'address-color' })
  addressColor = 'neutral-20'

  /** Width of the first 4 bytes of the address */
  private bytesWidth = 52

  /**
   * Template for 4byte address
   * e.g: #1234
   */
  private addressBytesTemplate() {
    return html`<div class="inline-block text-neutral-60">
      #${this.address.slice(2, 6)}
    </div>`
  }

  /**
   * Template for name
   * e.g: @John
   */
  private nameTemplate() {
    return html`<div
      class="inline-block whitespace-nowrap overflow-hidden text-ellipsis text-transparent
      bg-clip-text bg-gradient-to-r from-gradient-1-start to-gradient-1-end"
      style=${styleMap({
        maxWidth: `${this.maxWidth - this.bytesWidth}px`,
      })}
    >
      @${this.name}
    </div>`
  }

  /**
   * Template for address
   * e.g: 0x123...789
   */
  private addressTemplate() {
    return html`<div
      class="inline-block ${customClassMap({
        ['text-' + this.addressColor]: this.addressColor !== '',
        ['text-neutral-20']: this.addressColor === '',
      })}"
    >
      ${sliceAddress(this.address, this.sliceBy, this.sliceBy)}
    </div>`
  }

  render() {
    const template = (() => {
      if (this.name && this.address) {
        return html`${this.nameTemplate()}${this.addressBytesTemplate()}`
      }

      if (this.name) {
        return this.nameTemplate()
      }

      if (this.address) {
        return this.addressTemplate()
      }
    })()

    return html`<div
      class="inline-flex ${customClassMap({
        'monospaced-12-bold': this.size === 'small',
        'monospaced-16-bold': this.size === 'large',
      })}"
    >
      ${template}
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-username': LuksoUsername
  }
}
