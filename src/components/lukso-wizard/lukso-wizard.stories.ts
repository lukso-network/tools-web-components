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

const Template = ({ steps, activeStep, size }) =>
  html`<lukso-wizard
    steps=${JSON.stringify(steps)}
    active-step=${activeStep}
    size=${size ? size : nothing}
  ></lukso-wizard>`

export const BasicWizard = Template.bind({})
