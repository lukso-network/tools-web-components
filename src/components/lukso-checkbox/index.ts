import { html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { TailwindElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'

export type CheckboxSize = 'x-small' | 'small' | 'medium'
export type CheckboxType = 'text' | 'profile'

@customElement('lukso-checkbox')
export class LuksoCheckbox extends TailwindElement {
  @property({ type: String })
  name = ''

  @property({ type: String })
  id = ''

  @property({ type: String })
  ref: string | undefined = undefined

  @property({ type: String })
  type: CheckboxType = 'text'

  @property({ type: String })
  size: CheckboxSize = 'medium'

  @property({ type: String })
  error = ''

  @property({ type: Boolean })
  checked: boolean = false

  @property({ type: String, attribute: 'custom-class' })
  customClass = ''

  @property({ type: Boolean, attribute: 'is-readonly' })
  isReadonly = false

  @property({ type: Boolean, attribute: 'is-disabled' })
  isDisabled = false

  @state()
  private hasFocus = false

  @state()
  private hasHighlight = false

  private defaultContainerStyles = `
        flex items-center gap-2
        select-none  
    `

  private defaultInputStyles = `
        peer
        absolute
        top-0 left-0
        opacity-0
    `

  private defaultLabelStyles = `
    text-neutral-20 block
    `

  private defaultCheckboxStyles = `
    relative
    bg-neutral-100
    justify-center items-center flex
    border border-solid rounded-md
    outline-none transition transition-all duration-150 appearance-none`

  checkedIconTemplate(): unknown {
    return html`
      <lukso-icon
        class=${customClassMap({
          hidden: !this.checked,
        })}
        name="tick"
        color=${this.isDisabled ? 'neutral-60' : 'neutral-20'}
      ></lukso-icon>
    `
  }

  checkboxTemplate(): unknown {
    return html`
      <div
        class=${customClassMap({
          [this.defaultCheckboxStyles]: true,
          [this.error === '' ? 'border-neutral-90' : 'border-red-85']:
            !this.hasHighlight,
          [this.error === '' ? 'border-neutral-35' : 'border-red-65']:
            this.hasHighlight,
          ['border-neutral-60']: this.isDisabled,
          ['h-[40px] w-[40px]']: this.size === 'medium',
          ['h-[32px] w-[32px]']: this.size === 'small',
          ['h-[28px] w-[28px]']: this.size === 'x-small',
          [this.customClass]: !!this.customClass,
        })}
      >
        ${this.checkedIconTemplate()}
      </div>
    `
  }

  inputTemplate() {
    const id = this.id || this.name
    return html`
      <input
        name=${this.name}
        ?checked=${this.checked ? 'checked' : undefined}
        type="checkbox"
        class=${customClassMap({
          [this.defaultInputStyles]: true,
          ['text-neutral-60']: this.isDisabled,
        })}
        ref=${this.ref}
        id=${id}
        data-testid=${this.name ? `input-${this.name}` : 'input'}
        ?disabled=${this.isDisabled ? true : undefined}
        ?readonly=${this.isReadonly ? true : undefined}
        @change=${!this.isReadonly ? this.handleChange : 'return false;'}
      />
    `
  }

  errorTemplate() {
    return html`
      <div class="paragraph-inter-12-regular text-red-65 pt-2">
        ${this.error}
      </div>
    `
  }

  labelTemplate() {
    return html`
      <span
        class=${customClassMap({
          [this.defaultLabelStyles]: true,
          ['paragraph-inter-16-regular']:
            this.size === 'medium' || this.size === 'small',
          ['paragraph-inter-12-semi-bold']: this.size === 'x-small',
          ['text-red-65']: this.error !== '',
          ['text-neutral-60']: this.isDisabled,
        })}
      >
        <slot></slot>
      </span>
    `
  }

  profileUsernameTemplate() {
    return html`
      <div class="flex items-center text-neutral-20 gap-2 justify-center">
        <slot></slot>
      </div>
    `
  }

  render() {
    return html`
      <div>
        <label
          for=${this.name}
          class=${customClassMap({
            [this.defaultContainerStyles]: true,
            ['cursor-not-allowed']: this.isDisabled || this.isReadonly,
          })}
          @mouseenter=${this.handleMouseOver}
          @mouseleave=${this.handleMouseOut}
        >
          ${this.inputTemplate()} ${this.checkboxTemplate()}
          ${this.type === 'text' ? this.labelTemplate() : nothing}
          ${this.type === 'profile' ? this.profileUsernameTemplate() : nothing}
        </label>
      </div>
    `
  }

  private async handleChange(event: Event) {
    const target = event.target as HTMLInputElement
    this.checked = target.checked
    await this.updateComplete

    this.dispatchEvent(
      new CustomEvent('on-change', {
        detail: {
          value: target.value,
          checked: target.checked,
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
    'lukso-checkbox': LuksoCheckbox
  }
}
