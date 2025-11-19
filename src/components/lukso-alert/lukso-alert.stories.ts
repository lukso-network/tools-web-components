import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'

import './index'

/**  Documentation and examples of `lukso-alert` component. */
const meta: Meta = {
  title: 'Design System/Components/lukso-alert',
  component: 'lukso-alert',
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['info', 'warning', 'error', 'success'],
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'info' },
      },
      // @ts-ignore
      type: { name: 'AlertVariant' },
    },
    title: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: '' },
      },
    },
    hasIcon: {
      name: 'has-icon',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'false' },
      },
    },
    'has-icon': {
      name: 'hasIcon',
    },
  },
  args: {
    variant: 'info',
    title: 'This is an info alert',
    description:
      'Lorem ipsum dolor sit amet, <i>consectetur adipiscing</i> elit. Urna, tortor tempus.',
    hasIcon: true,
  },
  parameters: {
    controls: {
      exclude: ['hasIcon'],
    },
  },
}

export default meta

const Template = ({ variant, title, description, hasIcon }) =>
  html`<lukso-alert
    variant=${variant ? variant : nothing}
    title=${title ? title : nothing}
    description=${description ? description : nothing}
    ?has-icon=${hasIcon}
  ></lukso-alert>`

export const InfoAlert = Template.bind({})
InfoAlert.parameters = {
  hasIcon: true,
}

export const WarningAlert = Template.bind({})
WarningAlert.args = {
  variant: 'warning',
  hasIcon: true,
}

export const ErrorAlert = Template.bind({})
ErrorAlert.args = {
  variant: 'error',
  hasIcon: true,
}

export const SuccessAlert = Template.bind({})
SuccessAlert.args = {
  variant: 'success',
  hasIcon: true,
}

export const AlertWithoutIcon = Template.bind({})
AlertWithoutIcon.args = {
  hasIcon: false,
}
