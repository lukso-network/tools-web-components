import { html } from 'lit-html'
import { expect } from '@storybook/test'

import type { Meta, StoryObj } from '@storybook/web-components-vite'

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

/*** TESTS ***/

const getElement = async (canvasElement: HTMLElement) => {
  const element = canvasElement.querySelector(
    'lukso-sanitize'
  ) as HTMLElement & {
    htmlContent: string
  }
  const innerHtml = element.shadowRoot?.innerHTML
    .trim()
    .replace(/<!--[\s\S]*?-->/g, '') // remove comments

  return { element, innerHtml }
}

/** Test story for sanitize XSS content. */
export const TestSanitizeXSSContent: StoryObj = {
  name: 'Test: Sanitize XSS content',
  args: {
    htmlContent: '<img src="/assets/images/lukso-logo.svg" onerror=alert(1) />',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { innerHtml } = await getElement(canvasElement)
    expect(innerHtml).toBe('<img src="/assets/images/lukso-logo.svg">')
    expect(innerHtml).not.toContain('onerror')
  },
}

/** Test story for sanitize invalid tag. */
export const TestSanitizeInvalidTag: StoryObj = {
  name: 'Test: Sanitize invalid tag',
  args: {
    htmlContent: '<custom-tag>Hello</custom-tag>',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { innerHtml } = await getElement(canvasElement)
    expect(innerHtml).toBe('Hello')
  },
}

/** Test story for allowing lukso tags. */
export const TestAllowLuksoTags: StoryObj = {
  name: 'Test: Allow lukso- custom tags',
  args: {
    htmlContent: '<lukso-button>Click me</lukso-button>',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { innerHtml } = await getElement(canvasElement)
    expect(innerHtml).toBe('<lukso-button>Click me</lukso-button>')
  },
}

/** Test story for allowing target in a tags. */
export const TestAllowTargetInATags: StoryObj = {
  name: 'Test: Allow target in a tags',
  args: {
    htmlContent:
      '<a href="/" target="_blank" rel="noopener noreferrer" custom-attr="value">Link</a>',
  },
  parameters: {
    docs: { disable: true },
  },
  play: async ({ canvasElement }) => {
    const { innerHtml } = await getElement(canvasElement)
    expect(innerHtml).toBe(
      '<a href="/" target="_blank" rel="noopener noreferrer">Link</a>'
    )
  },
}
