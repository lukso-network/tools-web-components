import { html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { TailwindElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'

@customElement('lukso-navbar')
export class LuksoNavbar extends TailwindElement {
  @property({ type: String })
  title = ''

  @property({ type: Boolean, attribute: 'is-center' })
  isCenter = false

  @property({ type: Boolean, attribute: 'is-sticky' })
  isSticky = false

  @property({ type: Boolean, attribute: 'is-transparent' })
  isTransparent = false

  @state()
  private isMenuOpen = false

  private centerStyles = `justify-center`

  private stickyStyles = `sticky top-0 z-[1000]`

  private transparentStyles = `!bg-transparent !shadow-none`

  private handleBrandClick() {
    const event = new CustomEvent('on-brand-click', {
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(event)
  }

  private handleMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen
  }

  desktopMenuTemplate() {
    return html`<div
      class="w-full items-center justify-end pr-10 no-underline hidden md:flex"
    >
      <slot name="desktop"></slot>
    </div>`
  }

  mobileMenuTemplate() {
    return html`<div
      class="w-full items-center justify-end pr-6 flex md:hidden"
    >
      <div
        class="flex items-center justify-center w-8 h-8 cursor-pointer"
        @click=${this.handleMenuToggle}
      >
        <div
          class="w-[18px] h-[2px] rounded-4 bg-neutral-20 transition-all
        before:content-[''] before:absolute before:w-[18px] before:h-[2px] before:bg-neutral-20 before:rounded-4 before:transition-all before:-translate-y-[6px]
        after:content-[''] after:absolute after:w-[18px] after:h-[2px] after:bg-neutral-20 after:rounded-4 after:transition-all after:translate-y-[6px]
        ${customClassMap({
            '!bg-transparent before:rotate-[45deg] before:!-translate-y-[0px] after:-rotate-[45deg] after:!translate-y-[0px]':
              this.isMenuOpen,
          })}
      "
        ></div>
      </div>
      <div
        class="fixed top-[78px] left-0 w-full h-full bg-neutral-100 z-[1000] justify-center
      items-center flex md:hidden
    ${customClassMap({
          'animate-fade-in animation-duration-150': this.isMenuOpen,
          '!hidden': !this.isMenuOpen,
        })}"
        @click=${this.handleMenuToggle}
      >
        <slot name="mobile"></slot>
      </div>
    </div>`
  }

  render() {
    return html`
      <nav
        data-testid="navbar"
        class="bg-neutral-100 shadow-pink-drop-shadow h-78 flex
        ${customClassMap({
          [this.centerStyles]: this.isCenter,
          [this.stickyStyles]: this.isSticky,
          [this.transparentStyles]: this.isTransparent,
        })}"
      >
        <div
          class="flex items-center px-7 h-full cursor-pointer sm:px-10"
          @click=${this.handleBrandClick}
        >
          <img src="/assets/images/lukso-logo.svg" class="mr-4" />
          <div
            class="text-purple-51 nav-apax-14-medium-uppercase
              whitespace-pre-line flex leading-none hover:text-purple-41"
          >
            <span>${this.title}</span>
          </div>
        </div>
        ${this.isCenter
          ? html``
          : html`${this.desktopMenuTemplate()} ${this.mobileMenuTemplate()}`}
      </nav>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-navbar': LuksoNavbar
  }
}
