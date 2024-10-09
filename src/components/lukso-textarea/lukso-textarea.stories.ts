import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components'

import './index'

/**  Documentation and examples of `lukso-textarea` component.  */
const meta: Meta = {
  title: 'Design System/Forms/lukso-textarea',
  component: 'lukso-textarea',
  argTypes: {
    value: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
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
    borderless: {
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    isNonResizable: {
      name: 'is-non-resizable',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    rows: {
      control: { type: 'number' },
      table: {
        category: 'Attributes',
      },
    },
    onBlur: {
      name: 'on-blur',
      description: 'Emitted on textarea blur event.',
      table: {
        category: 'Events',
      },
    },
    onChange: {
      name: 'on-change',
      description: 'Emitted on textarea change event.',
      table: {
        category: 'Events',
      },
    },
    onInput: {
      name: 'on-input',
      description: 'Emitted on textarea event.',
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
    onInputClick: {
      name: 'on-input-click',
      description: 'Emitted on textarea click.',
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
    'is-non-resizable': {
      name: 'isNonResizable',
    },
  },
  args: {
    value: '',
    size: 'medium',
    isFullWidth: false,
    isDisabled: false,
    isReadonly: false,
    autofocus: false,
    borderless: false,
    isNonResizable: false,
    name: 'textarea',
    label: '',
    description: '',
    error: '',
    customClass: '',
    placeholder: '',
    rows: 4,
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
        'styles',
        'isNonResizable',
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
  onInputClick,
  borderless,
  size,
  isNonResizable,
  rows,
}) =>
  html`<lukso-textarea
    value=${value}
    name=${name}
    placeholder=${placeholder}
    label=${label}
    description=${description}
    error=${error}
    custom-class=${customClass}
    size=${size ? size : nothing}
    rows=${rows}
    ?is-full-width=${isFullWidth}
    ?autofocus=${autofocus}
    ?is-readonly=${isReadonly}
    ?is-disabled=${isDisabled}
    ?borderless=${borderless}
    ?is-non-resizable=${isNonResizable}
    @on-key-up=${onKeyUp}
    @on-blur=${onBlur}
    @on-change=${onChange}
    @on-key-down=${onKeyDown}
    @on-key-press=${onKeyPress}
    @on-input-click=${onInputClick}
  ></lukso-textarea>`

/** Example of default textarea with `value`.  */
export const DefaultInput = Template.bind({})
DefaultInput.args = {
  value: 'Text Input',
}

/** Example of textarea with `placeholder` text. */
export const PlaceholderText = Template.bind({})
PlaceholderText.args = {
  placeholder: 'Placeholder Text',
}

/** Example of textarea with `label`. */
export const Label = Template.bind({})
Label.args = {
  label: 'Title',
}

/** Example of textarea with `label` and `description`. */
export const LabelAndDescription = Template.bind({})
LabelAndDescription.args = {
  label: 'Title',
  description: 'Description',
}

/** Example of textarea with `error`. */
export const ErrorInput = Template.bind({})
ErrorInput.args = {
  label: 'Title',
  description: 'Description',
  error: 'Error message',
}

/** If you need textarea to take full width of the parent element add `is-full-width` property. */
export const FullWidth = Template.bind({})
FullWidth.args = {
  isFullWidth: true,
}

/** If you need textarea to be focused add `autofocus` property. */
export const Autofocus = Template.bind({})
Autofocus.args = {
  autofocus: true,
}

/** With `borderless` property you can render textarea without border. */
export const Borderless = Template.bind({})
Borderless.args = {
  borderless: true,
  placeholder: '0',
}

/** Example of `small` size textarea. */
export const Small = Template.bind({})
Small.args = {
  size: 'small',
}
