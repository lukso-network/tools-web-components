import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import { TailwindElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'

import { profileRecovery } from './icons/profile-recovery'

const icons = {
  'profile-recovery': profileRecovery,
}

@customElement('lukso-icon')
export class LuksoIcon extends TailwindElement {
  @property({ type: String })
  name = ''

  @property({ type: Number })
  width = 24

  @property({ type: Number })
  height = 24

  @property({ type: String })
  color = 'neutral-20'

  @property({ type: Number, attribute: 'stroke-width' })
  strokeWidth = 1.5

  render() {
    const icon = icons[this.name]

    if (!icon) {
      console.warn(`Icon ${this.name} not found`)
    }

    return html`${icon(this.width, this.height, this.color, this.strokeWidth)}`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-icon': LuksoIcon
  }
}
