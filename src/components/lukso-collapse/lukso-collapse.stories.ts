import { html, nothing } from 'lit'
import './index'
import { useArgs } from 'storybook/internal/preview-api'

import type { Meta } from '@storybook/web-components-vite'

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
    secondaryLabel: {
      control: 'object',
      description: 'Secondary label when open/close',
    },
    icon: { control: 'text', description: 'Icon name to display' },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the collapse is disabled',
    },
  },
}

export default meta

const Template = (args: any) => {
  const [{}] = useArgs()
  return html`
    <lukso-collapse
      label=${args.label}
      ?open=${args.open}
      custom-class=${args.customClass ? args.customClass : nothing}
      .secondaryLabel=${args.secondaryLabel ? args.secondaryLabel : nothing}
      icon=${args.icon ? args.icon : nothing}
      ?is-disabled=${args.isDisabled}
    >
      <div class="p-4">
        ${args.content ? args.content : 'Default collapse content'}
      </div>
    </lukso-collapse>
  `
}

export const DefaultClosed = Template.bind({})
DefaultClosed.args = {
  label: 'Open',
  open: false,
  customClass: 'border border-neutral-30 rounded-12 overflow-hidden',
  secondaryLabel: { open: 'Open', close: 'Close' },
  icon: 'arrow-down-sm',
}

export const DefaultOpen = Template.bind({})
DefaultOpen.args = {
  label: 'Advanced',
  open: true,
  customClass: '',
  icon: 'arrow-down-sm',
}

export const DefaultDisabled = Template.bind({})
DefaultDisabled.args = {
  label: 'Open',
  open: false,
  customClass: 'border border-neutral-30 rounded-12 overflow-hidden',
  secondaryLabel: { open: 'Open', close: 'Close' },
  icon: 'arrow-down-sm',
  isDisabled: true,
}

export const WithCustomClass = Template.bind({})
WithCustomClass.args = {
  label: 'Custom Styled',
  open: false,
  customClass: 'border rounded-12 bg-blue-100 border-blue-500',
}

export const WithLongContent = Template.bind({})
WithLongContent.args = {
  label: 'Long Content',
  open: false,
  customClass: 'border border-neutral-30 rounded-12',
  content: html`
    <div>
      <p>This is a longer piece of content to test the height transition.</p>
      <p>It includes multiple paragraphs.</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
      <p>The collapse should smoothly animate the height change.</p>
    </div>
  `,
}
