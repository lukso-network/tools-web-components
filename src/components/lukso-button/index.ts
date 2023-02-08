import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { TailwindElement } from '@/shared/tailwind-element/index.js'
import { customClassMap } from '@/shared/directives/custom-class-map/index.js'

export type ButtonVariants = 'primary' | 'secondary' | 'landing' | 'link'
export type ButtonSizes = 'small' | 'medium'

@customElement('lukso-button')
export class LuksoButton extends TailwindElement {
  @property({ type: String })
  variant: ButtonVariants = 'primary'

  @property({ type: String })
  size: ButtonSizes = 'medium'

  @property({ type: Boolean })
  disabled = false

  @property({ type: Boolean, attribute: 'is-full-width' })
  isFullWidth = false

  private defaultStyles = `flex justify-center items-center relative
    border border-solid cursor-pointer transition duration-0
    hover:duration-250 active:scale-98 active:duration-25
    disabled:shadow-none disabled:cursor-not-allowed disabled:scale-100`

  private secondaryStyles = `bg-neutral-100 border-neutral-90 text-neutral-20
    disabled:bg-neutral-90 disabled:border-neutral-90 disabled:text-neutral-100
    hover:shadow-button-hover-secondary active:shadow-button-press-secondary`

  private primaryStyles = `bg-neutral-20 border-neutral-20 text-neutral-100
    disabled:bg-neutral-90 disabled:border-neutral-90
    hover:shadow-button-hover-primary hover:bg-neutral-25 hover:border-neutral-25
    active:shadow-button-press-primary active:bg-neutral-25 active:border-neutral-25`

  private landingStyles = `bg-purple-51 border-purple-51 text-neutral-100
    disabled:bg-neutral-90 disabled:border-neutral-90
    hover:shadow-button-hover-primary hover:bg-purple-58 hover:border-purple-58
    active:shadow-button-press-primary`

  private linkStyles = `bg-transparent border-none text-neutral-20
    hover:text-neutral-35
    active:text-neutral-35 active:scale-100
    disabled:text-neutral-90`

  private mediumSize = `py-3 px-6 paragraph-16-semi-bold rounded-xl`

  private smallSize = `py-1 px-3 paragraph-12-regular rounded-lg hover:shadow-none active:shadow-none`

  render() {
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
          [this.linkStyles]: this.variant === 'link',
          ['w-full']: this.isFullWidth,
        })}
      >
        <slot></slot>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-button': LuksoButton
  }
}
