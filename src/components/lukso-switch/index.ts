import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import { TailwindElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'

@customElement('lukso-switch')
export class LuksoSwitch extends TailwindElement {
  @property({ type: String })
  color = 'green-54'

  @property({ type: Boolean })
  private isChecked = false

  @property({
    type: Boolean,
  })
  private isDisabled = false

  private handleChange(event: Event) {
    this.isChecked = !this.isChecked
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

  private defaultLabelStyles = `transition duration-300 ease-in block h-6 overflow-hidden rounded-full relative inline-block w-10`

  private defaultInputStyles = `absolute block w-6 h-6 rounded-full bg-white border-2 appearance-none transition duration-300 ease-in`

  render() {
    return html`
      <label
        for="switch"
        class=${customClassMap({
          [this.defaultLabelStyles]: true,
        })}
        style=${styleMap({
          backgroundColor: `var(--${
            this.isChecked ? this.color : 'neutral-90'
          })`,
          opacity: this.isDisabled ? 0.7 : 1,
          cursor: this.isDisabled ? 'not-allowed' : 'pointer',
        })}
      >
        <input
          type="checkbox"
          id="switch"
          ?checked=${this.isChecked}
          ?disabled=${this.isDisabled}
          class=${customClassMap({
            [this.defaultInputStyles]: true,
            ['translate-x-4']: this.isChecked,
          })}
          style=${styleMap({
            borderColor: `var(--${this.isChecked ? this.color : 'neutral-90'})`,
            cursor: this.isDisabled ? 'not-allowed' : 'pointer',
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
