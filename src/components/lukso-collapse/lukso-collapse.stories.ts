import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'
import './index'
import '../lukso-select/index'

/**  Documentation and examples of `lukso-collapse` component. */
const meta: Meta = {
  title: 'Design System/Forms/lukso-collapse',
  component: 'lukso-collapse',
  argTypes: {
    triggerLabel: {
      name: 'trigger-label',
      control: { type: 'text' },
      description: 'The label for the collapse trigger',
      table: {
        category: 'Attributes',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'x-large'],
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
    toggleLabel: {
      name: 'toggle-label',
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
    label: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    description: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    error: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    'trigger-label': {
      name: 'triggerLabel',
    },
    'custom-class': {
      name: 'customClass',
    },
    'toggle-label': {
      name: 'toggleLabel',
    },
    'is-open': {
      name: 'isOpen',
    },
    'is-disabled': {
      name: 'isDisabled',
    },
  },
  args: {
    size: 'large',
    triggerLabel: 'Open',
    toggleLabel: undefined,
    icon: '',
    label: '',
    description: '',
    error: '',
    isOpen: false,
    isDisabled: false,
    customClass: '',
  },
  parameters: {
    controls: {
      exclude: [
        'customClass',
        'toggleLabel',
        'toggleLabel',
        'isDisabled',
        'isOpen',
        'maxHeight',
        'observedHeight',
        'collapseContainer',
        'collapseStyles',
        'contentElement',
        'resizeObserver',
        'onTransitionEnd',
        'triggerLabel',
      ],
    },
  },
}

export default meta

const Template = ({
  triggerLabel,
  isOpen,
  customClass,
  toggleLabel,
  icon,
  isDisabled,
  size,
  content,
  label,
  description,
  error,
}) => {
  return html`
    <lukso-collapse
      trigger-label=${triggerLabel ? triggerLabel : nothing}
      toggle-label=${toggleLabel ? toggleLabel : nothing}
      icon=${icon ? icon : nothing}
      label=${label ? label : nothing}
      description=${description ? description : nothing}
      error=${error ? error : nothing}
      ?is-open=${isOpen}
      ?is-disabled=${isDisabled}
      size=${size ? size : nothing}
      custom-class=${customClass ? customClass : nothing}
    >
      <div class="p-3">${content ? content : 'Default collapse content'}</div>
    </lukso-collapse>
  `
}

/** Example of `small` size */
export const CollapseSmall = Template.bind({})
CollapseSmall.args = {
  size: 'small',
}

/** Example of `medium` size */
export const CollapseMedium = Template.bind({})
CollapseMedium.args = {
  size: 'medium',
}

/** Example of `large` size */
export const CollapseLarge = Template.bind({})
CollapseLarge.args = {
  size: 'large',
}

/** Example of `x-large` size */
export const CollapseXLarge = Template.bind({})
CollapseXLarge.args = {
  size: 'x-large',
}

/** Example of custom labels and icon */
export const CustomLabels = Template.bind({})
CustomLabels.args = {
  triggerLabel: 'Toggle Collapse',
  toggleLabel: { open: 'Open', close: 'Close' },
  icon: 'arrow-down-sm',
}

/** Example with `label` and `description`. */
export const LabelAndDescription = Template.bind({})
LabelAndDescription.args = {
  label: 'Title',
  description: 'My <i>description</i>',
}

/** Example of collapse with `error` */
export const CollapseError = Template.bind({})
CollapseError.args = {
  error: 'This is an error message for the collapse component.',
}

/** Example of lukso-collapse `open` by default */
export const CollapseOpen = Template.bind({})
CollapseOpen.args = {
  isOpen: true,
  content: html`
    <div>
      <p>Collapse open by default.</p>
    </div>
  `,
}

/** Example of lukso-collapse `disabled` */
export const CollapseDisabled = Template.bind({})
CollapseDisabled.args = {
  isDisabled: true,
}

/** Example of lukso-collapse with a `custom CSS class` */
export const CollapseWithCustomClass = Template.bind({})
CollapseWithCustomClass.args = {
  customClass: 'border-0',
  content: html`
    <div>
      <p>Collapse with custom colors.</p>
    </div>
  `,
}

/** Example of lukso-collapse with `longer content` */
export const CollapseWithLongContent = Template.bind({})
CollapseWithLongContent.args = {
  content: html`
    <div>
      <p>This is a longer piece of content to test the height transition.</p>
      <p>It includes multiple paragraphs.</p>
      <div>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
      <p>The collapse should smoothly animate the height change.</p>
    </div>
  `,
}

/** Example of lukso-collapse with a `selector` as content */
export const CollapseWithSelector = Template.bind({})
CollapseWithSelector.args = {
  content: html`
    <div class="flex ">
      <lukso-select
        value='{"id":"1","value":"First result"}'
        size="large"
        max-height="200"
        options='[{"id":"1","value":"First result"},{"id":"2","value":"Second result"},{"id":"3","value":"Third result"}]'
      ></lukso-select>
    </div>
  `,
}
