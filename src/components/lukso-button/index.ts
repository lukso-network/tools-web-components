import { html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'
import style from './style.scss?inline'

export type ButtonVariant = 'primary' | 'secondary' | 'landing' | 'text'
export type ButtonSize = 'small' | 'medium'
export type LinkTarget = '_blank' | '_self' | '_parent' | '_top'

const LONG_PRESS_ANIMATION_DURATION_IN_MS = 2000

@customElement('lukso-button')
export class LuksoButton extends TailwindStyledElement(style) {
  @property({ type: String })
  variant: ButtonVariant = 'primary'

  @property({ type: String })
  size: ButtonSize = 'medium'

  @property({ type: Boolean })
  disabled = false

  @property({ type: Boolean, attribute: 'is-full-width' })
  isFullWidth = false

  @property({ type: Boolean, attribute: 'is-long-press' })
  isLongPress = false

  @property({ type: Boolean, attribute: 'is-link' })
  isLink = false

  @property({ type: String })
  href = ''

  @property({ type: String })
  target: LinkTarget = '_blank'

  @property({ type: String })
  rel = ''

  @state()
  private isPressed = false

  @state()
  private noTransition = false

  @state()
  private timer = 0

  private defaultStyles = `flex justify-center items-center relative
    border border-solid cursor-pointer transition duration-0
    hover:duration-250 active:scale-98 active:duration-25
    disabled:shadow-none disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-50`

  private secondaryStyles = `bg-neutral-100 border-neutral-90 text-neutral-20
    hover:shadow-button-hover-secondary active:shadow-button-press-secondary`

  private primaryStyles = `bg-neutral-20 border-neutral-20 text-neutral-100
    disabled:hover:!bg-neutral-20 disabled:hover:!border-neutral-20
    hover:shadow-button-hover-primary hover:bg-neutral-25 hover:border-neutral-25
    active:shadow-button-press-primary active:bg-neutral-25 active:border-neutral-25
    before:bg-neutral-10`

  private landingStyles = `bg-purple-51 border-purple-51 text-neutral-100
    disabled:hover:!bg-purple-51 disabled:hover:!border-purple-51
    hover:shadow-button-hover-primary hover:bg-purple-58 hover:border-purple-58
    active:shadow-button-press-primary
    before:bg-purple-51`

  private textStyles = `bg-transparent border-none text-neutral-20
    hover:text-neutral-35
    active:text-neutral-35 active:scale-100
    disabled:text-neutral-90`

  private linkStyles = `!p-0 active:!scale-100 underline text-purple-51 hover:text-purple-41`

  private longPressStyles = `relative overflow-hidden z-[1] active:outline-0
    before:absolute before:content-[''] before:top-0 before:left-0 before:w-0 before:h-[48px]
    before:transition-all before:duration-[2000ms] before:z-[-1] before:rounded-0`

  private pressedStyles = `before:w-full before:z-[-1]`

  private noTransitionStyles = `before:transition-none`

  private mediumSize = `py-3 px-6 paragraph-inter-16-semi-bold rounded-12`

  private smallSize = `py-1 px-3 paragraph-inter-12-regular rounded-8 hover:shadow-none active:shadow-none`

  private handleMouseDown() {
    // Additional check for using long press on non-primary and non-landing variants
    if (this.variant !== 'primary' && this.variant !== 'landing') {
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

  buttonTemplate() {
    return html`
      <button
        data-testid="button"
        ?disabled=${this.disabled}
        class=${customClassMap({
          [this.defaultStyles]: true,
          [this.mediumSize]: this.size === 'medium',
          [this.smallSize]: this.size === 'small',
          [this.primaryStyles]: this.variant === 'primary',
          [this.secondaryStyles]: this.variant === 'secondary',
          [this.landingStyles]: this.variant === 'landing',
          [this.textStyles]: this.variant === 'text',
          ['w-full']: this.isFullWidth,
          [this.longPressStyles]: this.isLongPress,
          [this.pressedStyles]: this.isPressed,
          [this.noTransitionStyles]: this.noTransition,
        })}
        @mousedown=${this.handleMouseDown}
        @mouseup=${this.handleMouseUp}
        @mouseleave=${this.handleMouseUp}
      >
        <slot></slot>
      </button>
    `
  }

  linkTemplate() {
    return html`
      <a
        data-testid="link"
        class=${customClassMap({
          [this.defaultStyles]: true,
          [this.mediumSize]: this.size === 'medium',
          [this.smallSize]: this.size === 'small',
          [this.primaryStyles]: this.variant === 'primary',
          [this.secondaryStyles]: this.variant === 'secondary',
          [this.landingStyles]: this.variant === 'landing',
          [this.textStyles]: this.variant === 'text',
          [this.linkStyles]: this.variant === 'text',
          ['w-full']: this.isFullWidth,
        })}
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
