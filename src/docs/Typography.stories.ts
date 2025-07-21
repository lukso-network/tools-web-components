import { html } from 'lit'

import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'Design System/Typography',
  parameters: {
    docs: {
      description: {
        component: `
# Typography

In order to maintain a consistent look and feel with design in terms of the typography,
we have a set of CSS classes that we use. Using \`font-family\`,
\`font-weight\` and \`font-size\` directly in your code should be avoided and instead use this set
of classes.

## Font colors

Colors for the text should be added independently using proper color classes. See example below.

\`\`\`html
<div class="mt-6 sb-unstyled heading-inter-26-semi-bold text-neutral-20">
  Lorem ipsum
</div>
\`\`\`

## Table of contents

- [Headings](#headings)
- [Navbar](#navbar)
- [Paragraph](#paragraph)
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj

const headingClasses = [
  'heading-inter-26-semi-bold',
  'heading-inter-21-semi-bold',
  'heading-inter-17-semi-bold',
  'heading-inter-14-bold',
  'heading-inter-12-bold-uppercase',
  'heading-apax-48-regular',
  'heading-apax-48-bold',
  'heading-apax-44-regular',
  'heading-apax-44-medium',
  'heading-apax-40-regular',
  'heading-apax-40-bold',
  'heading-apax-32-regular',
  'heading-apax-32-medium',
  'heading-apax-24-medium',
]

const navClasses = [
  'nav-apax-14-medium-uppercase',
  'nav-apax-12-medium-uppercase',
  'nav-apax-10-regular',
  'nav-apax-8-medium-uppercase',
]

const paragraphClasses = [
  'paragraph-inter-20-regular',
  'paragraph-inter-16-regular',
  'paragraph-inter-16-semi-bold',
  'paragraph-inter-16-semi-bold-underlined',
  'paragraph-inter-14-regular',
  'paragraph-inter-14-medium',
]

export const Headings: Story = {
  render: () => html`
    <div class="sb-unstyled">
      <h3 id="headings">Headings</h3>
      ${headingClasses.map(
        className => html`
          <div class="p-5 my-6 shadow-neutral-above-shadow rounded sb-unstyled">
            <h4>\`${className}\`</h4>
            <div class="mt-6 sb-unstyled ${className}">
              The quick brown fox jumps over the lazy dog.
            </div>
          </div>
        `
      )}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available heading typography classes in the design system.',
      },
    },
  },
}

export const Navigation: Story = {
  render: () => html`
    <div class="sb-unstyled">
      <h3 id="navbar">Navbar</h3>
      ${navClasses.map(
        className => html`
          <div class="p-5 my-6 shadow-neutral-above-shadow rounded sb-unstyled">
            <h4>\`${className}\`</h4>
            <div class="mt-6 sb-unstyled ${className}">
              The quick brown fox jumps over the lazy dog.
            </div>
          </div>
        `
      )}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Navigation typography classes for navbar and menu items.',
      },
    },
  },
}

export const Paragraphs: Story = {
  render: () => html`
    <div class="sb-unstyled">
      <h3 id="paragraph">Paragraph</h3>
      ${paragraphClasses.map(
        className => html`
          <div class="p-5 my-6 shadow-neutral-above-shadow rounded sb-unstyled">
            <h4>\`${className}\`</h4>
            <div class="mt-6 sb-unstyled ${className}">
              The quick brown fox jumps over the lazy dog.
            </div>
          </div>
        `
      )}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Paragraph typography classes for body text and content.',
      },
    },
  },
}
