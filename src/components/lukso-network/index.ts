import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'
import style from './style.scss?inline'

@customElement('lukso-network')
export class LuksoNetworkName extends TailwindStyledElement(style) {
  @property({ type: Boolean, attribute: 'is-confirmation' })
  isConfirmation = false

  private defaultStyles = `z-50 rounded-lg text-neutral-20 bg-yellow-65 px-2 py-1 paragraph-inter-12-medium`
  private confirmationStyles = `absolute top-4 left-4`

  render() {
    return html`
      <div
        data-testid="network"
        class=${customClassMap({
          [this.defaultStyles]: true,
          [this.confirmationStyles]: this.isConfirmation,
        })}
      >
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-network': LuksoNetworkName
  }
}
