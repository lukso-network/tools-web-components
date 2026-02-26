import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'
import { withTheme } from '@lukso/core'

import style from './style.css?inline'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import { safeCustomElement } from '@/shared'

export type ModalSizes = 'small' | 'medium' | 'full' | 'auto'

@safeCustomElement('lukso-modal')
export class LuksoModal extends withTheme(TailwindStyledElement(style)) {
  @property({ type: Boolean, attribute: 'is-open' })
  isOpen = false

  @property({ type: Boolean, attribute: 'disable-animations' })
  disableAnimations = false

  @property({ type: String })
  size: ModalSizes = 'small'

  @property({ type: Boolean, attribute: 'has-bottom-padding' })
  hasBottomPadding = false

  private styles = tv({
    slots: {
      wrapper:
        'opacity-0 fixed z-[1011] transition-opacity inset-0 w-screen h-screen overflow-y-auto overscroll-none scrolling-touch touch-pan-y isolate',
      inner: 'min-h-screen flex items-center justify-center px-6 pt-6 w-full',
      overlay: 'absolute inset-0 w-full h-full z-[1010]',
      dialog: 'shadow-neutral-shadow-round-3xl z-[1012] mx-auto',
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
      hasBottomPadding: {
        true: {
          inner: 'pb-[120px]',
        },
        false: {
          inner: 'pb-6',
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
    const { wrapper, overlay, dialog, inner } = this.styles({
      isOpen: this.isOpen,
      size: this.size,
      disableAnimations: this.disableAnimations,
      hasBottomPadding: this.hasBottomPadding,
    })

    return html`
      <div data-testid="modal" class=${wrapper()}>
        <div class=${inner()}>
          <div class=${overlay()} @click=${this.handleBackdropClick}></div>
          <div
            class=${dialog()}
            style="background: var(--lukso-modal-resolved-bg); border-radius: var(--lukso-modal-border-radius, 12px);"
          >
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
