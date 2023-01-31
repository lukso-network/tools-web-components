import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { TailwindElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'

export type ButtonSizes = 'small' | 'medium'

@customElement('lukso-card')
export class LuksoCard extends TailwindElement {
  @property({ type: Boolean, attribute: 'has-header' })
  hasHeader = false

  private defaultStyles = `bg-neutral-100 rounded-3xl w-[362px] min-h-[534px] shadow-pink-drop-shadow-2xl`

  render() {
    return html`
      <div
        data-testid="card"
        class=${customClassMap({
          [this.defaultStyles]: true,
        })}
      >
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-card': LuksoCard
  }
}
