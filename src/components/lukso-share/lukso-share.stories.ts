import { html } from 'lit-html'
import { Meta } from '@storybook/web-components'

import './index'

/**  Documentation and examples of `lukso-share` component. */
const meta: Meta = {
  title: 'Design System/Components/lukso-share',
  component: 'lukso-share',
  argTypes: {
    customClass: {
      name: 'custom-class',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    'custom-class': {
      name: 'customClass',
    },
  },
  args: {
    customClass: '',
  },
  parameters: {
    controls: {
      exclude: ['linkTemplate', 'urls', 'customClass', 'styles'],
    },
  },
}

export default meta

const Template = ({ customClass }) =>
  html`<lukso-share custom-class=${customClass}></lukso-share>`

/** Component render responsive list of links, use `custom-class` property to change layout of the elements. */
export const Default = Template.bind({})
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=1879-22788&t=mhehL8oWD5WMiaZM-4',
  },
}
