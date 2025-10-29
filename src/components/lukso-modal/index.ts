import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { safeCustomElement } from '@/shared/safe-custom-element'
import { TailwindElement } from '@/shared/tailwind-element'

export type ModalSizes = 'small' | 'medium' | 'full' | 'auto'

@safeCustomElement('lukso-modal')
export class LuksoModal extends TailwindElement {
  @property({ type: Boolean, attribute: 'is-open' })
  isOpen = false

  @property({ type: Boolean, attribute: 'disable-animations' })
  disableAnimations = false

  @property({ type: String })
  size: ModalSizes = 'small'

  private styles = tv({
    slots: {
      wrapper:
        'opacity-0 fixed z-[1011] transition-opacity inset-0 w-screen h-screen overflow-y-auto overscroll-none touch-none',
      overlay:
        'bg-[rgba(196,202,206,0.6)] backdrop-blur-sm fixed inset-0 w-[100vw] h-[100vh] z-[1010]',
      dialog:
        'bg-neutral-98 rounded-12 shadow-neutral-shadow-round-3xl z-[1012] mx-auto',
    },
    variants: {
      isOpen: {
        true: {
          wrapper: 'opacity-100 visible w-[100vw] h-[100vh]',
        },
        false: {
          wrapper: 'hidden',
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
      disableAnimations: {
        false: {
          wrapper: 'animation-duration-300 delay-300',
          overlay: 'animation-duration-300',
        },
      },
    },
    compoundVariants: [
      {
        disableAnimations: false,
        isOpen: true,
        class: {
          wrapper: 'animate-fade-in',
          overlay: 'animate-fade-in',
        },
      },
    ],
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
      disableAnimations: this.disableAnimations,
    })

    return html`
      <div data-testid="modal" class=${wrapper()}>
        <div
          class="min-h-screen flex items-center justify-center pt-6 pb-[120px] sm:pb-6 px-6 w-full"
        >
          <div class=${overlay()} @click=${this.handleBackdropClick}></div>
          <div class=${dialog()}>
            <slot></slot>
          </div>
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
