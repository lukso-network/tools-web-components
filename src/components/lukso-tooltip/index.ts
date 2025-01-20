import { type PropertyValues, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import tippy from 'tippy.js'
import { tv } from 'tailwind-variants'
import { styleMap } from 'lit/directives/style-map.js'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.scss?inline'

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

export type TooltipOption = {
  id?: string
  value: string
  text: string
}

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

  @property({ type: String })
  options = ''

  @property({ type: Boolean, attribute: 'show-arrow' })
  showArrow = true

  @property({ type: Number, attribute: 'show-delay' })
  showDelay = 300

  @property({ type: Number, attribute: 'hide-delay' })
  hideDelay = 300

  @state()
  showCopy = false

  @state()
  optionsParsed: TooltipOption[] = []

  private tooltipInstance = undefined

  private styles = tv({
    slots: {
      tooltip: 'hidden',
      trigger: 'cursor-pointer flex flex-col items-center',
      options: 'rounded-4 hover:bg-neutral-95',
    },
    variants: {
      hasNoText: {
        true: {
          trigger: 'cursor-default',
        },
      },
    },
  })

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

    if (!this.text && !this.options) {
      return
    }

    this.tooltipInstance = tippy(trigger, {
      content: tooltip.innerHTML,
      allowHTML: true,
      arrow: this.showArrow,
      animation: 'fade',
      interactive: true,
      appendTo: () => document.body,
      trigger: this.trigger,
      placement: this.placement,
      maxWidth: this.maxWidth,
      theme: `${this.variant}-${this.size}`,
      offset: [0, this.offset],
      hideOnClick: this.hideOnClickCheck(),
      delay: [this.showDelay, this.hideDelay],
      aria: {
        content: null,
        expanded: false,
      },
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

    if (changedProperties.has('options') && !!this.options) {
      try {
        this.optionsParsed = JSON.parse(this.options) as TooltipOption[]
      } catch (error: unknown) {
        console.warn('Could not parse options', error)
      }
    }

    this.initTooltip()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.tooltipInstance?.destroy()
  }

  private optionsTemplate(styles: { options: () => string }) {
    // because of the bug in the getting styles properly for options we pass them as style property
    return html`<ul>
      ${Object.entries(this.optionsParsed)?.map(
        option =>
          html`<li
            class=${styles.options()}
            style=${styleMap({
              padding: '4px 8px',
              cursor: 'pointer',
            })}
            onClick="navigator.clipboard.writeText('${option[1].value}')"
          >
            ${option[1].text}
          </li>`
      )}
    </ul>`
  }

  render() {
    const styles = this.styles({
      hasNoText: !this.text,
    })

    return html`
      <div id="tooltip" role="tooltip" class=${styles.tooltip()}>
        ${this.options ? this.optionsTemplate(styles) : this.text}
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
              class=${styles.trigger()}
              @click=${this.handleClick}
            >
              <slot></slot>
            </div>
          </lukso-tooltip>`
        : html`<div
            id="trigger"
            class=${styles.trigger()}
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
