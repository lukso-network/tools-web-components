import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { TailwindElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'

export type ModalSizes = 'small' | 'medium' | 'full' | 'auto'

@customElement('lukso-modal')
export class LuksoModal extends TailwindElement {
  @property({ type: Boolean, attribute: 'is-open' })
  isOpen = false

  @property({ type: String })
  size: ModalSizes = 'small'

  private wrapperStyles = `opacity-0 fixed z-[1000] transition-opacity top-0 left-0 p-6  animation-duration-200`
  private openStyles = `flex opacity-100 visible items-center justify-center w-[100vw] h-[100vh] animate-fade-in`
  private overlayStyles = `bg-[rgba(36,53,66,0.8)] backdrop-blur-sm fixed top-0 left-0 w-[100vw] h-[100vh] z-[999]`
  private dialogStyles = `bg-neutral-98 rounded-12 shadow-neutral-drop-shadow-3xl z-[1001]`

  private close() {
    this.isOpen = false
  }

  private async handleBackdropClick() {
    await this.updateComplete
    const clickEvent = new CustomEvent('on-backdrop-click', {
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(clickEvent)
  }

  render() {
    return html`
      <div
        data-testid="modal"
        class=${customClassMap({
          [this.wrapperStyles]: true,
          [this.openStyles]: this.isOpen,
          ['invisible']: !this.isOpen,
        })}
      >
        <div
          class=${customClassMap({
            [this.overlayStyles]: true,
          })}
          @click=${this.handleBackdropClick}
        ></div>
        <div
          class=${customClassMap({
            [this.dialogStyles]: true,
            ['w-[352px]']: this.size === 'small',
            ['w-[849px]']: this.size === 'medium',
            ['w-full']: this.size === 'full',
          })}
        >
          <slot></slot>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-modal': LuksoModal
  }
}
