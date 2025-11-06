import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'

import './index'

/**  Documentation and examples of `lukso-form-description` component.  */
const meta: Meta = {
  title: 'Design System/Forms/lukso-form-description',
  component: 'lukso-form-description',
  argTypes: {
    description: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
  },
  args: {
    description: 'This is a <i>description</i>',
  },
}

export default meta

const Template = ({ description }) =>
  html`<lukso-form-description
    description=${description ? description : nothing}
  ></lukso-form-description>`

/** Example of default description  */
export const DefaultFormDescription = Template.bind({})
