import { html } from 'lit-html'

import type { Meta } from '@storybook/web-components'

import './index'

/**  Documentation and examples of `lukso-input` component.  */
const meta: Meta = {
  title: 'Design System/Forms/lukso-input',
  component: 'lukso-input',
  argTypes: {
    value: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    name: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    type: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    autocomplete: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    ref: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    id: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    placeholder: {
      control: { type: 'text' },
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
    unit: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    isReadonly: {
      name: 'is-readonly',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    isFullWidth: {
      name: 'is-full-width',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    isDisabled: {
      name: 'is-disabled',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    customClass: {
      name: 'custom-class',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    autofocus: {
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    accept: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    min: {
      control: { type: 'number' },
      table: {
        category: 'Attributes',
      },
    },
    max: {
      control: { type: 'number' },
      table: {
        category: 'Attributes',
      },
    },
    borderless: {
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    onBlur: {
      name: 'on-blur',
      description: 'Emitted on input blur event.',
      table: {
        category: 'Events',
      },
    },
    onChange: {
      name: 'on-change',
      description: 'Emitted on input change event.',
      table: {
        category: 'Events',
      },
    },
    onInput: {
      name: 'on-input',
      description: 'Emitted on input event.',
      table: {
        category: 'Events',
      },
    },
    onKeyUp: {
      name: 'on-key-up',
      description: 'Emitted on key up event.',
      table: {
        category: 'Events',
      },
    },
    onKeyDown: {
      name: 'on-key-down',
      description: 'Emitted on key up down.',
      table: {
        category: 'Events',
      },
    },
    onKeyPress: {
      name: 'on-key-press',
      description: 'Emitted on key press.',
      table: {
        category: 'Events',
      },
    },
    onUnitClick: {
      name: 'on-unit-click',
      description: 'Emitted on unit click.',
      table: {
        category: 'Events',
      },
    },
    'is-full-width': {
      name: 'isFullWidth',
    },
    'custom-class': {
      name: 'customClass',
    },
    'is-readonly': {
      name: 'isReadonly',
    },
    'is-disabled': {
      name: 'isDisabled',
    },
  },
  args: {
    type: 'text',
    value: '',
    name: 'input',
    label: '',
    description: '',
    error: '',
    isReadonly: false,
    accept: 'image',
    customClass: '',
    placeholder: '',
    unit: '',
    isFullWidth: false,
    isDisabled: false,
    autofocus: false,
    min: undefined,
    max: undefined,
    borderless: false,
  },
  parameters: {
    controls: {
      exclude: [
        'defaultInputStyles',
        'defaultUnitStyles',
        'isFullWidth',
        'hasHocus',
        'hasHighlight',
        'customClass',
        'isReadonly',
        'isDisabled',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=420%3A3617&t=JAexoWba0Re3ntDk-4',
    },
  },
}

export default meta

const Template = ({
  value,
  name,
  type,
  placeholder,
  label,
  description,
  error,
  unit,
  isFullWidth,
  autofocus,
  min,
  max,
  isReadonly,
  isDisabled,
  customClass,
  accept,
  onBlur,
  onChange,
  onKeyUp,
  onKeyDown,
  onKeyPress,
  onUnitClick,
  borderless,
}) =>
  html`<lukso-input
    value=${value}
    name=${name}
    type=${type}
    placeholder=${placeholder}
    label=${label}
    description=${description}
    error=${error}
    unit=${unit}
    ?is-full-width=${isFullWidth}
    ?autofocus=${autofocus}
    min=${min}
    max=${max}
    ?is-readonly=${isReadonly}
    ?is-disabled=${isDisabled}
    custom-class=${customClass}
    accept=${accept}
    ?borderless=${borderless}
    @on-key-up=${onKeyUp}
    @on-blur=${onBlur}
    @on-change=${onChange}
    @on-key-down=${onKeyDown}
    @on-key-press=${onKeyPress}
    @on-unit-click=${onUnitClick}
  ></lukso-input>`

/** Example of default input with `value`.  */
export const DefaultInput = Template.bind({})
DefaultInput.args = {
  value: 'Text Input',
}

/** Example of input with `placeholder` text. */
export const PlaceholderText = Template.bind({})
PlaceholderText.args = {
  placeholder: 'Placeholder Text',
}

/** Example of input with `label`. */
export const Label = Template.bind({})
Label.args = {
  label: 'Title',
}

/** Example of input with `label` and `description`. */
export const LabelAndDescription = Template.bind({})
LabelAndDescription.args = {
  label: 'Title',
  description: 'Description',
}

/** Example of input with `error`. */
export const Error = Template.bind({})
Error.args = {
  label: 'Title',
  description: 'Description',
  error: 'Error message',
}

/** Example of input with `unit`. */
export const Unit = Template.bind({})
Unit.args = {
  unit: 'unit',
}

/** If you need input to take full width of the parent element add `is-full-width` property. */
export const FullWidth = Template.bind({})
FullWidth.args = {
  isFullWidth: true,
}

/** If you need input to be focused add `autofocus` property. */
export const Autofocus = Template.bind({})
Autofocus.args = {
  autofocus: true,
}

/** With `min` and `max` property you can specify minimum or maximum value that can be entered. It works with `number`, `range`, `date`, `datetime-local`, `month`, `time` and `week` input types */
export const MinMaxValue = Template.bind({})
MinMaxValue.args = {
  min: 1,
  max: 10,
  type: 'number',
}

/** With `borderless` property you can render input without border. */
export const Borderless = Template.bind({})
Borderless.args = {
  borderless: true,
  placeholder: '0',
}
