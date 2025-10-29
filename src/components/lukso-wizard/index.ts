import { html } from 'lit'
import { safeCustomElement } from '@/shared/safe-custom-element'
import { customElement, property } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import { tv } from 'tailwind-variants'

import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.scss?inline'

export type WizardStep = {
  label: string
}

export type WizardSize = 'small' | 'medium' | 'large' | 'full-width'

@safeCustomElement('lukso-wizard')
export class LuksoWizard extends TailwindStyledElement(style) {
  @property({ type: String })
  steps = ''

  @property({ type: Number, attribute: 'active-step' })
  activeStep = 1

  @property({ type: String })
  size: WizardSize = 'medium'

  private stepStyles = tv({
    slots: {
      base: `inline-flex flex-col items-center justify-end first:-ml-12 last:-mr-12 relative
    [&>.lukso-wizard-circle]:after:last:hidden [&>.lukso-wizard-circle]:before:last:hidden`,
      circle: `lukso-wizard-circle bg-neutral-90 w-4 h-4 rounded-full shadow-wizard-step mt-2 flex items-center
    border-[1px] border-solid border-[rgba(255,255,255,0.8)]
    after:block after:absolute after:bottom-[7px] after:ml-[15px] after:h-[2px]
    after:content:'' after:bg-transparent after:transition-width after:duration-300
    before:block before:absolute before:bottom-[7px] before:ml-[15px] before:h-[2px]
    before:content:'' before:bg-neutral-90 before:shadow-wizard-line before:w-[calc(100%-16px)]`,
      innerCircle:
        'lukso-wizard-circle-inner rounded-full w-[10px] h-[10px] ml-[2px]',
    },
    variants: {
      size: {
        small: {
          base: 'w-[92px]',
        },
        medium: {
          base: 'w-[121px]',
        },
        large: {
          base: 'w-[180px]',
        },
        ['full-width']: {
          base: 'w-full',
        },
      },
      completed: {
        true: {
          base: `[&>.lukso-wizard-circle]:after:bg-purple-51
          [&_.lukso-wizard-circle-inner]:bg-gradient-to-t
          [&_.lukso-wizard-circle-inner]:from-gradient-3-start
          [&_.lukso-wizard-circle-inner]:to-gradient-3-end`,
          circle: 'completed',
        },
      },
      current: {
        true: {
          circle: 'current',
        },
      },
      active: {
        true: {
          base: `[&_.lukso-wizard-circle-inner]:border-2 [&_.lukso-wizard-circle-inner]:border-purple-51`,
          innerCircle:
            '[&_.lukso-wizard-circle-inner]:border-2 [&_.lukso-wizard-circle-inner]:border-purple-51',
        },
      },
    },
  })

  stepTemplate(step: WizardStep, index: number) {
    const { base, circle, innerCircle } = this.stepStyles({
      completed: index + 1 < this.activeStep,
      active: index + 1 === this.activeStep,
      current: index === this.activeStep - 2,
      size: this.size,
    })
    return html`<li class="${base()}">
      <div
        class="text-purple-51 nav-apax-8-medium-uppercase whitespace-pre-line flex text-center break-words uppercase"
      >
        ${step.label}
      </div>
      <div class="${circle()}">
        <div class="${innerCircle()}"></div>
      </div>
    </li>`
  }

  render() {
    const steps = JSON.parse(this.steps) as WizardStep[]

    return html`
      <ul class="flex justify-center" data-testid="wizard">
        ${repeat(
          steps || [],
          step => steps.indexOf(step),
          (step, index) => this.stepTemplate(step, index)
        )}
      </ul>
    `
  }

  updated() {
    // delay animation to allow for DOM to be updated
    setTimeout(() => {
      const currentStep = this.shadowRoot.querySelectorAll('.current')
      currentStep[0]?.classList.add('animated-step')
    }, 10)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-wizard': LuksoWizard
  }
}
