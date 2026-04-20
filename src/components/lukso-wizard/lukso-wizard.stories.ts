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
}: {
  steps: object[]
  activeStep: number
  size: string
  variant: string
}) =>
  html`<lukso-wizard
    steps=${JSON.stringify(steps)}
    active-step=${activeStep}
    size=${size ? size : nothing}
    variant=${variant ? variant : nothing}
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
