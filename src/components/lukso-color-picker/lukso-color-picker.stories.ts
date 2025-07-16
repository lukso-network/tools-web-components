import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components'

import './index'

/**  Documentation and examples of `lukso-color-picker` component.  */
const meta: Meta = {
  title: 'Design System/Forms/lukso-color-picker',
  component: 'lukso-color-picker',
  argTypes: {
    value: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
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
    id: {
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
    keepFocusOnEscape: {
      name: 'keep-focus-on-escape',
      control: { type: 'boolean' },
      description: 'Keep input focus on escape hit.',
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
    'keep-focus-on-escape': {
      name: 'keepFocusOnEscape',
    },
  },
  args: {
    value: '#2A70C0',
    size: 'large',
    isFullWidth: false,
    isDisabled: false,
    isReadonly: false,
    autofocus: false,
    keepFocusOnEscape: false,
    name: 'input',
    label: '',
    description: '',
    error: '',
    customClass: '',
    placeholder: '#000000',
  },
  parameters: {
    controls: {
      exclude: [
        'isFullWidth',
        'hasFocus',
        'hasHighlight',
        'customClass',
        'isReadonly',
        'isDisabled',
        'inputStyles',
        'styles',
        'keepFocusOnEscape',
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
  placeholder,
  label,
  description,
  error,
  isFullWidth,
  autofocus,
  isReadonly,
  isDisabled,
  customClass,
  onBlur,
  onChange,
  onKeyUp,
  onKeyDown,
  onKeyPress,
  onInput,
  size,
  keepFocusOnEscape,
}) =>
  html`<lukso-color-picker
    value=${value}
    name=${name}
    placeholder=${placeholder}
    label=${label}
    description=${description}
    error=${error}
    custom-class=${customClass}
    size=${size ? size : nothing}
    ?is-full-width=${isFullWidth}
    ?autofocus=${autofocus}
    ?is-readonly=${isReadonly}
    ?is-disabled=${isDisabled}
    ?keep-focus-on-escape=${keepFocusOnEscape}
    @on-key-up=${onKeyUp}
    @on-blur=${onBlur}
    @on-change=${onChange}
    @on-input=${onInput}
    @on-key-down=${onKeyDown}
    @on-key-press=${onKeyPress}
  ></lukso-color-picker>`

/** Example of default input with `value`.  */
export const DefaultInput = Template.bind({})

/** Example of input with `placeholder` text. */
export const PlaceholderText = Template.bind({})
PlaceholderText.args = {
  placeholder: 'Placeholder Text',
  value: '',
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
export const ErrorInput = Template.bind({})
ErrorInput.args = {
  label: 'Title',
  description: 'Description',
  error: 'Error message',
}

/** If you need input to take full width of the parent element add `is-full-width` property. */
export const FullWidth = Template.bind({})
FullWidth.args = {
  isFullWidth: true,
}

/** Example of `small` size input. */
export const SmallSize = Template.bind({})
SmallSize.args = {
  size: 'small',
}

/** Example of `medium` size input. */
export const MediumSize = Template.bind({})
MediumSize.args = {
  size: 'medium',
}
