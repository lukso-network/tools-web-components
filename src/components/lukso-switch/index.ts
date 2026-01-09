import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { tv } from 'tailwind-variants'

import { safeCustomElement } from '@/shared/safe-custom-element'
import { uniqId } from '@/shared/tools/uniq-id'
import { TailwindElement } from '@/shared/tailwind-element'
import '@/components/lukso-sanitize'
import '@/components/lukso-form-label'
import '@/components/lukso-form-description'
import '@/components/lukso-form-error'

const DEFAULT_COLOR = 'green-54'

@safeCustomElement('lukso-switch')
export class LuksoSwitch extends TailwindElement {
  @property({ type: String })
  color = DEFAULT_COLOR

  @property({ type: String })
  id: string | undefined = ''

  @property({ type: String })
  name = 'switch'

  @property({ type: String })
  label: string | undefined = ''

  @property({ type: String })
  description: string | undefined = ''

  @property({ type: String })
  error: string | undefined = ''

  @property({ type: Boolean, attribute: 'is-checked' })
  isChecked = false

  @property({
    type: Boolean,
    attribute: 'is-disabled',
  })
  isDisabled = false

  private async handleChange(event: Event) {
    const target = event.target as HTMLInputElement
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

  constructor() {
    super()

    if (!this.id) {
      this.id = `switch-${uniqId()}`
    }
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
      hasError: {
        true: {
          label: '!bg-red-65',
          input: '!border-red-65',
        },
      },
    },
  })

  render() {
    const { label, input } = this.styles({
      isChecked: this.isChecked,
      isDisabled: this.isDisabled,
      hasError: !!this.error,
    })

    if (!this.color) {
      this.color = DEFAULT_COLOR
    }

    return html`
      <div>
        <lukso-form-label
          for-name=${this.name}
          label=${this.label}
        ></lukso-form-label>
        <lukso-form-description
          description=${this.description}
        ></lukso-form-description>
        <label for=${this.id} class="w-[inherit]">
          <div class="flex">
            <div
              class=${label()}
              style=${styleMap({
                backgroundColor: `var(--${
                  this.isChecked ? this.color : 'neutral-90'
                })`,
              })}
            >
              <input
                type="checkbox"
                id=${this.id}
                name=${this.name}
                ?checked=${this.isChecked}
                ?disabled=${this.isDisabled}
                class=${input()}
                style=${styleMap({
                  borderColor: `var(--${
                    this.isChecked ? this.color : 'neutral-90'
                  })`,
                })}
                @change=${this.handleChange}
              />
            </div>
          </div>
        </label>
        <lukso-form-error error=${this.error}></lukso-form-error>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-switch': LuksoSwitch
  }
}
