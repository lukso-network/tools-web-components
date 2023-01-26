import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { TailwindElement } from '../../shared/tailwind.element.js'
import { customClassMap } from '../../shared/directives/custom-class-map.js'

@customElement('lukso-navbar')
export class LuksoNavbar extends TailwindElement {
  @property({ type: String })
  title = ''

  @property({ type: Boolean })
  'is-center' = false

  private defaultStyles = `bg-neutral-100 shadow-pink-drop-shadow h-78 flex`

  private centerStyles = `justify-center`

  render() {
    return html`
      <nav
        data-testid="navbar"
        class=${customClassMap({
          [this.defaultStyles]: true,
          [this.centerStyles]: this['is-center'],
        })}
      >
        <div class="flex items-center px-10 h-full">
          <img src="assets/images/lukso-logo.svg" class="mr-4" />
          <div class="text-purple-51 heading-h4-apax whitespace-pre-line flex">
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
