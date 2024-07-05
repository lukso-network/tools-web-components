import { html } from 'lit-html'

import type { Meta } from '@storybook/web-components'

import './index'

/**  Documentation and examples of `lukso-progress` component.  */
const meta: Meta = {
  title: 'Design System/Components/lukso-progress',
  component: 'lukso-progress',
  argTypes: {
    min: {
      control: { type: 'number' },
      table: {
        category: 'Attributes',
      },
    },
    max: {
      control: { type: 'number' },
      table: {
        category: 'Attributes',
      },
    },
    current: {
      control: { type: 'number' },
      table: {
        category: 'Attributes',
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning'],
      table: {
        category: 'Attributes',
      },
    },
    height: {
      name: 'height',
      control: { type: 'number' },
      table: {
        category: 'Attributes',
      },
    },
  },
  args: {
    min: 0,
    max: 100,
    current: 20,
    variant: 'success',
    height: 16,
  },
  parameters: {
    controls: {
      exclude: [],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1397-20903&t=aKXAGLDsRzDtft3B-4',
    },
  },
}

export default meta

const Template = ({ min, max, current, variant, height }) =>
  html`<lukso-progress
    min=${min}
    max=${max}
    current=${current}
    variant=${variant}
    height=${height}
  ></lukso-progress>`

/** Example of `success` progress bar. */
export const SuccessProgress = Template.bind({})

/** Example of `error` progress bar. */
export const ErrorProgress = Template.bind({})
ErrorProgress.args = {
  variant: 'error',
}
