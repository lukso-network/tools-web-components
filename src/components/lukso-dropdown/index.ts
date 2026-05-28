import { html, nothing, type PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { safeCustomElement } from '@/shared/safe-custom-element'
import '@/components/lukso-icon'
import '@/components/lukso-profile'
import '@/components/lukso-username'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import { cn } from '@/shared/tools'
import { debounceFunction } from '@/shared/tools/debounceFunction'
import { uniqId } from '@/shared/tools/uniq-id'
import style from './style.css?inline'

import type { InputSize } from '@/shared/types'

export type LuksoDropdownOnChangeEventDetail = {
  isOpen: boolean
}

export type LuksoDropdownTrigger = 'click' | 'hover'
export type LuksoDropdownPosition =
  | 'bottom-left'
  | 'bottom-right'
  | 'top-left'
  | 'top-right'
  | 'auto'

/**
 * A floating dropdown panel that positions absolutely relative to its trigger element.
 *
 * @slot - Dropdown content, typically `lukso-dropdown-option` elements.
 */
@safeCustomElement('lukso-dropdown')
export class LuksoDropdown extends TailwindStyledElement(style) {
  @property({ type: String })
  id = ''

  @property({ type: String, attribute: 'trigger-id' })
  triggerId = ''

  @property({ type: Boolean, attribute: 'is-open', reflect: true })
  isOpen = false

  @property({ type: Boolean, attribute: 'is-open-on-outside-click' })
  isOpenOnOutsideClick = false

  @property({ type: String })
  position: LuksoDropdownPosition = 'auto'

  @property({ type: Boolean, attribute: 'is-full-width' })
  isFullWidth = false

  @property({ type: String })
  size: InputSize = 'large'

  @property({ type: String })
  trigger: LuksoDropdownTrigger = 'click'

  @property({ type: Number, attribute: 'max-height', reflect: true })
  maxHeight = undefined

  @property({ type: String, attribute: 'custom-class' })
  customClass = ''

  private boundHandleClick?: (event: Event) => void
  private boundHandleResize?: () => void
  private boundHandleScroll?: () => void
  private _scrollRafId?: number

  private get _win(): Window | undefined {
    return (
      this.ownerDocument.defaultView ??
      (typeof window !== 'undefined' ? window : undefined)
    )
  }

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
        flex flex-col gap-1 overflow-y-auto animate-fade-in animation-duration-200`,
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
            'rounded-8 p-2 mt-1 min-w-[120px] paragraph-inter-12-regular',
        },
        medium: {
          dropdown:
            'rounded-10 p-3 mt-2 min-w-[200px] paragraph-inter-14-regular',
        },
        large: {
          dropdown:
            'rounded-12 p-3 mt-2 min-w-[200px] paragraph-inter-14-regular',
        },
        'x-large': {},
      },
      isRight: {
        true: {
          wrapper: 'right-0',
        },
      },
      isFullWidth: {
        true: { wrapper: 'w-full', dropdown: 'max-w-full w-full' },
        false: { dropdown: 'w-max' },
      },
      hasMaxHeight: {
        true: {},
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
        size: 'large',
        class: { dropdown: 'max-w-[350px]' },
      },
      {
        openTop: true,
        size: 'small',
        class: { wrapper: 'bottom-7 mb-1' },
      },
      {
        openTop: true,
        size: ['large'],
        class: { wrapper: 'bottom-12 mb-2' },
      },
      {
        hasMaxHeight: false,
        size: 'small',
        class: { dropdown: 'max-h-52' },
      },
      {
        hasMaxHeight: false,
        size: 'large',
        class: { dropdown: 'max-h-64' },
      },
    ],
  })

  private handleMouseEnter = () => {
    this.isOpen = true
  }

  private handleMouseLeave = (event: MouseEvent) => {
    const relatedTarget = event.relatedTarget as HTMLElement

    if (relatedTarget?.id === this.id || relatedTarget?.id === this.triggerId) {
      return
    }

    this.isOpen = false
  }

  private resolveDirection(): { isRight: boolean; openTop: boolean } {
    if (this.position === 'auto') {
      const win = this._win
      const triggerElement = this.triggerId
        ? this.ownerDocument.getElementById(this.triggerId)
        : null

      if (triggerElement && win) {
        const rect = triggerElement.getBoundingClientRect()
        return {
          isRight: rect.left + rect.width / 2 > win.innerWidth / 2,
          openTop: rect.top + rect.height / 2 > win.innerHeight / 2,
        }
      }

      return { isRight: false, openTop: false }
    }

    return {
      isRight:
        this.position === 'bottom-right' || this.position === 'top-right',
      openTop: this.position === 'top-left' || this.position === 'top-right',
    }
  }

  private _addAutoListeners(win: Window) {
    this.boundHandleResize = debounceFunction(() => {
      if (this.isOpen) this.requestUpdate()
    })
    win.addEventListener('resize', this.boundHandleResize, { passive: true })

    this.boundHandleScroll = () => {
      if (this.isOpen) {
        if (this._scrollRafId !== undefined) return
        this._scrollRafId = win.requestAnimationFrame(() => {
          this._scrollRafId = undefined
          this.requestUpdate()
        })
      }
    }
    win.addEventListener('scroll', this.boundHandleScroll, {
      capture: true,
      passive: true,
    })
  }

  private _removeAutoListeners(win: Window) {
    if (this.boundHandleResize) {
      win.removeEventListener('resize', this.boundHandleResize)
      this.boundHandleResize = undefined
    }
    if (this.boundHandleScroll) {
      win.removeEventListener('scroll', this.boundHandleScroll, {
        capture: true,
      })
      this.boundHandleScroll = undefined
    }
    if (this._scrollRafId !== undefined) {
      win.cancelAnimationFrame(this._scrollRafId)
      this._scrollRafId = undefined
    }
  }

  updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties)

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

    if (changedProperties.has('position')) {
      const win = this._win
      if (!win) return
      const wasAuto = changedProperties.get('position') === 'auto'
      const isAuto = this.position === 'auto'
      if (wasAuto && !isAuto) this._removeAutoListeners(win)
      else if (!wasAuto && isAuto) this._addAutoListeners(win)
    }
  }

  connectedCallback() {
    super.connectedCallback()

    const win = this._win
    if (!win) return

    this.boundHandleClick = this.handleClick.bind(this)
    win.addEventListener('click', this.boundHandleClick)

    if (this.position === 'auto') {
      this._addAutoListeners(win)
    }

    if (this.trigger === 'hover') {
      const triggerElement = this.ownerDocument.getElementById(this.triggerId)

      if (triggerElement) {
        triggerElement.addEventListener('mouseenter', this.handleMouseEnter)
        triggerElement.addEventListener('mouseleave', this.handleMouseLeave)
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    const win = this._win

    if (win) {
      if (this.boundHandleClick) {
        win.removeEventListener('click', this.boundHandleClick)
      }
      this._removeAutoListeners(win)
    }

    if (this.trigger === 'hover') {
      const triggerElement = this.ownerDocument.getElementById(this.triggerId)

      if (triggerElement) {
        triggerElement.removeEventListener('mouseenter', this.handleMouseEnter)
        triggerElement.removeEventListener('mouseleave', this.handleMouseLeave)
      }
    }
  }

  async willUpdate(changedProperties: PropertyValues<this>) {
    // changedProperties.get('isOpen') is undefined on the first render (no previous value),
    // so skip emitting then to avoid a spurious on-change firing on component mount.
    if (
      changedProperties.has('isOpen') &&
      changedProperties.get('isOpen') !== undefined
    ) {
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

    const hasValidTriggerId = this.triggerId && this.triggerId.trim() !== ''

    if (
      (hasValidTriggerId && element.id === this.triggerId) ||
      this.id === element.id
    ) {
      this.isOpen = !this.isOpen
      return
    }

    if (!this.isOpenOnOutsideClick) {
      this.isOpen = false
    }
  })

  render() {
    const { isRight, openTop } = this.resolveDirection()

    const { wrapper, dropdown } = this.styles({
      openTop,
      size: this.size,
      isRight,
      isFullWidth: this.isFullWidth,
      hasMaxHeight: this.maxHeight !== undefined,
    })

    if (!this.isOpen) {
      return nothing
    }

    return html`<div id=${this.id} class=${wrapper()}>
      <div
        class=${cn(dropdown(), this.customClass)}
        style=${this.maxHeight ? `max-height: ${this.maxHeight}px;` : nothing}
      >
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
