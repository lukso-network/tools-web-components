import { type PropertyValues, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import tippy from 'tippy.js'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.scss?inline'
import { customClassMap } from '@/shared/directives'

export type TooltipVariant = 'dark' | 'light' | 'success' | 'danger' | 'white'
export type TooltipSize = 'medium' | 'large'
export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'auto'
  | 'auto-start'
  | 'auto-end'
export type TooltipTrigger = 'mouseenter' | 'click' | 'manual'

@customElement('lukso-tooltip')
export class LuksoTooltip extends TailwindStyledElement(style) {
  @property({ type: String })
  variant: TooltipVariant = 'light'

  @property({ type: String })
  size: TooltipSize = 'medium'

  @property({ type: String })
  placement: TooltipPlacement = 'top'

  @property({ type: String })
  trigger: TooltipTrigger = 'mouseenter'

  @property({ type: String })
  text = ''

  @property({ type: Number, attribute: 'max-width' })
  maxWidth = 300

  @property({ type: Boolean })
  show = false

  @property({ type: String, attribute: 'hide-on-click' })
  hideOnClick = 'true'

  @property({ type: Boolean, attribute: 'is-clipboard-copy' })
  isClipboardCopy = false

  @property({ type: String, attribute: 'copy-text' })
  copyText = ''

  @property({ type: String, attribute: 'copy-value' })
  copyValue = ''

  @property({ type: Number })
  offset = 10

  @state()
  showCopy = false

  private defaultTooltipStyles = 'bg-neutral-20 p-4 hidden'

  private tooltipInstance = undefined

  private hideOnClickCheck() {
    if (this.hideOnClick === 'toggle') {
      return this.hideOnClick
    }

    if (this.hideOnClick === 'true') {
      return true
    }

    if (this.hideOnClick === 'false') {
      return false
    }
  }

  private initTooltip() {
    const trigger = this.shadowRoot.getElementById('trigger') as HTMLElement
    const tooltip = this.shadowRoot.getElementById('tooltip') as HTMLElement

    // if instance already exists, destroy it
    if (this.tooltipInstance) {
      this.tooltipInstance.destroy()
      this.tooltipInstance = undefined
    }

    if (!this.text) {
      return
    }

    this.tooltipInstance = tippy(trigger, {
      content: tooltip.innerHTML,
      allowHTML: true,
      arrow: true,
      animation: 'fade',
      interactive: true,
      appendTo: () => document.body,
      trigger: this.trigger,
      placement: this.placement,
      maxWidth: this.maxWidth,
      theme: `${this.variant}-${this.size}`,
      offset: [0, this.offset],
      hideOnClick: this.hideOnClickCheck(),
    })
  }

  private handleClick() {
    if (!this.isClipboardCopy || !this.copyText || !this.copyValue) {
      return
    }

    this.showCopy = true
    navigator.clipboard.writeText(this.copyValue)

    setTimeout(() => {
      this.showCopy = false
    }, 1000)
  }

  async willUpdate(changedProperties: PropertyValues<this>) {
    await this.updateComplete // wait for the component to be rendered

    // when manually trigger tooltip
    if (changedProperties.has('show') && this.trigger === 'manual') {
      if (this.show) {
        !this.tooltipInstance && this.initTooltip()
        this.tooltipInstance.show()
      } else {
        this.tooltipInstance?.hide()
      }
      return
    }

    this.initTooltip()
  }

  render() {
    return html`
      <div
        id="tooltip"
        role="tooltip"
        class=${customClassMap({
          [this.defaultTooltipStyles]: true,
        })}
      >
        ${this.text}
      </div>
      ${this.isClipboardCopy
        ? html`<lukso-tooltip
            variant=${this.variant}
            size=${this.size}
            placement=${this.placement}
            max-width=${this.maxWidth}
            offset=${this.offset}
            trigger="manual"
            ?show=${this.showCopy ? true : undefined}
            text=${this.copyText}
          >
            <div
              id="trigger"
              class="cursor-pointer flex flex-col items-center"
              @click=${this.handleClick}
            >
              <slot></slot>
            </div>
          </lukso-tooltip>`
        : html`<div
            id="trigger"
            class="cursor-pointer flex flex-col items-center"
            @click=${this.handleClick}
          >
            <slot></slot>
          </div>`}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-tooltip': LuksoTooltip
  }
}
