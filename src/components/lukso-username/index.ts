import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { nothing } from 'lit-html'
import { tv } from 'tailwind-variants'

import { sliceAddress } from '@/shared/tools/slice-address'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import { customStyleMap } from '@/shared/directives'
import { cn } from '@/shared/tools'
import style from './style.scss?inline'

export type UsernameSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large'

@customElement('lukso-username')
export class LuksoUsername extends TailwindStyledElement(style) {
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
  addressColor = ''

  @property({ type: String, attribute: 'name-color' })
  nameColor = ''

  @property({ type: String, attribute: 'custom-class' })
  customClass = ''

  @property({ type: Boolean, attribute: 'hide-prefix' })
  hidePrefix = false

  @property({ type: String })
  prefix = '@'

  /** Width of the first 4 bytes of the address */
  private bytesWidth = 52

  private styles = tv({
    slots: {
      wrapper: 'inline-flex',
      name: 'inline-block whitespace-nowrap overflow-hidden text-ellipsis',
      address: 'inline-block',
      bytes: 'inline-block',
    },
    variants: {
      size: {
        'x-small': {
          wrapper: 'paragraph-ptmono-10-bold',
        },
        small: {
          wrapper: 'paragraph-ptmono-12-bold',
        },
        medium: {
          wrapper: 'paragraph-ptmono-14-bold',
        },
        large: {
          wrapper: 'paragraph-ptmono-16-bold',
        },
        'x-large': {
          wrapper: 'paragraph-ptmono-24-bold',
        },
      },
      hasNameColor: {
        false: {
          name: 'text-transparent bg-clip-text bg-gradient-to-r from-gradient-1-start to-gradient-1-end',
        },
      },
      hasAddressColor: {
        false: {
          address: 'text-neutral-20',
          bytes: 'text-neutral-60',
        },
      },
    },
  })

  private addressBytesTemplate(styles: string) {
    return html`<div
      class=${styles}
      style=${customStyleMap({
        [`color: var(--${this.addressColor})`]: this.addressColor !== '',
      })}
    >
      #${this.address.slice(2, 6)}
    </div>`
  }

  private nameTemplate(styles: string) {
    return html`<div
      class=${styles}
      style=${customStyleMap({
        [`max-width: ${this.maxWidth - this.bytesWidth}px`]: true,
        [`color: var(--${this.nameColor})`]: this.nameColor !== '',
      })}
    >
      ${this.hidePrefix ? nothing : this.prefix}${this.name}
    </div>`
  }

  private addressTemplate(styles: string) {
    return html`<div
      class=${styles}
      style=${customStyleMap({
        [`color: var(--${this.addressColor})`]: this.addressColor !== '',
      })}
    >
      ${sliceAddress(this.address, this.sliceBy, this.sliceBy)}
    </div>`
  }

  render() {
    const { wrapper, name, address, bytes } = this.styles({
      size: this.size,
      hasNameColor: this.nameColor !== '',
      hasAddressColor: this.addressColor !== '',
    })

    const template = (() => {
      if (this.name && this.address) {
        return html`${this.nameTemplate(name())}${this.addressBytesTemplate(
          bytes()
        )}`
      }

      if (this.name) {
        return this.nameTemplate(name())
      }

      if (this.address) {
        return this.addressTemplate(address())
      }
    })()

    return html`<div class=${cn(wrapper(), this.customClass)}>${template}</div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-username': LuksoUsername
  }
}
