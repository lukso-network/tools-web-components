import { html } from 'lit-html'
import { Meta } from '@storybook/web-components'

import './index'

/**  Documentation and examples of `lukso-input` component.  */
const meta: Meta = {
  title: 'Design System/Forms/lukso-input',
  component: 'lukso-input',
  argTypes: {
    value: {
      control: { type: 'text' },
    },
    name: {
      control: { type: 'text' },
    },
    type: {
      control: { type: 'text' },
    },

    autocomplete: {
      control: { type: 'boolean' },
    },
    ref: {
      control: { type: 'text' },
    },
    id: {
      control: { type: 'text' },
    },
    testid: {
      control: { type: 'text' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    label: {
      control: { type: 'text' },
    },
    description: {
      control: { type: 'text' },
    },
    error: {
      control: { type: 'text' },
    },
    unit: {
      control: { type: 'text' },
    },
    isReadonly: {
      name: 'is-readonly',
      control: { type: 'boolean' },
    },
    isFullWidth: {
      name: 'is-full-width',
      control: { type: 'boolean' },
    },
    autofocus: {
      control: { type: 'boolean' },
    },
    accept: {
      control: { type: 'text' },
    },
    min: {
      control: { type: 'number' },
    },
    max: {
      control: { type: 'number' },
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
    'is-full-width': {
      name: 'isFullWidth',
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
    placeholder: '',
    unit: '',
    isFullWidth: false,
    autofocus: false,
    min: undefined,
    max: undefined,
  },
  parameters: {
    controls: {
      exclude: [
        'defaultInputStyles',
        'defaultUnitStyles',
        'isFullWidth',
        'hasHocus',
        'hasHighlight',
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
  accept,
  onBlur,
  onChange,
  onKeyUp,
  onKeyDown,
  onKeyPress,
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
    accept=${accept}
    @on-key-up=${onKeyUp}
    @on-blur=${onBlur}
    @on-change=${onChange}
    @on-key-down=${onKeyDown}
    @on-key-press=${onKeyPress}
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
