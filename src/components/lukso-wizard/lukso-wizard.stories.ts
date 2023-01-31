import { html } from 'lit-html'

import '../lukso-wizard'

export default {
  title: 'Design System/Components/Wizard',
  component: 'lukso-wizard',
  argTypes: {
    steps: {
      control: { type: 'object' },
    },
    activeStep: { control: { type: 'number', min: 1, step: 1 } },
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
    activeStep: 3,
  },
  parameters: {
    controls: {
      exclude: ['activeStepStyles', 'completedStepStyles', 'active-step'],
    },
  },
}

const Template = ({ steps, activeStep }) =>
  html`<lukso-wizard
    steps=${JSON.stringify(steps)}
    active-step=${activeStep}
  ></lukso-wizard>`

export const Wizard = Template.bind({})
