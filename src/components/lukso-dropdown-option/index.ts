import { html, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { safeCustomElement } from '@/shared/safe-custom-element'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import '@/components/lukso-icon'
import '@/components/lukso-tooltip'
import style from './style.css?inline'

import type { InputSize } from '@/shared/types'

/**
 * A single option row inside a `lukso-dropdown`. Does not emit its own events — parent handles clicks.
 *
 * @slot - Option label content (text, icons, profile elements, etc.).
 * @slot right - Optional trailing content (icon, tooltip trigger, badge, etc.).
 */
@safeCustomElement('lukso-dropdown-option')
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
  size: InputSize = 'large'

  @property({ type: String, attribute: 'secondary-label' })
  secondaryLabel = ''

  @property({ type: String })
  tooltip = ''

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
        small: 'paragraph-inter-12-regular rounded-4 px-2 min-h-7',
        medium: 'paragraph-inter-14-regular rounded-8 px-3 min-h-[38px]',
        large: 'paragraph-inter-14-regular rounded-8 px-3 min-h-[38px]',
        'x-large': '',
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
        isGroup: true,
        size: 'large',
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
      ${this.secondaryLabel
        ? html`<span class="paragraph-inter-14-regular text-neutral-60 shrink-0"
            >${this.secondaryLabel}</span
          >`
        : nothing}
      <div class="ml-auto shrink-0 flex items-center">
        ${this.tooltip
          ? html`<lukso-tooltip text="${this.tooltip}">
              <lukso-icon name="information" size="small"></lukso-icon>
            </lukso-tooltip>`
          : nothing}
        <slot name="right"></slot>
      </div>
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-dropdown-option': LuksoDropdownOption
  }
}
