import { html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { TailwindElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'
import '@/components/lukso-icon'
import '@/components/lukso-tag'

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

  @property({ type: Boolean, attribute: 'is-testnet' })
  isTestnet = false

  @property({ type: String })
  icon = ''

  @property({ type: Boolean, attribute: 'has-menu' })
  hasMenu = false

  @property({ type: String, attribute: 'logo-url' })
  logoUrl = ''

  @state()
  private isMenuOpen = false

  private defaultLogoUrl = '/assets/images/up-logo.png'

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

  private handleIconClick() {
    const event = new CustomEvent('on-icon-click', {
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(event)
  }

  private handleMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen

    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  desktopMenuTemplate() {
    return html` <div
      class="items-center justify-end pr-10 no-underline hidden md:flex"
    >
      <slot name="desktop-menu"></slot>
    </div>`
  }

  desktopCenterTemplate() {
    return html`<div class="items-center hidden md:flex">
      <slot name="desktop-center"></slot>
    </div>`
  }

  mobileMenuTemplate() {
    return html`<div></div>
      <div class="items-center justify-end pr-6 flex md:hidden gap-2">
        <div class="flex">
          <slot name="mobile-icons"></slot>
        </div>
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
          class="fixed top-[78px] left-0 w-full h-full bg-neutral-100 z-[1000] justify-center items-center flex md:hidden
        ${customClassMap({
            'animate-fade-in animation-duration-150': this.isMenuOpen,
            '!hidden': !this.isMenuOpen,
          })}"
          @click=${this.handleMenuToggle}
        >
          <slot name="mobile-menu"></slot>
        </div>
      </div>`
  }

  render() {
    return html`
      <nav
        data-testid="navbar"
        class="bg-neutral-100 shadow-pink-drop-shadow h-78 grid items-center
        ${customClassMap({
          [this.centerStyles]: this.isCenter,
          ['grid-cols-[minmax(max-content,35%)_auto_minmax(max-content,35%)]']:
            !this.isCenter,
          [this.stickyStyles]: this.isSticky,
          [this.transparentStyles]: this.isTransparent,
        })}"
      >
        <div class="flex items-center px-7 h-full sm:px-10">
          <div
            class="flex cursor-pointer group"
            @click=${this.handleBrandClick}
          >
            <img
              src="${this.logoUrl || this.defaultLogoUrl}"
              class="mr-2 h-[26px]"
            />
            <div
              class="text-purple-51 nav-apax-14-medium-uppercase
                whitespace-pre-line flex leading-none transition group-hover:text-purple-41"
            >
              <span>${this.title}</span>
            </div>
            ${this.isTestnet
              ? html`<lukso-tag background-color="yellow-65" class="ml-2">
                  TESTNET
                </lukso-tag>`
              : nothing}
          </div>
          ${this.icon
            ? html`<div
                class="flex border-l border-l-purple-82 h-7 items-center pl-3 ml-3"
              >
                <lukso-icon
                  class="transition cursor-pointer hover:scale-105"
                  name="${this.icon}"
                  color="purple-51"
                  @click=${this.handleIconClick}
                ></lukso-icon>
              </div>`
            : nothing}
        </div>
        ${this.isCenter ? nothing : this.desktopCenterTemplate()}
        ${this.isCenter
          ? nothing
          : this.hasMenu
          ? html`${this.desktopMenuTemplate()} ${this.mobileMenuTemplate()}`
          : nothing}
      </nav>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-navbar': LuksoNavbar
  }
}
