import { html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TailwindElement } from '../../shared/tailwind.element'
import { AnimateController, flyBelow, fade } from '@lit-labs/motion'
import { classMap } from 'lit/directives/class-map.js'

@customElement('lds-button')
export class LdsButtonComponent extends TailwindElement() {
  @property()
  variant: string = 'primary'

  @property()
  disabled: boolean = false

  defaultStyles =
    'flex justify-center items-center w-[334px] relative gap-2 px-[81px] py-3 px-6 rounded-xl border border-solid cursor-pointer'
  secondaryStyles = ' bg-neutral-100 border-neutral-90 text-neutral-20'
  primaryStyles =
    ' bg-neutral-20 border-neutral-20 text-neutral-100 disabled:bg-neutral-90 disabled:border-neutral-90'

  protected render() {
    return html`
      <button
        data-testid="button"
        ?disabled=${this.disabled}
        class="${this.defaultStyles} ${
      this.variant === 'primary' ? this.primaryStyles : ''
    }  ${this.variant === 'secondary' ? this.secondaryStyles : ''}""
      >
        <slot />
      </button>
    `
  }
}
