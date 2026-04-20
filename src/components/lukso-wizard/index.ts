import { html, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import { tv } from 'tailwind-variants'

import { safeCustomElement } from '@/shared/safe-custom-element'
import { TailwindStyledElement } from '@/shared/tailwind-element'
import style from './style.css?inline'

export type WizardStep = {
  label: string
}

export type WizardSize = 'small' | 'medium' | 'large' | 'full-width'
export type WizardVariant = 'default' | 'numbered'
export type WizardLinkableMode = 'previous' | 'all'

/**
 * A multi-step progress indicator (stepper) showing labelled steps with completed/current/upcoming states.
 */
@safeCustomElement('lukso-wizard')
export class LuksoWizard extends TailwindStyledElement(style) {
  @property({ type: String })
  steps = ''

  @property({ type: Number, attribute: 'active-step' })
  activeStep = 1

  @property({ type: String })
  size: WizardSize = 'medium'

  @property({ type: String })
  variant: WizardVariant = 'default'

  @property({ type: Boolean, attribute: 'is-linkable' })
  isLinkable = false

  @property({ type: String, attribute: 'linkable-mode' })
  linkableMode: WizardLinkableMode = 'previous'

  private numberedStepStyles = tv({
    slots: {
      base: 'flex items-center flex-1 last:flex-none',
      circle: `lukso-wizard-numbered-circle w-7 h-7 rounded-full flex items-center justify-center
        shrink-0 body-inter-12-bold text-neutral-80 border border-neutral-80`,
      label: 'ml-2 body-inter-12-medium text-neutral-80 whitespace-nowrap',
      line: 'lukso-wizard-numbered-line flex-1 h-[2px] mx-3 bg-neutral-90 transition-colors duration-300',
    },
    variants: {
      completed: {
        true: {
          circle: 'bg-green-45 text-neutral-100 border border-green-54',
          label: 'text-green-54',
          line: 'bg-green-45',
        },
      },
      active: {
        true: {
          circle: 'bg-neutral-10 text-neutral-100 border border-neutral-20 ',
          label: 'text-neutral-20',
        },
      },
    },
  })

  private stepStyles = tv({
    slots: {
      base: `inline-flex flex-col items-center justify-end first:-ml-12 last:-mr-12 relative
    last:[&>.lukso-wizard-circle]:after:hidden last:[&>.lukso-wizard-circle]:before:hidden`,
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

  private handleStepClick(stepNumber: number) {
    this.dispatchEvent(
      new CustomEvent('on-step-click', {
        detail: { step: stepNumber },
        bubbles: true,
        composed: true,
      })
    )
  }

  numberedStepTemplate(step: WizardStep, index: number, totalSteps: number) {
    const isCompleted = index + 1 < this.activeStep
    const isActive = index + 1 === this.activeStep
    const isLinkableStep =
      this.isLinkable &&
      !isActive &&
      (isCompleted || this.linkableMode === 'all')
    const { base, circle, label, line } = this.numberedStepStyles({
      completed: isCompleted,
      active: isActive,
    })
    return html`<li
      class="${base()} ${isLinkableStep ? 'cursor-pointer' : ''}"
      @click=${isLinkableStep ? () => this.handleStepClick(index + 1) : nothing}
    >
      <div class="${circle()}">${index + 1}</div>
      <span class="${label()}">${step.label}</span>
      ${index < totalSteps - 1 ? html`<div class="${line()}"></div>` : nothing}
    </li>`
  }

  defaultStepTemplate(step: WizardStep, index: number) {
    const isCompleted = index + 1 < this.activeStep
    const isActive = index + 1 === this.activeStep
    const isLinkableStep =
      this.isLinkable &&
      !isActive &&
      (isCompleted || this.linkableMode === 'all')
    const { base, circle, innerCircle } = this.stepStyles({
      completed: isCompleted,
      active: index + 1 === this.activeStep,
      current: index === this.activeStep - 2,
      size: this.size,
    })
    return html`<li
      class="${base()} ${isLinkableStep ? 'cursor-pointer' : ''}"
      @click=${isLinkableStep ? () => this.handleStepClick(index + 1) : nothing}
    >
      <div
        class="text-purple-51 nav-inter-8-medium-uppercase whitespace-pre-line flex text-center break-words uppercase leading-none"
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

    if (this.variant === 'numbered') {
      return html`
        <ul class="flex items-center w-full" data-testid="wizard">
          ${repeat(
            steps || [],
            (_, index) => index,
            (step, index) =>
              this.numberedStepTemplate(step, index, steps.length)
          )}
        </ul>
      `
    }

    return html`
      <ul class="flex justify-center" data-testid="wizard">
        ${repeat(
          steps || [],
          (_, index) => index,
          (step, index) => this.defaultStepTemplate(step, index)
        )}
      </ul>
    `
  }

  updated() {
    // delay animation to allow for DOM to be updated
    setTimeout(() => {
      const currentStep = this.shadowRoot?.querySelectorAll('.current')
      currentStep?.[0]?.classList.add('animated-step')
    }, 10)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lukso-wizard': LuksoWizard
  }
}
