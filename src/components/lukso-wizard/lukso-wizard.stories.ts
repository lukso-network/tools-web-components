import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'

import '../index'

/** Documentation and examples of `lukso-wizard` component. Steps are passed in `step` property as object containing different labels.
 *  To specify which step is active set `active-step` property.
 */
const meta: Meta = {
  title: 'Design System/Components/lukso-wizard',
  component: 'lukso-wizard',
  argTypes: {
    steps: {
      control: { type: 'object' },
      table: {
        category: 'Attributes',
      },
    },
    activeStep: {
      name: 'active-step',
      control: { type: 'number', min: 1, step: 1 },
      table: {
        category: 'Attributes',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'full-width'],
      table: {
        category: 'Attributes',
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'numbered'],
      table: {
        category: 'Attributes',
      },
    },
    isLinkable: {
      name: 'is-linkable',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    linkableMode: {
      name: 'linkable-mode',
      control: { type: 'select' },
      options: ['previous', 'all'],
      table: {
        category: 'Attributes',
      },
    },
    'on-step-click': {
      description:
        'Fired when a linkable step is clicked (requires `is-linkable`). The `detail.step` property contains the 1-based index of the clicked step.',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<{ step: number }>' },
      },
    },
    'active-step': {
      name: 'activeStep',
    },
  },
  args: {
    steps: [
      {
        label: `Select
Profile`,
      },
      {
        label: `Connect
Wallet`,
      },
      {
        label: `Migrate
LYXe`,
      },
      { label: 'Status' },
    ],
    size: 'medium',
    activeStep: 3,
    isLinkable: false,
    linkableMode: 'previous',
  },
  parameters: {
    controls: {
      exclude: [
        'activeStepStyles',
        'completedStepStyles',
        'activeStep',
        'styles',
      ],
    },
  },
}

export default meta

const Template = ({
  steps,
  activeStep,
  size,
  variant,
  isLinkable,
  linkableMode,
}: {
  steps: object[]
  activeStep: number
  size: string
  variant: string
  isLinkable: boolean
  linkableMode: string
}) =>
  html`<lukso-wizard
    steps=${JSON.stringify(steps)}
    active-step=${activeStep}
    size=${size ? size : nothing}
    variant=${variant ? variant : nothing}
    ?is-linkable=${isLinkable}
    linkable-mode=${linkableMode ?? nothing}
  ></lukso-wizard>`

export const BasicWizard = Template.bind({})

export const NumberedWizard = Template.bind({})
;(NumberedWizard as typeof Template & { args: object }).args = {
  steps: [
    { label: 'Token information' },
    { label: 'Token settings' },
    { label: 'Review' },
    { label: 'Deploy' },
  ],
  size: 'full-width',
  activeStep: 3,
  variant: 'numbered',
}

const linkableSteps = [
  { label: 'Token information' },
  { label: 'Token settings' },
  { label: 'Review' },
  { label: 'Deploy' },
]

function buildLinkableStory(linkableMode: 'previous' | 'all') {
  return () => {
    let activeStep = 3

    const container = document.createElement('div')
    container.style.cssText =
      'display:flex;flex-direction:column;gap:16px;width:100%'

    const info = document.createElement('p')
    info.style.cssText = 'margin:0;font-size:13px;color:#666'

    const updateInfo = () => {
      info.textContent =
        linkableMode === 'all'
          ? `Active step: ${activeStep} — click any step (except active) to jump to it`
          : `Active step: ${activeStep} — click a completed step to navigate back`
    }
    updateInfo()

    const wizard = document.createElement('lukso-wizard')
    wizard.setAttribute('steps', JSON.stringify(linkableSteps))
    wizard.setAttribute('active-step', String(activeStep))
    wizard.setAttribute('size', 'full-width')
    wizard.setAttribute('variant', 'numbered')
    wizard.setAttribute('is-linkable', '')
    wizard.setAttribute('linkable-mode', linkableMode)

    wizard.addEventListener('on-step-click', (e: Event) => {
      activeStep = (e as CustomEvent<{ step: number }>).detail.step
      wizard.setAttribute('active-step', String(activeStep))
      updateInfo()
    })

    container.appendChild(info)
    container.appendChild(wizard)
    return container
  }
}

export const LinkableWizard = Object.assign(buildLinkableStory('previous'), {
  storyName: 'Linkable Wizard (previous only)',
})

export const LinkableWizardAll = Object.assign(buildLinkableStory('all'), {
  storyName: 'Linkable Wizard (all steps)',
})
