import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { tv } from 'tailwind-variants'

import { TailwindElement } from '@/shared/tailwind-element'

const DEFAULT_COLOR = 'green-54'

@customElement('lukso-switch')
export class LuksoSwitch extends TailwindElement {
  @property({ type: String })
  color = DEFAULT_COLOR

  @property({ type: Boolean, attribute: 'is-checked' })
  private isChecked = false

  @property({
    type: Boolean,
    attribute: 'is-disabled',
  })
  private isDisabled = false

  private async handleChange(event: Event) {
    const target = event.target as HTMLInputElement
    console.log('target', target)
    await this.updateComplete
    const changeEvent = new CustomEvent('on-change', {
      detail: {
        value: target.checked,
        event,
      },
      bubbles: false,
      composed: true,
    })
    this.dispatchEvent(changeEvent)
  }

  private styles = tv({
    slots: {
      label:
        'transition duration-300 ease-in block h-6 overflow-hidden rounded-full relative inline-block w-10',
      input:
        'absolute block w-6 h-6 rounded-full bg-white border-2 appearance-none transition duration-300 ease-in',
    },
    variants: {
      isChecked: {
        true: {
          input: 'translate-x-4',
        },
        false: {
          label: 'bg-neutral-90',
          input: 'border-neutral-90',
        },
      },
      isDisabled: {
        true: {
          label: 'opacity-70 cursor-not-allowed',
          input: 'cursor-not-allowed',
        },
        false: {
          label: 'cursor-pointer',
          input: 'cursor-pointer',
        },
      },
    },
  })

  render() {
    const { label, input } = this.styles({
      isChecked: this.isChecked,
      isDisabled: this.isDisabled,
    })

    if (!this.color) {
      this.color = DEFAULT_COLOR
    }

    return html`
      <label
        for="switch"
        class=${label()}
        style=${styleMap({
          backgroundColor: `var(--${
            this.isChecked ? this.color : 'neutral-90'
          })`,
        })}
      >
        <input
          type="checkbox"
          id="switch"
          ?checked=${this.isChecked}
          ?disabled=${this.isDisabled}
          class=${input()}
          style=${styleMap({
            borderColor: `var(--${this.isChecked ? this.color : 'neutral-90'})`,
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
