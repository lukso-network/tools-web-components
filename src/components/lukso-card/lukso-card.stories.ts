import { html } from 'lit-html'
import './index'

export default {
  title: 'Design System/Components/Card',
  component: 'lukso-card',
  argTypes: {
    hasHeader: {
      control: { type: 'boolean' },
    },
  },
  args: {
    hasHeader: false,
  },
  parameters: {
    controls: {
      exclude: [],
    },
  },
}

const Template = ({ hasHeader }) =>
  html`<lukso-card ?has-header="${hasHeader}"></lukso-card>`

export const Card = Template.bind({})
