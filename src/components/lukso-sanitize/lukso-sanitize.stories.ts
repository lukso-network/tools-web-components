import { html } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'

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
      table: {
        category: 'Attributes',
      },
    },
    isPre: {
      name: 'is-pre',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    'html-content': {
      name: 'htmlContent',
    },
    'is-pre': {
      name: 'isPre',
    },
  },
  args: {
    htmlContent:
      'This is sample text containing html tags like <b>bold</b> or <a class="text-sky-64" href="/">link</a>.',
  },
  parameters: {
    controls: {
      exclude: ['sanitize', 'htmlContent', 'options', 'isPre'],
    },
  },
}

export default meta

const Template = ({ htmlContent, isPre }) =>
  html`<lukso-sanitize
    html-content=${htmlContent}
    ?is-pre=${isPre}
  ></lukso-sanitize>`

/** This is example if text containing HTML tags. */
export const Sanitize = Template.bind({})

/** You can show text with white characters using `is-pre` property. */
export const PreText = Template.bind({})
PreText.args = {
  isPre: true,
  htmlContent: `
This is sample
text that contains
white characters
`,
}
