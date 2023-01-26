import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { TailwindElement } from '../../shared/tailwind.element.js'
import { customClassMap } from '../../shared/directives/custom-class-map.js'
import logo from '../../shared/assets/images/lukso-logo.svg'

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
        <div class="flex items-center px-10">
          <img src="${logo}" />
          <div class="text-purple-51 heading-h4-apax whitespace-pre-line">
            ${this.title}
          </div>
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
