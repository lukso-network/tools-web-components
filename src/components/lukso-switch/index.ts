import { html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { TailwindElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'

@customElement('lukso-switch')
export class LuksoSwitch extends TailwindElement {
  @property({ type: String })
  color = 'green-54'

  @property({ type: Boolean, attribute: 'is-checked' })
  private isChecked = false

  @property({ type: Boolean, attribute: 'is-disabled' })
  private isDisabled = false

  @state()
  private checked = false

  private handleChange(event: Event) {
    this.checked = !this.checked
    const target = event.target as HTMLInputElement
    const blurEvent = new CustomEvent('on-change', {
      detail: {
        value: target.value,
        event,
      },
      bubbles: false,
      composed: true,
    })
    this.dispatchEvent(blurEvent)
  }

  connectedCallback() {
    super.connectedCallback()
    this.checked = this.isChecked
  }

  private defaultLabelStyles = `transition duration-300 ease-in block h-6 overflow-hidden rounded-full cursor-pointer relative inline-block w-10`

  private defaultInputStyles = `absolute block w-6 h-6 rounded-full bg-white border-2 appearance-none cursor-pointer transition duration-300 ease-in`

  render() {
    return html`
      <label
        for="switch"
        class=${customClassMap({
          [this.defaultLabelStyles]: true,
          ['bg-neutral-90']: !this.checked,
          ['bg-' + this.color]: this.checked,
        })}
      >
        <input
          type="checkbox"
          id="switch"
          ?checked=${this.checked}
          ?disabled=${this.isDisabled}
          class=${customClassMap({
            [this.defaultInputStyles]: true,
            ['translate-x-4 border-' + this.color]: this.checked,
            ['border-neutral-90']: !this.checked,
          })}
          @change=${this.handleChange}
        />
      </label>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-switch': LuksoSwitch
  }
}
