import { html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { TailwindElement } from '@/shared/tailwind-element'
import '@/components/lukso-icon'
import '@/components/lukso-tag'
import { FunctionMap } from '@/shared/types'

export type NavbarMobileBreakpoint = 'sm' | 'md' | 'lg' | 'xl'

type Styles = FunctionMap<
  | 'wrapper'
  | 'mobileMenuWrapper'
  | 'mobileMenuTrigger'
  | 'mobileMenuDropdown'
  | 'desktopMenuWrapper'
  | 'desktopCenterWrapper'
  | 'desktopCenterPlaceholder',
  string
>

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

  @property({ type: Boolean, attribute: 'has-mobile-dropdown-menu' })
  hasMobileDropdownMenu = false

  @property({ type: String, attribute: 'logo-url' })
  logoUrl = ''

  @property({ type: String, attribute: 'mobile-breakpoint' })
  mobileBreakpoint: NavbarMobileBreakpoint = 'md'

  @state()
  private isMenuOpen = false

  private defaultLogoUrl = '/assets/images/up-logo.png'

  private styles = tv({
    slots: {
      wrapper: 'h-78 grid items-center',
      mobileMenuWrapper: 'items-center justify-end pr-6 flex gap-2',
      mobileMenuTrigger: `w-[18px] h-[2px] rounded-4 bg-neutral-20 transition-all
        before:content-[''] before:absolute before:w-[18px] before:h-[2px] before:bg-neutral-20 before:rounded-4 before:transition-all before:-translate-y-[6px]
        after:content-[''] after:absolute after:w-[18px] after:h-[2px] after:bg-neutral-20 after:rounded-4 after:transition-all after:translate-y-[6px]`,
      mobileMenuDropdown:
        'fixed top-[78px] left-0 w-full h-full bg-neutral-100 z-[1000] justify-center items-center flex',
      desktopMenuWrapper: 'items-center justify-end pr-10 no-underline hidden',
      desktopCenterWrapper: 'items-center hidden',
      desktopCenterPlaceholder: '',
    },
    variants: {
      isCenter: {
        true: {
          wrapper: 'justify-center',
        },
        false: {
          wrapper:
            'grid-cols-[minmax(max-content,35%)_auto_minmax(max-content,35%)]',
        },
      },
      isSticky: {
        true: {
          wrapper: 'sticky top-0 z-[1000]',
        },
      },
      isTransparent: {
        false: {
          wrapper: 'bg-neutral-100 shadow-pink-drop-shadow',
        },
      },
      mobileBreakpoint: {
        sm: {
          mobileMenuWrapper: 'sm:hidden',
          mobileMenuDropdown: 'sm:hidden',
          desktopMenuWrapper: 'sm:flex',
          desktopCenterWrapper: 'sm:flex',
          desktopCenterPlaceholder: 'sm:hidden',
        },
        md: {
          mobileMenuWrapper: 'md:hidden',
          mobileMenuDropdown: 'md:hidden',
          desktopMenuWrapper: 'md:flex',
          desktopCenterWrapper: 'md:flex',
          desktopCenterPlaceholder: 'md:hidden',
        },
        lg: {
          mobileMenuWrapper: 'lg:hidden',
          mobileMenuDropdown: 'lg:hidden',
          desktopMenuWrapper: 'lg:flex',
          desktopCenterWrapper: 'lg:flex',
          desktopCenterPlaceholder: 'lg:hidden',
        },
        xl: {
          mobileMenuWrapper: 'xl:hidden',
          mobileMenuDropdown: 'xl:hidden',
          desktopMenuWrapper: 'xl:flex',
          desktopCenterWrapper: 'xl:flex',
          desktopCenterPlaceholder: 'xl:hidden',
        },
      },
      isMenuOpen: {
        true: {
          mobileMenuTrigger:
            '!bg-transparent before:rotate-[45deg] before:!-translate-y-[0px] after:-rotate-[45deg] after:!translate-y-[0px]',
          mobileMenuDropdown: 'animate-fade-in animation-duration-150',
        },
        false: {
          mobileMenuDropdown: '!hidden',
        },
      },
    },
    compoundVariants: [
      {
        isMenuOpen: true,
        isTransparent: true,
        class: {
          wrapper: 'bg-neutral-100 transition duration-150',
        },
      },
      {
        isMenuOpen: false,
        isTransparent: true,
        class: {
          wrapper: 'bg-transparent',
        },
      },
    ],
  })

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

  desktopMenuTemplate(styles: Styles) {
    return html` <div class=${styles.desktopMenuWrapper()}>
      <slot name="desktop-menu"></slot>
    </div>`
  }

  desktopCenterTemplate(styles: Styles) {
    return html`<div class=${styles.desktopCenterWrapper()}>
        <slot name="desktop-center"></slot>
      </div>
      <div class=${styles.desktopCenterPlaceholder()}></div>`
  }

  mobileMenuTemplate(styles: Styles) {
    return html`<div class=${styles.mobileMenuWrapper()}>
      <slot name="mobile-menu"></slot>

      ${this.hasMobileDropdownMenu
        ? html` <div
              class="flex items-center justify-center w-8 h-8 cursor-pointer"
              @click=${this.handleMenuToggle}
            >
              <div class=${styles.mobileMenuTrigger()}></div>
            </div>
            <div
              class=${styles.mobileMenuDropdown()}
              @click=${this.handleMenuToggle}
            >
              <slot name="mobile-dropdown"></slot>
            </div>`
        : nothing}
    </div>`
  }

  brandTemplate() {
    return html`
      <div class="flex items-center px-6 md:px-10 h-[inherit]">
        <div class="flex cursor-pointer group" @click=${this.handleBrandClick}>
          <img
            src="${this.logoUrl || this.defaultLogoUrl}"
            class="mr-2 h-[26px]"
            alt="${this.title}"
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
    `
  }

  menuTemplate(styles: Styles): ReturnType<typeof html> {
    return html`<div class="flex items-center justify-end">
      ${this.desktopMenuTemplate(styles)} ${this.mobileMenuTemplate(styles)}
    </div>`
  }

  render() {
    const styles = this.styles({
      isCenter: this.isCenter,
      isSticky: this.isSticky,
      isTransparent: this.isTransparent,
      mobileBreakpoint: this.mobileBreakpoint,
      isMenuOpen: this.isMenuOpen,
    })

    return html`
      <nav data-testid="navbar" class=${styles.wrapper()}>
        ${this.brandTemplate()}
        ${this.isCenter ? nothing : this.desktopCenterTemplate(styles)}
        ${this.isCenter
          ? nothing
          : this.hasMenu
            ? this.menuTemplate(styles)
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
