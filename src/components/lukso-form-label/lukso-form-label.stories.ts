import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'

import './index'

/**  Documentation and examples of `lukso-form-label` component.  */
const meta: Meta = {
  title: 'Design System/Forms/lukso-form-label',
  component: 'lukso-form-label',
  argTypes: {
    label: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
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
    label: 'Some label',
    forName: 'label',
  },
  parameters: {
    controls: {
      exclude: ['forName'],
    },
  },
}

export default meta

const Template = ({ label, forName }) =>
  html`<lukso-form-label
    label=${label ? label : nothing}
    for-name=${forName ? forName : nothing}
  ></lukso-form-label>`

/** Example of default label  */
export const DefaultFormLabel = Template.bind({})
