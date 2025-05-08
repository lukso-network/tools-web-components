import { html, nothing, type PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import '@/components/lukso-icon'
import '@/components/lukso-profile'
import '@/components/lukso-username'
import style from './style.scss?inline'
import { uniqId } from '@/shared/tools/uniq-id'
import { debounceFunction } from '@/shared/tools/debounceFunction'

import type { InputSize } from '@/shared/types'

export type LuksoDropdownOnChangeEventDetail = {
  isOpen: boolean
}

export type LuksoDropdownTrigger = 'click' | 'hover'

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

  @property({ type: String })
  trigger: LuksoDropdownTrigger = 'click'

  constructor() {
    super()

    if (!this.id) {
      this.id = uniqId()
    }
  }

  private styles = tv({
    slots: {
      wrapper: 'absolute z-50',
      dropdown: `bg-neutral-100 border border-neutral-90 shadow-1xl
        flex flex-col gap-1 overflow-y-auto w-[max-content] animate-fade-in animation-duration-200`,
    },
    variants: {
      openTop: {
        true: {
          wrapper: 'mt-0',
        },
      },
      size: {
        small: {
          dropdown:
            'rounded-8 p-2 mt-1 min-w-[120px] paragraph-inter-12-regular max-h-52',
        },
        medium: {
          dropdown:
            'rounded-12 p-3 mt-2 min-w-[200px] paragraph-inter-14-regular max-h-64',
        },
      },
      isRight: {
        true: {
          wrapper: 'right-0',
        },
      },
      isFullWidth: {
        true: { wrapper: 'w-full', dropdown: 'w-full' },
      },
    },
    compoundVariants: [
      {
        isFullWidth: false,
        size: 'small',
        class: { dropdown: 'max-w-[200px]' },
      },
      {
        isFullWidth: false,
        size: 'medium',
        class: { dropdown: 'max-w-[300px]' },
      },
      {
        openTop: true,
        size: 'small',
        class: { wrapper: 'bottom-7 mb-1' },
      },
      {
        openTop: true,
        size: 'medium',
        class: { wrapper: 'bottom-12 mb-2' },
      },
    ],
  })

  private handleMouseEnter = () => {
    this.isOpen = true
  }

  private handleMouseLeave = (event: MouseEvent) => {
    const relatedTarget = event.relatedTarget as HTMLElement

    // if we are leaving the trigger and entering the dropdown we don't want to close it
    if (relatedTarget?.id === this.id || relatedTarget?.id === this.triggerId) {
      return
    }

    this.isOpen = false
  }

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties)

    // when dropdown is open we need to add event listeners
    if (changedProperties.has('isOpen') && this.trigger === 'hover') {
      const dropdownElement = this.shadowRoot?.getElementById(this.id)

      if (this.isOpen && dropdownElement) {
        dropdownElement.addEventListener('mouseenter', this.handleMouseEnter)
        dropdownElement.addEventListener('mouseleave', this.handleMouseLeave)
      } else if (dropdownElement) {
        dropdownElement.removeEventListener('mouseenter', this.handleMouseEnter)
        dropdownElement.removeEventListener('mouseleave', this.handleMouseLeave)
      }
    }
  }

  connectedCallback() {
    super.connectedCallback()

    window.addEventListener('click', this.handleClick.bind(this))

    if (this.trigger === 'hover') {
      const triggerElement = document.getElementById(this.triggerId)

      if (triggerElement) {
        triggerElement.addEventListener('mouseenter', this.handleMouseEnter)
        triggerElement.addEventListener('mouseleave', this.handleMouseLeave)
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('click', this.handleClick)

    if (this.trigger === 'hover') {
      const triggerElement = document.getElementById(this.triggerId)

      if (triggerElement) {
        triggerElement.removeEventListener('mouseenter', this.handleMouseEnter)
        triggerElement.removeEventListener('mouseleave', this.handleMouseLeave)
      }
    }
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

  private handleClick = debounceFunction((event: Event) => {
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
  })

  render() {
    const { wrapper, dropdown } = this.styles({
      openTop: this.openTop,
      size: this.size,
      isRight: this.isRight,
      isFullWidth: this.isFullWidth,
    })

    if (!this.isOpen) {
      return nothing
    }

    return html`<div id=${this.id} class=${wrapper()}>
      <div class=${dropdown()}>
        <slot></slot>
      </div>
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-dropdown': LuksoDropdown
  }
}
