import { html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.scss?inline'
import { cn } from '@/shared/tools'

import type { InputSize } from '@/shared/types'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'landing'
  | 'text'
  | 'nav-button'
  | 'nav-text'
  | 'link'
export type ButtonType = 'submit' | 'reset' | 'button'
export type LinkTarget = '_blank' | '_self' | '_parent' | '_top'

const LONG_PRESS_ANIMATION_DURATION_IN_MS = 2000

@customElement('lukso-button')
export class LuksoButton extends TailwindStyledElement(style) {
  @property({ type: String })
  variant: ButtonVariant = 'primary'

  @property({ type: String })
  size: InputSize = 'medium'

  @property({ type: Boolean })
  disabled = false

  @property({ type: Boolean, attribute: 'is-full-width' })
  isFullWidth = false

  @property({ type: Boolean, attribute: 'is-long-press' })
  isLongPress = false

  @property({ type: Boolean, attribute: 'is-link' })
  isLink = false

  @property({ type: Boolean, attribute: 'is-loading' })
  isLoading = false

  @property({ type: String })
  type: ButtonType = 'button'

  @property({ type: String })
  href = ''

  @property({ type: String })
  target: LinkTarget = '_blank'

  @property({ type: String })
  rel = ''

  @property({ type: String, attribute: 'loading-text' })
  loadingText = ''

  @property({ type: String, attribute: 'custom-class' })
  customClass = ''

  @property({ type: Boolean, attribute: 'is-active' })
  isActive = false

  @property({ type: Number })
  count = ''

  @property({ type: Boolean, attribute: 'is-icon' })
  isIcon = false

  @state()
  private isPressed = false

  @state()
  private noTransition = false

  @state()
  private timer = 0

  private counterStyles = tv({
    base: 'ml-2 border border-neutral-20 rounded-4 px-[2px] py-[1px] paragraph-inter-10-semi-bold text-neutral-20 bg-neutral-100',
    variants: {
      isActive: {
        true: 'text-neutral-100 bg-neutral-20',
      },
    },
  })

  private buttonStyles = tv({
    base: `flex justify-center items-center relative text-center
      border border-solid cursor-pointer transition
      duration-250 active:scale-98 active:duration-25
      disabled:shadow-none disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-50`,
    variants: {
      color: {
        primary: `bg-neutral-20 border-neutral-20 text-neutral-100
            disabled:hover:!bg-neutral-20 disabled:hover:!border-neutral-20
            hover:bg-neutral-25 hover:border-neutral-25
            active:bg-neutral-25 active:border-neutral-25 before:bg-neutral-10`,
        secondary: 'bg-neutral-100 border-neutral-90 text-neutral-20',
        landing: `bg-purple-51 border-purple-51 text-neutral-100
            disabled:hover:!bg-purple-51 disabled:hover:!border-purple-51
            hover:bg-purple-58 hover:border-purple-58 before:bg-purple-51`,
        text: `bg-transparent border-none text-neutral-20
            hover:text-neutral-35
            active:text-neutral-35 active:scale-100
            disabled:text-neutral-90`,
        link: 'bg-transparent border-none active:!scale-100 underline text-purple-51 hover:text-purple-41',
        'nav-button': 'nav-apax-12-medium-uppercase text-purple-41 !text-12',
        'nav-text':
          'bg-transparent border-none nav-apax-12-medium-uppercase text-purple-63 hover:text-purple-41 !text-12 transition',
      },
      size: {
        medium: 'h-[48px] px-6 paragraph-inter-16-semi-bold rounded-12',
        small: 'h-[28px] px-3 paragraph-inter-12-medium rounded-8',
      },
      isLongPress: {
        true: `relative overflow-hidden z-[1] active:outline-0
          before:absolute before:content-[''] before:top-0 before:left-0 before:w-0 before:h-[48px]
          before:transition-all before:duration-[2000ms] before:z-[-1] before:rounded-0`,
      },
      isFullWidth: {
        true: 'w-full',
      },
      isPressed: {
        true: 'before:w-full before:z-[-1]',
      },
      noTransition: {
        true: 'before:transition-none',
      },
      isActive: {
        true: 'border-neutral-20',
      },
      isIcon: {
        true: '',
      },
    },
    compoundVariants: [
      {
        isActive: true,
        color: 'nav-text',
        class: 'text-purple-41',
      },
      {
        size: ['medium', 'small'],
        color: 'link',
        class: 'p-0 h-[initial]',
      },
      {
        size: ['medium'],
        color: ['primary', 'landing'],
        class:
          'hover:shadow-button-medium-hover-primary active:shadow-button-medium-press-primary',
      },
      {
        size: ['medium'],
        color: ['secondary'],
        class:
          'hover:shadow-button-medium-hover-secondary active:shadow-button-medium-press-secondary',
      },
      {
        size: ['small'],
        color: ['primary', 'landing'],
        class:
          'hover:shadow-button-small-hover-primary active:shadow-button-small-press-primary',
      },
      {
        size: ['small'],
        color: ['secondary'],
        class:
          'hover:shadow-button-small-hover-secondary active:shadow-button-small-press-secondary',
      },
      {
        isIcon: true,
        size: ['medium'],
        class: 'px-3',
      },
      {
        isIcon: true,
        size: ['small'],
        class: 'px-[6px]',
      },
    ],
  })

  private handleMouseDown() {
    // Additional check for using long press on non-primary and non-landing variants
    if (
      this.variant !== 'primary' &&
      this.variant !== 'landing' &&
      this.isLongPress
    ) {
      return console.warn(
        'Long press is only available for primary and landing variants'
      )
    }

    if (!this.isLongPress) {
      return
    }

    this.isPressed = true

    this.timer = window.setTimeout(() => {
      const event = new CustomEvent('on-long-press-complete', {
        bubbles: true,
        composed: true,
      })
      this.dispatchEvent(event)
    }, LONG_PRESS_ANIMATION_DURATION_IN_MS)
  }

  private handleMouseUp() {
    if (!this.isLongPress) {
      return
    }

    this.isPressed = false
    this.noTransition = true

    setTimeout(() => {
      this.noTransition = false
    }, 100)
    this.timer && clearTimeout(this.timer)
  }

  loadingTemplate() {
    return html`<lukso-icon
        name="spinner"
        color=${this.variant === 'secondary' || this.variant === 'text'
          ? 'neutral-20'
          : 'neutral-100'}
        class="animate-spin"
      ></lukso-icon>
      ${this.loadingText
        ? html`<span class="ml-2">${this.loadingText}</span>`
        : nothing}`
  }

  counterTemplate() {
    const counterStyles = this.counterStyles({
      isActive: this.isActive,
    })

    return html` <span class=${counterStyles}>${this.count}</span> `
  }

  buttonTemplate() {
    const buttonStyles = this.buttonStyles({
      size: this.size,
      color: this.variant,
      isLongPress: this.isLongPress,
      isFullWidth: this.isFullWidth,
      isPressed: this.isPressed,
      isActive: this.isActive,
      isIcon: this.isIcon,
    })

    return html`
      <button
        data-testid="button"
        ?disabled=${this.disabled || this.isLoading}
        type=${this.type}
        class=${cn(buttonStyles, this.customClass)}
        @mousedown=${this.handleMouseDown}
        @touchstart=${this.handleMouseDown}
        @touchend=${this.handleMouseUp}
        @touchcancel=${this.handleMouseUp}
        @mouseup=${this.handleMouseUp}
        @mouseleave=${this.handleMouseUp}
      >
        ${this.isLoading ? this.loadingTemplate() : html`<slot></slot>`}
        ${this.count ? this.counterTemplate() : nothing}
      </button>
    `
  }

  linkTemplate() {
    const buttonStyles = this.buttonStyles({
      size: this.size,
      color: this.variant,
      isLongPress: this.isLongPress,
      isFullWidth: this.isFullWidth,
      isPressed: this.isPressed,
      isIcon: this.isIcon,
    })

    return html`
      <a
        data-testid="link"
        class=${cn(buttonStyles, this.customClass)}
        href=${this.href}
        target=${this.target}
        rel=${this.rel}
      >
        <slot></slot>
      </a>
    `
  }

  render() {
    return html` ${this.isLink ? this.linkTemplate() : this.buttonTemplate()} `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-button': LuksoButton
  }
}
