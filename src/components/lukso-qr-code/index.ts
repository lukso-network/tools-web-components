import { html } from 'lit'
import { property, state } from 'lit/decorators.js'
// Dynamic import of qr-code-styling to avoid bundling it at module load time
// qr-code-styling is a CommonJS module that needs special handling
let QRCodeStyling: typeof import('qr-code-styling').default | null = null

import { safeCustomElement } from '@/shared/safe-custom-element'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.scss?inline'
import '@/components/lukso-icon'
import { cn } from '@/shared/tools'

import type { Options } from 'qr-code-styling/lib/types'

export type QRCodeOptions = Options

const DEFAULT_QR_OPTIONS: QRCodeOptions = {
  dotsOptions: {
    color: '#243542',
    type: 'rounded',
  },
  backgroundOptions: {
    color: '#f8fafb',
  },
  cornersSquareOptions: {
    type: 'extra-rounded',
  },
  imageOptions: {
    margin: 5,
  },
}

@safeCustomElement('lukso-qr-code')
export class LuksoQrCode extends TailwindStyledElement(style) {
  @property({ type: String, reflect: true })
  value = ''

  @property({ type: Number, reflect: true })
  size: number | undefined = 280

  @property({ type: String, reflect: true })
  image: string | undefined = undefined

  @property({ type: Object })
  options: Partial<QRCodeOptions> | undefined = {}

  @property({ type: String, attribute: 'custom-class', reflect: true })
  customClass: string | undefined = undefined

  @state()
  private isLoading = true

  private qrCodeInstance: QRCodeStyling | null = null

  protected updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties)

    if (changedProperties.has('value') && this.value) {
      // Fire-and-forget async call - errors are handled internally
      this.generateQrCode().catch(err => {
        console.error('Failed to generate QR code:', err)
        this.isLoading = false
      })
    }
  }

  private async generateQrCode() {
    const container = this.shadowRoot?.querySelector('.qr-code-container')
    if (!container) return

    this.isLoading = true

    // Lazy load qr-code-styling only when needed
    if (!QRCodeStyling) {
      try {
        const module = await import('qr-code-styling')
        QRCodeStyling = module.default
      } catch (e) {
        console.error('qr-code-styling not available:', e)
        this.isLoading = false
        return
      }
    }

    // Clean up previous instance
    if (this.qrCodeInstance) {
      this.qrCodeInstance = null
    }

    // Create new QR code instance with merged options
    this.qrCodeInstance = new QRCodeStyling({
      ...DEFAULT_QR_OPTIONS,
      ...this.options,
      width: this.size,
      height: this.size,
      type: 'svg',
      data: this.value,
      image: this.image || undefined,
    })

    // Clear container and append new QR code
    ;(container as HTMLElement).innerHTML = ''
    this.qrCodeInstance.append(container as HTMLElement)

    // Mark as loaded
    this.isLoading = false
  }

  protected render() {
    return html`
      <div
        class="${cn(
          `relative flex items-center justify-center ${this.customClass}`
        )}"
      >
        <div
          class="qr-code-container flex items-center justify-center"
          style="min-height: ${this.size}px; min-width: ${this.size}px"
        ></div>
        <div class="absolute inset-0 flex items-center justify-center">
          ${this.isLoading
            ? html`<div
                class="flex items-center justify-center"
                style="min-height: ${this.size}px"
              >
                <lukso-icon
                  name="progress-indicator-alt"
                  size="x-large"
                ></lukso-icon>
              </div>`
            : html`<slot></slot>`}
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-qr-code': LuksoQrCode
  }
}
