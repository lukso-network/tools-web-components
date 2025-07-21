import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'

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
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'x-large'],
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
    rightIcon: {
      name: 'right-icon',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    isRightIconClickable: {
      name: 'is-right-icon-clickable',
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
    onUnitClick: {
      name: 'on-unit-click',
      description: 'Emitted on unit click.',
      table: {
        category: 'Events',
      },
    },
    onInputClick: {
      name: 'on-input-click',
      description: 'Emitted on input click.',
      table: {
        category: 'Events',
      },
    },
    onRightIconClick: {
      name: 'on-right-icon-click',
      description: 'Emitted on right icon click.',
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
    'right-icon': {
      name: 'rightIcon',
    },
    'is-right-icon-clickable': {
      name: 'isRightIconClickable',
    },
    'keep-focus-on-escape': {
      name: 'keepFocusOnEscape',
    },
  },
  args: {
    type: 'text',
    value: '',
    size: 'large',
    isFullWidth: false,
    isDisabled: false,
    isReadonly: false,
    autofocus: false,
    borderless: false,
    isRightIconClickable: false,
    keepFocusOnEscape: false,
    name: 'input',
    label: '',
    unit: '',
    rightIcon: '',
    description: '',
    error: '',
    accept: 'image',
    customClass: '',
    placeholder: '',
    min: undefined,
    max: undefined,
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
        'rightIcon',
        'styles',
        'isRightIconClickable',
        'keepFocusOnEscape',
      ],
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
  onInputClick,
  onRightIconClick,
  borderless,
  size,
  rightIcon,
  isRightIconClickable,
  keepFocusOnEscape,
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
    min=${min}
    max=${max}
    custom-class=${customClass}
    accept=${accept}
    size=${size ? size : nothing}
    right-icon=${rightIcon ? rightIcon : nothing}
    ?is-full-width=${isFullWidth}
    ?autofocus=${autofocus}
    ?is-readonly=${isReadonly}
    ?is-disabled=${isDisabled}
    ?borderless=${borderless}
    ?is-right-icon-clickable=${isRightIconClickable}
    ?keep-focus-on-escape=${keepFocusOnEscape}
    @on-key-up=${onKeyUp}
    @on-blur=${onBlur}
    @on-change=${onChange}
    @on-key-down=${onKeyDown}
    @on-key-press=${onKeyPress}
    @on-unit-click=${onUnitClick}
    @on-input-click=${onInputClick}
    @on-right-icon-click=${onRightIconClick}
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
  description: 'My <i>description</i>',
}

/** Example of input with `error`. */
export const ErrorInput = Template.bind({})
ErrorInput.args = {
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

/** Example of `small` size input. */
export const Small = Template.bind({})
Small.args = {
  size: 'small',
}

/** Example of input with icon on right side. */
export const RightIcon = Template.bind({})
RightIcon.args = {
  rightIcon: 'search',
  // size: 'small',
  // unit: '1',
}
