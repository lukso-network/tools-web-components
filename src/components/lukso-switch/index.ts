import { html, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { tv } from 'tailwind-variants'

import { safeCustomElement } from '@/shared/safe-custom-element'
import { uniqId } from '@/shared/tools/uniq-id'
import { TailwindElement } from '@/shared/tailwind-element'
import '@/components/lukso-sanitize'

const DEFAULT_COLOR = 'green-54'

@safeCustomElement('lukso-switch')
export class LuksoSwitch extends TailwindElement {
  @property({ type: String })
  color = DEFAULT_COLOR

  @property({ type: String })
  id = ''

  @property({ type: String })
  name = 'switch'

  @property({ type: String })
  label = ''

  @property({ type: String })
  description = ''

  @property({ type: String })
  error = ''

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

  labelTemplate() {
    return html`
      <div
        class="heading-inter-14-bold text-neutral-20 pb-2 block"
        >${this.label}</label
      >
    `
  }

  descriptionTemplate() {
    return html`
      <div class="paragraph-inter-12-regular text-neutral-20 pb-2">
        <lukso-sanitize html-content=${this.description}></lukso-sanitize>
      </div>
    `
  }

  errorTemplate() {
    return html`<div class="paragraph-inter-12-regular text-red-65 pt-2">
      ${this.error}
    </div>`
  }

  render() {
    const { label, input } = this.styles({
      isChecked: this.isChecked,
      isDisabled: this.isDisabled,
      hasError: this.error !== '',
    })

    if (!this.color) {
      this.color = DEFAULT_COLOR
    }

    return html`
      <label for=${this.id} class="w-[inherit]">
        ${this.label ? this.labelTemplate() : nothing}
        ${this.description ? this.descriptionTemplate() : nothing}
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
          </label>
        </div>
        ${this.error ? this.errorTemplate() : nothing}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-switch': LuksoSwitch
  }
}
