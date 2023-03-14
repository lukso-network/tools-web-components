import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'

import { TailwindElement } from '@/shared/tailwind-element'
import { customClassMap } from '@/shared/directives'

export type WizardStep = {
  label: string
}

@customElement('lukso-wizard')
export class LuksoWizard extends TailwindElement {
  @property({ type: Array })
  steps: WizardStep[] = []

  @property({ type: Number, attribute: 'active-step' })
  activeStep = 1

  private activeStepStyles = `[&_.lukso-wizard-circle-inner]:border-2 [&_.lukso-wizard-circle-inner]:border-purple-51`

  private completedStepStyles = `[&>.lukso-wizard-circle]:after:bg-purple-51
    [&_.lukso-wizard-circle-inner]:bg-gradient-to-t
    [&_.lukso-wizard-circle-inner]:from-gradient-3-start
    [&_.lukso-wizard-circle-inner]:to-gradient-3-end`

  stepTemplate(step: WizardStep, index: number) {
    return html`<li
      class="inline-flex flex-col items-center justify-end w-[121px] first:-ml-12 last:-mr-12 relative
      [&>.lukso-wizard-circle]:after:last:hidden ${customClassMap({
        [this.completedStepStyles]: index + 1 < this.activeStep,
        [this.activeStepStyles]: index + 1 === this.activeStep,
      })}"
    >
      <div
        class="text-purple-51 nav-apax-8-medium-uppercase whitespace-pre-line flex text-center break-words uppercase"
      >
        ${step.label}
      </div>
      <div
        class="lukso-wizard-circle bg-pink-95 w-4 h-4 rounded-full shadow-wizard-step mt-2 flex items-center
          border-[1px] border-solid border-[rgba(255,255,255,0.8)]
          after:block after:absolute after:bottom-[7px] after:w-[calc(100%-16px)] after:ml-[15px] after:h-[2px]
          after:content:'' after:bg-pink-95 after:shadow-wizard-line"
      >
        <div
          class="lukso-wizard-circle-inner rounded-full w-[10px] h-[10px] ml-[2px] ${customClassMap(
            {
              [this.activeStepStyles]: index + 1 === this.activeStep,
            }
          )}"
        ></div>
      </div>
    </li>`
  }

  render() {
    return html`
      <ul class="flex justify-center" data-testid="wizard">
        ${repeat(
          this.steps || [],
          step => this.steps.indexOf(step),
          (step, index) => this.stepTemplate(step, index)
        )}
      </ul>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-wizard': LuksoWizard
  }
}
