import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { TailwindElement } from '../../shared/tailwind.element'
import { customClassMap } from '../../shared/directives/custom-class-map'

@customElement('lukso-navbar')
export class LuksoNavbar extends TailwindElement {
  @property({ type: String })
  title = ''

  private defaultStyles = `bg-neutral-100 shadow-pink-drop-shadow h-78`

  render() {
    return html`
      <nav
        data-testid="navbar"
        class=${customClassMap({
          [this.defaultStyles]: true,
        })}
      >
        <div>
          <img src="" />
          <div class="text-purple-51 heading-h4-apax">${this.title}</div>
        </div>
        <slot></slot>
      </nav>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-navbar': LuksoNavbar
  }
}
