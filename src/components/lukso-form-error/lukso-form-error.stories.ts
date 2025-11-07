import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'

import './index'

/**  Documentation and examples of `lukso-form-error` component.  */
const meta: Meta = {
  title: 'Design System/Forms/lukso-form-error',
  component: 'lukso-form-error',
  argTypes: {
    error: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
  },
  args: {
    error: 'This is a <i>error</i>',
  },
}

export default meta

const Template = ({ error }) =>
  html`<lukso-form-error error=${error ? error : nothing}></lukso-form-error>`

/** Example of default error  */
export const DefaultFormError = Template.bind({})
