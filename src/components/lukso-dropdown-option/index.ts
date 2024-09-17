import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.scss?inline'

import type { InputSize } from '@/shared/types'

@customElement('lukso-dropdown-option')
export class LuksoDropdownOption extends TailwindStyledElement(style) {
  @property({ type: Boolean, attribute: 'is-readonly' })
  isReadonly = false

  @property({ type: Boolean, attribute: 'is-disabled' })
  isDisabled = false

  @property({ type: Boolean, attribute: 'is-selected' })
  isSelected = false

  @property({ type: Boolean, attribute: 'is-active' })
  isActive = false

  @property({ type: Boolean, attribute: 'is-group' })
  isGroup = false

  @property({ type: String })
  size: InputSize = 'medium'

  private styles = tv({
    base: `text-neutral-20 cursor-pointer select-none
      whitespace-nowrap flex items-center truncate gap-2`,
    variants: {
      isSelected: {
        true: 'bg-neutral-95',
      },
      isActive: {
        true: 'bg-neutral-98',
      },
      isGroup: {
        true: '',
      },
      size: {
        small: 'paragraph-inter-12-regular rounded-4 px-1 min-h-[28px]',
        medium: 'paragraph-inter-14-regular rounded-8 px-2 min-h-[38px]',
      },
      isDisabled: {
        true: 'opacity-60 cursor-not-allowed',
      },
      isReadonly: {
        true: 'cursor-not-allowed',
        false: 'hover:bg-neutral-98',
      },
    },
    compoundVariants: [
      {
        isGroup: true,
        size: 'small',
        class: 'pl-3',
      },
      {
        isGroup: true,
        size: 'medium',
        class: 'pl-4',
      },
      {
        isReadonly: false,
        isSelected: true,
        class: 'hover:bg-neutral-95',
      },
    ],
  })

  render() {
    const styles = this.styles({
      isSelected: this.isSelected,
      isActive: this.isActive,
      size: this.size,
      isGroup: this.isGroup,
      isDisabled: this.isDisabled,
      isReadonly: this.isReadonly,
    })

    return html`<div class="${styles}">
      <slot></slot>
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-dropdown-option': LuksoDropdownOption
  }
}
