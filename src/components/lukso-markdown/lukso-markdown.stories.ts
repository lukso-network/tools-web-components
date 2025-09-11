import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'

import './index'

/** Documentation and examples of `lukso-markdown` component.
 * It converts markdown string to HTML and renders it safely via lukso-sanitize.
 * Includes @tailwindcss/typography for beautiful prose styling.
 */
const meta: Meta = {
  title: 'Design System/Components/lukso-markdown',
  component: 'lukso-markdown',
  argTypes: {
    value: {
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
    proseClasses: {
      name: 'prose-classes',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    'is-pre': {
      name: 'isPre',
    },
    'prose-classes': {
      name: 'proseClasses',
    },
  },
  args: {
    value: '## Hello World!\nThis is **markdown** with a [link](/).',
  },
  parameters: {
    controls: {
      exclude: ['convertMarkdownToHtml', 'isPre', 'proseClasses'],
    },
  },
}

export default meta

const Template = ({ value, isPre, proseClasses }) =>
  html`<lukso-markdown
    value=${value}
    ?is-pre=${isPre}
    prose-classes=${proseClasses ? proseClasses : nothing}
  ></lukso-markdown>`

/** Basic example showing simple markdown conversion. */
export const Basic = Template.bind({})

/** Example showing a more complex markdown with lists and code. */
export const Complex = Template.bind({})
Complex.args = {
  value: `## Complex Example

### List
- Item 1
- Item 2
- Item 3

### Code

\`\`\`ts
const greet = (name: string) => 'Hello ' + name
console.log(greet('World'))
\`\`\`

### Table
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |`,
} /** Example showing the use of prose-classes to customize typography styling. More info in [tailwind-typography](https://github.com/tailwindlabs/tailwindcss-typography?tab=readme-ov-file#element-modifiers) */
export const CustomProseClasses = Template.bind({})
CustomProseClasses.args = {
  value: `## Custom Prose Classes

This example uses custom \`prose-classes\` to change the typography styling.

- Text is larger
- Links are blue
- Headings are red`,
  proseClasses: 'prose prose-lg prose-blue prose-headings:text-red-600',
}
