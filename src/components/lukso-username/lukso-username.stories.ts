import { html } from 'lit-html'
import './index'

export default {
  title: 'Design System/Components/Username',
  component: 'lukso-username',
  argTypes: {
    name: {
      control: { type: 'text' },
    },
    address: {
      control: { type: 'text' },
    },
    maxWidth: {
      control: { type: 'number' },
    },
  },
  args: {
    name: 'John',
    address: '0x9671Db683406EE0817B1f5cB6A3b3BD111477457',
    maxWidth: 200,
  },
  parameters: {
    controls: {
      exclude: [],
    },
  },
}

const Template = ({ name, address, maxWidth }) =>
  html`<lukso-username
    name=${name}
    address=${address}
    max-width=${maxWidth}
  ></lukso-username>`

export const DefaultUsername = Template.bind({})
