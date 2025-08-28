import { html, nothing } from 'lit-html'
import { useArgs } from 'storybook/preview-api'

import type { Meta } from '@storybook/web-components-vite'
import './index'

const meta: Meta = {
  title: 'Design System/Forms/lukso-collapse',
  component: 'lukso-collapse',
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'The label for the collapse header',
      table: {
        category: 'Attributes',
      },
    },
    isOpen: {
      name: 'is-open',
      control: { type: 'boolean' },
      description: 'Whether the collapse is open by default',
      table: {
        category: 'Attributes',
      },
    },
    customClass: {
      name: 'custom-class',
      control: { type: 'text' },
      description: 'Custom CSS class for the outer container',
      table: {
        category: 'Attributes',
      },
    },
    secondaryLabel: {
      name: 'secondary-label',
      control: { type: 'object' },
      description: 'Secondary label when open/close',
      table: {
        category: 'Attributes',
      },
    },
    icon: {
      control: { type: 'text' },
      description: 'Icon name to display',
      table: {
        category: 'Attributes',
      },
    },
    isDisabled: {
      name: 'is-disabled',
      control: { type: 'boolean' },
      description: 'Whether the collapse is disabled',
      table: {
        category: 'Attributes',
      },
    },
    'custom-class': {
      name: 'customClass',
    },
    'secondary-label': {
      name: 'secondaryLabel',
    },
    'is-open': {
      name: 'isOpen',
    },
    'is-disabled': {
      name: 'isDisabled',
    },
  },
  args: {
    label: '',
    isOpen: false,
    customClass: '',
    secondaryLabel: undefined,
    icon: '',
    isDisabled: false,
    maxHeight: '0px',
    collapseContainer: undefined,
    collapseStyles: undefined,
  },
  parameters: {
    controls: {
      exclude: [
        'customClass',
        'secondaryLabel',
        'isDisabled',
        'isOpen',
        'maxHeight',
        'collapseContainer',
        'collapseStyles',
      ],
    },
  },
}

export default meta

const Template = ({
  label,
  isOpen,
  customClass,
  secondaryLabel,
  icon,
  isDisabled,
  size,
  content,
}) => {
  const [{}] = useArgs()
  return html`
    <lukso-collapse
      label=${label ? label : nothing}
      ?is-open=${isOpen}
      custom-class=${customClass ? customClass : nothing}
      .secondaryLabel=${secondaryLabel ? secondaryLabel : nothing}
      icon=${icon ? icon : nothing}
      ?is-disabled=${isDisabled}
      size=${size ? size : nothing}
    >
      <div class="p-4">${content ? content : 'Default collapse content'}</div>
    </lukso-collapse>
  `
}

export const DefaultClosed = Template.bind({})
DefaultClosed.args = {
  label: 'Open',
  isOpen: false,
  customClass: 'border border-neutral-30 rounded-12 overflow-hidden',
  secondaryLabel: { open: 'Open', close: 'Close' },
  icon: 'arrow-down-sm',
}

export const DefaultOpen = Template.bind({})
DefaultOpen.args = {
  label: 'Advanced',
  isOpen: true,
  customClass: 'border border-neutral-30 rounded-12 overflow-hidden',
  icon: 'arrow-down-sm',
}

export const DefaultDisabled = Template.bind({})
DefaultDisabled.args = {
  label: 'Open',
  isOpen: false,
  customClass: 'border border-neutral-30 rounded-12 overflow-hidden',
  secondaryLabel: { open: 'Open', close: 'Close' },
  icon: 'arrow-down-sm',
  isDisabled: true,
}

export const WithCustomClass = Template.bind({})
WithCustomClass.args = {
  label: 'Custom Styled',
  isOpen: false,
  customClass: 'border rounded-12 bg-blue-100 border-blue-500',
}

export const WithLongContent = Template.bind({})
WithLongContent.args = {
  label: 'Long Content',
  isOpen: false,
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
