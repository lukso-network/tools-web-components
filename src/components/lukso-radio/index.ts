import { html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { tv } from 'tailwind-variants'

import { safeCustomElement } from '@/shared/safe-custom-element'
import { TailwindElement } from '@/shared/tailwind-element'
import '@/components/lukso-form-label'
import '@/components/lukso-form-description'
import '@/components/lukso-form-error'
import { cn } from '@/shared/tools'

export type RadioSize = 'x-small' | 'small' | 'medium'

@safeCustomElement('lukso-radio')
export class LuksoRadio extends TailwindElement {
  @property({ type: String })
  name: string | undefined = ''

  @property({ type: String })
  id: string | undefined = ''

  @property({ type: String })
  value: string | undefined = ''

  @property({ type: String })
  size: RadioSize = 'medium'

  @property({ type: String })
  label: string | undefined = ''

  @property({ type: String })
  description: string | undefined = ''

  @property({ type: String })
  error: string | undefined = ''

  @property({ type: Boolean })
  checked = false

  @property({ type: String, attribute: 'custom-class' })
  customClass: string | undefined = ''

  @property({ type: Boolean, attribute: 'is-readonly' })
  isReadonly = false

  @property({ type: Boolean, attribute: 'is-disabled' })
  isDisabled = false

  @state()
  private hasFocus = false

  @state()
  private hasHighlight = false

  // Expose the focus method for programmatic focusing
  public focus() {
    const radioElement = this.renderRoot.querySelector('[role="radio"]')
    if (radioElement instanceof HTMLElement) {
      radioElement.focus()
    }
  }

  private radioStyles = tv({
    slots: {
      container: 'flex items-center gap-2 select-none outline-none',
      radio: `
        relative bg-neutral-100 justify-center items-center flex
        border border-solid rounded-full border-neutral-35
        outline-none transition transition-all duration-150 appearance-none shrink-0
      `,
      indicator:
        'rounded-full absolute appearance-none transition duration-300 ease-in',
      content: 'text-neutral-20 block',
      errorText: 'paragraph-inter-12-regular text-red-65 pt-2',
    },
    variants: {
      size: {
        medium: {
          radio: 'h-10 w-[40px]',
          indicator: 'w-[26px] h-[26px]',
          content: 'paragraph-inter-16-regular',
        },
        small: {
          radio: 'h-[32px] w-[32px]',
          indicator: 'w-[20px] h-[20px]',
          content: 'paragraph-inter-16-regular',
        },
        'x-small': {
          radio: 'h-7 w-[28px]',
          indicator: 'w-[17px] h-[17px]',
          content: 'paragraph-inter-12-semi-bold',
        },
      },
      hasError: {
        true: {
          radio: 'border-red-65',
          content: 'text-red-65',
        },
        false: {
          radio: 'border-neutral-90',
        },
      },
      hasHighlight: {
        true: {
          radio: 'border-neutral-35',
        },
      },
      isDisabled: {
        true: {
          radio: 'border-neutral-90',
          content: 'text-neutral-90',
          indicator: 'bg-neutral-90',
          container: 'cursor-not-allowed',
        },
        false: {
          indicator: 'bg-green-54',
        },
      },
      isReadonly: {
        true: {
          container: 'cursor-not-allowed',
        },
      },
      isChecked: {
        true: {},
        false: {},
      },
    },
    compoundVariants: [
      {
        hasHighlight: true,
        hasError: true,
        class: {
          radio: 'border-red-65',
        },
      },
      {
        isDisabled: true,
        class: {
          container: 'cursor-not-allowed',
        },
      },
    ],
  })

  checkedIndicatorTemplate(): unknown {
    const { indicator } = this.radioStyles({
      size: this.size,
      isDisabled: this.isDisabled,
      isChecked: this.checked,
    })

    return html`
      <div class=${cn(indicator(), this.checked ? '' : 'hidden')}></div>
    `
  }

  radioTemplate(): unknown {
    const { radio } = this.radioStyles({
      size: this.size,
      hasError: !!this.error,
      hasHighlight: this.hasHighlight,
      isDisabled: this.isDisabled,
    })

    return html`
      <div class=${cn(radio(), this.customClass)}>
        ${this.checkedIndicatorTemplate()}
      </div>
    `
  }

  contentTemplate() {
    const { content } = this.radioStyles({
      size: this.size,
      hasError: !!this.error,
      isDisabled: this.isDisabled,
    })

    return html`
      <div class=${content()}>
        <slot></slot>
      </div>
    `
  }

  render() {
    const { container } = this.radioStyles({
      isDisabled: this.isDisabled,
      isReadonly: this.isReadonly,
    })

    return html`
      <div>
        <lukso-form-label label=${this.label}></lukso-form-label>
        <lukso-form-description
          description=${this.description}
        ></lukso-form-description>
        <div
          class=${container()}
          @mouseenter=${this.handleMouseOver}
          @mouseleave=${this.handleMouseOut}
          @click=${!this.isDisabled && !this.isReadonly
            ? this.handleClick
            : undefined}
          @keydown=${this.handleKeydown}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          aria-checked=${this.checked}
          role="radio"
          tabindex=${!this.isDisabled && !this.isReadonly ? '0' : '-1'}
          aria-disabled=${this.isDisabled}
          aria-readonly=${this.isReadonly}
          aria-labelledby="${this.id || `radio-${this.value}`}"
          id="${this.id || `radio-${this.value}`}"
          part="radio"
        >
          ${this.radioTemplate()} ${this.contentTemplate()}
        </div>
        <lukso-form-error error=${this.error}></lukso-form-error>
      </div>
    `
  }

  private handleKeydown(event: KeyboardEvent) {
    // If disabled or readonly, do nothing
    if (this.isDisabled || this.isReadonly) return

    // Handle Space key to select this radio
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      this.handleClick(event)
    }

    // Forward arrow keys to the parent radio group for navigation
    if (
      [
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'Home',
        'End',
      ].includes(event.key)
    ) {
      // Let the event bubble up to the radio group
      // The group will handle the navigation between radio buttons
      const radioGroup = this.closest('lukso-radio-group')
      if (radioGroup) {
        // Don't prevent default here - let the group handle it
        return
      }
    }

    // Note: Arrow key navigation is handled by the parent radio group
  }

  private handleFocus() {
    this.hasFocus = true
    this.hasHighlight = true
  }

  private handleBlur() {
    this.hasFocus = false
    this.hasHighlight = false
  }

  private async handleClick(event: Event) {
    if (this.isReadonly || this.isDisabled) return

    // Toggle the checked state
    this.checked = true
    await this.updateComplete

    // Dispatch change event
    this.dispatchEvent(
      new CustomEvent('on-change', {
        detail: {
          value: this.value,
          checked: true,
          event,
        },
        bubbles: true,
        composed: true,
      })
    )
  }

  private handleMouseOver() {
    if (!this.isReadonly && !this.isDisabled) {
      this.hasHighlight = true
    }
  }

  private handleMouseOut() {
    if (!this.hasFocus) {
      this.hasHighlight = false
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-radio': LuksoRadio
  }
}
