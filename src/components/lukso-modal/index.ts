import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { TailwindElement } from '@/shared/tailwind-element'

export type ModalSizes = 'small' | 'medium' | 'full' | 'auto'

@customElement('lukso-modal')
export class LuksoModal extends TailwindElement {
  @property({ type: Boolean, attribute: 'is-open' })
  isOpen = false

  @property({ type: String })
  size: ModalSizes = 'small'

  private styles = tv({
    slots: {
      wrapper:
        'opacity-0 fixed z-[1000] transition-opacity top-0 left-0 p-6  animation-duration-200',
      overlay:
        'bg-[rgba(196,202,206,0.6)] backdrop-blur-sm fixed top-0 left-0 w-[100vw] h-[100vh] z-[999] animate-fade-in animation-duration-200',
      dialog:
        'bg-neutral-98 rounded-12 shadow-neutral-drop-shadow-3xl z-[1001]',
    },
    variants: {
      isOpen: {
        true: {
          wrapper:
            'flex opacity-100 visible items-center justify-center w-[100vw] h-[100vh] animate-fade-in',
        },
        false: {
          wrapper: 'invisible',
        },
      },
      size: {
        small: {
          dialog: 'w-[352px]',
        },
        medium: {
          dialog: 'w-[849px]',
        },
        full: {
          dialog: 'w-full',
        },
        auto: {},
      },
    },
  })

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
    const { wrapper, overlay, dialog } = this.styles({
      isOpen: this.isOpen,
      size: this.size,
    })

    return html`
      <div data-testid="modal" class=${wrapper()}>
        <div class=${overlay()} @click=${this.handleBackdropClick}></div>
        <div class=${dialog()}>
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
