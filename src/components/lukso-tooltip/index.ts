import { type PropertyValues, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import tippy from 'tippy.js'
import { tv } from 'tailwind-variants'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.scss?inline'
import '@/components/lukso-sanitize'

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

  @property({ type: Boolean, attribute: 'show-arrow' })
  showArrow = true

  @property({ type: Number, attribute: 'show-delay' })
  showDelay = 300

  @property({ type: Number, attribute: 'hide-delay' })
  hideDelay = 300

  @state()
  showCopy = false

  private tooltipInstance = undefined

  private styles = tv({
    slots: {
      tooltip: 'hidden',
      trigger: 'cursor-pointer flex flex-col items-center',
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

    if (!this.text) {
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
        this.tooltipInstance?.show()
      } else {
        this.tooltipInstance?.hide()
      }
      return
    }

    if (changedProperties.has('text')) {
      if (this.text !== '') {
        this.initTooltip()
      } else {
        this.tooltipInstance?.destroy()
        this.tooltipInstance = undefined
      }
    }
  }

  connectedCallback() {
    super.connectedCallback()

    setTimeout(() => {
      const textSlot = this.shadowRoot?.querySelector(
        'slot[name="text"]'
      ) as HTMLSlotElement | null

      if (textSlot) {
        textSlot.addEventListener('slotchange', this.handleSlotChange)
        this.handleSlotChange()
      }
    }, 0)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.tooltipInstance?.destroy()

    const textSlot = this.shadowRoot?.querySelector(
      'slot[name="text"]'
    ) as HTMLSlotElement | null
    if (textSlot) {
      textSlot.removeEventListener('slotchange', this.handleSlotChange)
    }
  }

  private handleSlotChange = () => {
    const textSlot = this.shadowRoot?.querySelector(
      'slot[name="text"]'
    ) as HTMLSlotElement | null

    if (textSlot) {
      setTimeout(() => {
        const assignedNodes = textSlot.assignedNodes({ flatten: true })
        const html = assignedNodes
          .map(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              return (node as HTMLElement).innerHTML
            }
            if (node.nodeType === Node.TEXT_NODE) {
              return node.textContent?.trim() || ''
            }
            return ''
          })
          .filter(Boolean)
          .join('')
          .replace(/<!--\?lit\$.*?\$-->/g, '')

        const decoded = this.decodeHtmlEntities(html)

        if (decoded && `<div>${decoded}</div>` !== this.text) {
          this.text = `<div>${decoded}</div>`
          this.initTooltip()
        }
      }, 0)
    }
  }

  private decodeHtmlEntities(str: string): string {
    const txt = document.createElement('textarea')
    txt.innerHTML = str
    return txt.value
  }

  render() {
    const styles = this.styles({
      hasNoText: !this.text,
    })

    return html`
      <div id="tooltip" role="tooltip" class=${styles.tooltip()}>
        ${html`<lukso-sanitize html-content=${this.text}></lukso-sanitize>`}
      </div>
      <slot name="text" class="hidden"></slot>
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
