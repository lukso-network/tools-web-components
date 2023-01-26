import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { TailwindElement } from '../../shared/tailwind.element.js'
import { customClassMap } from '../../shared/directives/custom-class-map.js'

@customElement('lukso-navbar')
export class LuksoNavbar extends TailwindElement {
  @property({ type: String })
  title = ''

  @property({ type: Boolean, attribute: 'is-center' })
  isCenter = false

  @property({ type: Boolean, attribute: 'is-sticky' })
  isSticky = false

  private defaultStyles = `bg-neutral-100 shadow-pink-drop-shadow h-78 flex`

  private centerStyles = `justify-center`

  private stickyStyles = `sticky top-0 z-10`

  render() {
    return html`
      <nav
        data-testid="navbar"
        class=${customClassMap({
          [this.defaultStyles]: true,
          [this.centerStyles]: this.isCenter,
          [this.stickyStyles]: this.isSticky,
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
