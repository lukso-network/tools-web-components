import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'

import './index'

/**  Documentation and examples of `lukso-form-label` component.  */
const meta: Meta = {
  title: 'Design System/Forms/lukso-form-label',
  component: 'lukso-form-label',
  argTypes: {
    forName: {
      name: 'for-name',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    'for-name': {
      name: 'forName',
    },
  },
  args: {
    forName: 'label',
  },
  parameters: {
    controls: {
      exclude: ['forName'],
    },
  },
}

export default meta

const Template = ({ forName }) =>
  html`<lukso-form-label for-name=${forName ? forName : nothing}
    >Some label</lukso-form-label
  >`

/** Example of default label  */
export const DefaultFormLabel = Template.bind({})
