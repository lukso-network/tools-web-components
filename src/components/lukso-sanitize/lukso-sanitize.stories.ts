import { html } from 'lit-html'
import { Meta } from '@storybook/web-components'

import './index'

/**  Documentation and examples of `lukso-sanitize` component. It's used to show potentially dangerous content or HTML in safe way.
 * One of the common use cases is using HTML tags in texts coming from translations.
 */
const meta: Meta = {
  title: 'Design System/Components/lukso-sanitize',
  component: 'lukso-sanitize',
  argTypes: {
    htmlContent: {
      name: 'html-content',
      control: { type: 'text' },
    },
    'html-content': {
      name: 'htmlContent',
    },
  },
  args: {
    htmlContent:
      'This is sample text containing html tags like <b>bold</b> or <a class="text-sky-64" href="/">link</a>.',
  },
  parameters: {
    controls: {
      exclude: ['sanitize', 'htmlContent', 'options'],
    },
  },
}

export default meta

const Template = ({ htmlContent }) =>
  html`<lukso-sanitize html-content=${htmlContent}></lukso-sanitize>`

/** This is example if text containing HTML tags. */
export const Sanitize = Template.bind({})
