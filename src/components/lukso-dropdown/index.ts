import { html, nothing, type PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import '@/components/lukso-icon'
import '@/components/lukso-profile'
import '@/components/lukso-username'
import style from './style.scss?inline'
import { uniqId } from '@/shared/tools/uniq-id'

import type { InputSize } from '@/shared/types'

export type LuksoDropdownOnChangeEventDetail = {
  isOpen: boolean
}

@customElement('lukso-dropdown')
export class LuksoDropdown extends TailwindStyledElement(style) {
  @property({ type: String })
  id = ''

  @property({ type: String, attribute: 'trigger-id' })
  triggerId = ''

  @property({ type: Boolean, attribute: 'is-open', reflect: true })
  isOpen = false

  @property({ type: Boolean, attribute: 'is-open-on-outside-click' })
  isOpenOnOutsideClick = false

  @property({ type: Boolean, attribute: 'open-top' })
  openTop = false

  @property({ type: Boolean, attribute: 'is-right' })
  isRight = false

  @property({ type: Boolean, attribute: 'is-full-width' })
  isFullWidth = false

  @property({ type: String })
  size: InputSize = 'medium'

  constructor() {
    super()

    if (!this.id) {
      this.id = uniqId()
    }
  }

  private styles = tv({
    base: `bg-neutral-100 border w-full border-neutral-90 shadow-1xl z-50
      flex absolute flex-col gap-1 overflow-y-auto max-h-64 `,
    variants: {
      openTop: {
        true: 'bottom-[48px] mb-2 mt-0',
      },
      size: {
        small: 'rounded-8 p-2 mt-1 min-w-[120px] paragraph-inter-12-regular',
        medium: 'rounded-12 p-3 mt-2 min-w-[200px] paragraph-inter-14-regular',
      },
      isRight: {
        true: 'right-0',
      },
      isFullWidth: {
        true: 'w-full',
      },
    },
    compoundVariants: [
      {
        isFullWidth: false,
        size: 'small',
        class: 'max-w-[200px]',
      },
      {
        isFullWidth: false,
        size: 'medium',
        class: 'max-w-[300px]',
      },
    ],
  })

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('click', this.handleClick.bind(this))
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('click', this.handleClick)
  }

  async willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('isOpen')) {
      await this.updateComplete
      const changeEvent = new CustomEvent<LuksoDropdownOnChangeEventDetail>(
        'on-change',
        {
          detail: {
            isOpen: this.isOpen,
          },
          bubbles: false,
          composed: true,
        }
      )
      this.dispatchEvent(changeEvent)
    }
  }

  private handleClick(event: Event) {
    const element = event.target as HTMLElement

    // if we click on trigger or dropdown itself we toggle the dropdown
    if (element.id === this.triggerId || this.id === element.id) {
      this.isOpen = !this.isOpen
      return
    }

    // if we click outside the dropdown we close it
    if (!this.isOpenOnOutsideClick) {
      this.isOpen = false
    }
  }

  render() {
    const styles = this.styles({
      openTop: this.openTop,
      size: this.size,
      isRight: this.isRight,
      isFullWidth: this.isFullWidth,
    })

    if (!this.isOpen) {
      return nothing
    }

    return html`<div class="${styles}"><slot></slot></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-dropdown': LuksoDropdown
  }
}
