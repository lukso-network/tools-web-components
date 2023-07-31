import { html } from 'lit-html'
import { Meta } from '@storybook/web-components'

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
      options: ['success', 'error'],
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

const Template = ({ min, max, current, variant }) =>
  html`<lukso-progress
    min=${min}
    max=${max}
    current=${current}
    variant=${variant}
  ></lukso-progress>`

/** Example of `success` progress bar. */
export const SuccessProgress = Template.bind({})

/** Example of `error` progress bar. */
export const ErrorProgress = Template.bind({})
ErrorProgress.args = {
  variant: 'error',
}
