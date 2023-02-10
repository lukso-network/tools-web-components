import { html } from 'lit-html'
import './index'

/**  Documentation and examples of `lukso-input` component.  */
export default {
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
    isFullWidth: {
      control: { type: 'boolean' },
    },
    onKeyUp: {
      description: 'Emitted on key up event.',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    type: 'text',
    value: '',
    name: 'input',
    label: '',
    description: '',
    error: '',
    placeholder: '',
    unit: '',
    isFullWidth: false,
  },
  parameters: {
    controls: {
      exclude: [
        'defaultInputStyles',
        'defaultUnitStyles',
        'is-full-width',
        'hasHocus',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=420%3A3617&t=JAexoWba0Re3ntDk-4',
    },
  },
}

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
    @on-key-up="handleKeyUp"
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
