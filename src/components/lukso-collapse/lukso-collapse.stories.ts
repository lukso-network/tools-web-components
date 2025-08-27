import { html } from 'lit'
import './index' // Adjust the import path based on your project structure
import { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'Components/LuksoCollapse',
  component: 'lukso-collapse',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label for the collapse header',
    },
    open: {
      control: 'boolean',
      description: 'Whether the collapse is open by default',
    },
    customClass: {
      control: 'text',
      description: 'Custom CSS class for the outer container',
    },
  },
}

export default meta

type Story = StoryObj

export const DefaultClosed: Story = {
  args: {
    label: 'Advanced',
    open: false,
    customClass: '',
  },
  render: args => html`
    <lukso-collapse
      label=${args.label}
      ?open=${args.open}
      custom-class=${args.customClass}
    >
      This is the default content inside the collapse. It should be hidden
      initially.
    </lukso-collapse>
  `,
}

export const DefaultOpen: Story = {
  args: {
    label: 'Advanced',
    open: true,
    customClass: '',
  },
  render: args => html`
    <lukso-collapse
      label=${args.label}
      ?open=${args.open}
      custom-class=${args.customClass}
    >
      This is the default content inside the collapse. It should be visible
      initially.
    </lukso-collapse>
  `,
}

export const WithCustomClass: Story = {
  args: {
    label: 'Custom Styled',
    open: false,
    customClass: 'bg-blue-100 border-blue-500',
  },
  render: args => html`
    <lukso-collapse
      label=${args.label}
      ?open=${args.open}
      custom-class=${args.customClass}
    >
      This collapse has a custom class applied to change its appearance.
    </lukso-collapse>
  `,
}

export const WithLongContent: Story = {
  args: {
    label: 'Long Content',
    open: false,
    customClass: '',
  },
  render: args => html`
    <lukso-collapse
      label=${args.label}
      ?open=${args.open}
      custom-class=${args.customClass}
    >
      <div class="p-4">
        <p>This is a longer piece of content to test the height transition.</p>
        <p>It includes multiple paragraphs.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <p>The collapse should smoothly animate the height change.</p>
      </div>
    </lukso-collapse>
  `,
}

export const WithNestedComponents: Story = {
  args: {
    label: 'Nested',
    open: false,
    customClass: '',
  },
  render: args => html`
    <lukso-collapse
      label=${args.label}
      ?open=${args.open}
      custom-class=${args.customClass}
    >
      <p>Outer content.</p>
      <lukso-collapse label="Inner Collapse" ?open=${false}>
        This is nested content inside another collapse.
      </lukso-collapse>
    </lukso-collapse>
  `,
}
