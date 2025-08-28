import { html } from 'lit'
import './index'
import { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'Design System/Components/lukso-collapse',
  component: 'lukso-collapse',
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
    label: 'Open',
    open: false,
    customClass: 'border border-neutral-30 rounded-12 overflow-hidden',
    secondaryLabel: { open: 'Open', close: 'Close' },
    icon: 'arrow-down-sm',
  },
  render: args => html`
    <lukso-collapse
      label=${args.label}
      ?open=${args.open}
      custom-class=${args.customClass}
      .secondaryLabel=${args.secondaryLabel}
      icon=${args.icon}
    >
      <div class="p-4">
        This is the default content inside the collapse. It should be hidden
        initially.
      </div>
    </lukso-collapse>
  `,
}

export const DefaultOpen: Story = {
  args: {
    label: 'Advanced',
    open: true,
    customClass: '',
    icon: 'arrow-down-sm',
  },
  render: args => html`
    <lukso-collapse
      label=${args.label}
      ?open=${args.open}
      custom-class=${args.customClass}
      icon=${args.icon}
    >
      <div class="p-4">
        This is the default content inside the collapse. It should be visible
        initially.
      </div>
    </lukso-collapse>
  `,
}

export const WithCustomClass: Story = {
  args: {
    label: 'Custom Styled',
    open: false,
    customClass: 'border rounded-12 bg-blue-100 border-blue-500',
  },
  render: args => html`
    <lukso-collapse
      label=${args.label}
      ?open=${args.open}
      custom-class=${args.customClass}
    >
      <div class="p-4">
        This collapse has a custom class applied to change its appearance.
      </div>
    </lukso-collapse>
  `,
}

export const WithLongContent: Story = {
  args: {
    label: 'Long Content',
    open: false,
    customClass: 'border border-neutral-30 rounded-12 ',
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
