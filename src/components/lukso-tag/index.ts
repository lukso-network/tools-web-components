import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { customStyleMap } from '@/shared/directives'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.scss?inline'

export type TagSizes = 'x-small' | 'small' | 'large'

@customElement('lukso-tag')
export class LuksoTag extends TailwindStyledElement(style) {
  @property({ type: String })
  size: TagSizes = 'small'

  @property({ type: Boolean, attribute: 'is-rounded' })
  isRounded = false

  @property({ type: String, attribute: 'background-color' })
  backgroundColor = ''

  @property({ type: String, attribute: 'border-color' })
  borderColor = ''

  @property({ type: String, attribute: 'text-color' })
  textColor = ''

  private tagStyles = tv({
    base: 'inline-flex items-center justify-center border border-neutral-20 text-neutral-20 px-2 whitespace-nowrap',
    variants: {
      size: {
        'x-small':
          'font-inter text-8 font-500 leading-20 h-[20px] px-1 rounded-4',
        small: 'paragraph-inter-12-medium h-[28px] px-2 rounded-8',
        large: 'paragraph-inter-14-medium h-[34px] px-4 rounded-8',
      },
      isRounded: {
        true: 'rounded-[56px]',
      },
    },
    compoundVariants: [
      {
        size: 'small',
        isRounded: true,
        class: 'px-3',
      },
      {
        size: 'x-small',
        isRounded: true,
        class: 'px-2',
      },
    ],
  })

  private resolveBorderColor() {
    if (this.borderColor) {
      return this.borderColor
    }

    if (this.backgroundColor) {
      return this.backgroundColor
    }
  }

  render() {
    const tagStyles = this.tagStyles({
      size: this.size,
      isRounded: this.isRounded,
    })

    return html`
      <div
        data-testid="tag"
        class=${tagStyles}
        style=${customStyleMap({
          [`background-color: var(--${this.backgroundColor})`]:
            !!this.backgroundColor,
          [`border-color: var(--${this.resolveBorderColor()})`]:
            !!this.resolveBorderColor(),
          [`color: var(--${this.textColor})`]: !!this.textColor,
        })}
      >
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-tag': LuksoTag
  }
}
