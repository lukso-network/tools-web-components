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
    isFullWidth: {
      name: 'is-full-width',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Attributes',
        defaultValue: { summary: 'false' },
      },
    },
    'is-full-width': {
      name: 'isFullWidth',
    },
  },
  args: {
    variant: 'info',
    title: 'This is an info alert',
    description:
      'Lorem ipsum dolor sit amet, <i>consectetur adipiscing</i> elit. Urna, tortor tempus.',
    hasIcon: true,
    isFullWidth: false,
  },
  parameters: {
    controls: {
      exclude: ['hasIcon', 'isFullWidth'],
    },
  },
}

export default meta

const Template = ({ variant, title, description, hasIcon, isFullWidth }) =>
  html`<lukso-alert
    variant=${variant ? variant : nothing}
    title=${title ? title : nothing}
    description=${description ? description : nothing}
    ?has-icon=${hasIcon}
    ?is-full-width=${isFullWidth}
  ></lukso-alert>`

/** Example of `info` alert.  */
export const InfoAlert = Template.bind({})
InfoAlert.args = {
  hasIcon: true,
}

/** Example of `warning` alert.  */
export const WarningAlert = Template.bind({})
WarningAlert.args = {
  variant: 'warning',
  hasIcon: true,
}

/** Example of `error` alert.  */
export const ErrorAlert = Template.bind({})
ErrorAlert.args = {
  variant: 'error',
  hasIcon: true,
}

/** Example of `success` alert.  */
export const SuccessAlert = Template.bind({})
SuccessAlert.args = {
  variant: 'success',
  hasIcon: true,
}

/** Example of alert without icon.  */
export const AlertWithoutIcon = Template.bind({})
AlertWithoutIcon.args = {
  hasIcon: false,
}

/** Example of a full-width alert. */
export const FullWidthAlert = Template.bind({})
FullWidthAlert.args = {
  isFullWidth: true,
  hasIcon: true,
}
