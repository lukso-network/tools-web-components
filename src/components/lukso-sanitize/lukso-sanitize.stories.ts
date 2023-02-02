import { html } from 'lit-html'
import './index'

export default {
  title: 'Design System/Components/Sanitize',
  component: 'lukso-sanitize',
  argTypes: {
    htmlContent: {
      control: { type: 'text' },
    },
  },
  args: {
    htmlContent:
      'This is sample text containing html tags like <b>bold</b> or <a class="text-sky-64" href="/">link</a>.',
  },
  parameters: {
    controls: {
      exclude: ['sanitize', 'html-content'],
    },
  },
}

const Template = ({ htmlContent }) =>
  html`<lukso-sanitize html-content=${htmlContent}></lukso-sanitize>`

export const Sanitize = Template.bind({})
