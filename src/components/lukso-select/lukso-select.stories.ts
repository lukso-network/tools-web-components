import { html, nothing } from 'lit-html'
import { useArgs } from 'storybook/preview-api'

import type { Meta } from '@storybook/web-components-vite'

import './index'

/**  Documentation and examples of `lukso-select` component. */
const meta: Meta = {
  title: 'Design System/Forms/lukso-select',
  component: 'lukso-select',
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
    isOpen: {
      name: 'is-open',
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
    options: {
      control: { type: 'object' },
      table: {
        category: 'Attributes',
      },
    },
    selected: {
      control: { type: 'number' },
      table: {
        category: 'Attributes',
      },
      type: { name: 'number' },
    },
    openTop: {
      name: 'open-top',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    isLargeIcon: {
      name: 'is-large-icon',
      description: 'Size of dropdown trigger arrow.',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    isRight: {
      name: 'is-right',
      description: 'Align dropdown to right side.',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    showSelectionCounter: {
      name: 'show-selection-counter',
      description: 'Show counter for selected items.',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    onSelect: {
      name: 'on-select',
      description: 'Emitted on select element from the dropdown.',
      table: {
        category: 'Events',
      },
    },
    onBlur: {
      name: 'on-blur',
      description: 'Emitted on input blur event.',
      table: {
        category: 'Events',
      },
    },
    maxHeight: {
      name: 'max-height',
      description: 'Set max-height of the dropdown.',
      control: { type: 'number' },
      table: {
        category: 'Attributes',
      },
      type: { name: 'number' },
    },
    'is-full-width': {
      name: 'isFullWidth',
    },
    'is-readonly': {
      name: 'isReadonly',
    },
    'is-disabled': {
      name: 'isDisabled',
    },
    'is-open': {
      name: 'isOpen',
    },
    'open-top': {
      name: 'openTop',
    },
    'is-large-icon': {
      name: 'isLargeIcon',
    },
    'show-selection-counter': {
      name: 'showSelectionCounter',
    },
    'is-right': {
      name: 'isRight',
    },
    'max-height': {
      name: 'maxHeight',
    },
  },
  args: {
    value: JSON.stringify({
      id: '2',
      value: 'Second result',
    }),
    size: 'large',
    label: '',
    description: '',
    error: '',
    id: '',
    placeholder: '',
    isReadonly: false,
    isFullWidth: false,
    isDisabled: false,
    borderless: false,
    isOpen: true,
    openTop: false,
    isLargeIcon: false,
    isRight: false,
    showSelectionCounter: false,
    options: [
      {
        id: '1',
        value: 'First result',
      },
      {
        id: '2',
        value: 'Second result',
      },
      {
        id: '3',
        value: 'Third result',
      },
    ],
    selected: '',
    float: 'left',
    maxHeight: '',
  },
  parameters: {
    controls: {
      exclude: [
        'isFullWidth',
        'hasFocus',
        'hasHighlight',
        'isReadonly',
        'isDisabled',
        'marginBottom',
        'marginTop',
        'optionsParsed',
        'valueParsed',
        'styles',
        'isOpen',
        'openTop',
        'isLargeIcon',
        'inputStyles',
        'dropdownWrapperStyles',
        'optionsStyles',
        'iconStyles',
        'isRight',
        'showSelectionCounter',
        'counterStyles',
        'float',
        'maxHeight',
      ],
    },
  },
}

export default meta

const Template = ({
  placeholder,
  label,
  description,
  error,
  isFullWidth,
  isReadonly,
  isDisabled,
  isOpen,
  borderless,
  onBlur,
  onSelect,
  selected,
  marginBottom,
  id,
  openTop,
  marginTop,
  isLargeIcon,
  size,
  float,
  isRight,
  showSelectionCounter,
  maxHeight,
}) => {
  const [{ options, value }, updateArgs] = useArgs()

  const handleSelect = (event: CustomEvent) => {
    onSelect(event)
    updateArgs({ value: JSON.stringify(event.detail.value) })
  }

  return html`<lukso-select
    placeholder=${placeholder ? placeholder : nothing}
    label=${label ? label : nothing}
    description=${description ? description : nothing}
    error=${error ? error : nothing}
    id=${id ? id : nothing}
    ?is-full-width=${isFullWidth}
    ?is-readonly=${isReadonly}
    ?is-disabled=${isDisabled}
    ?is-open=${isOpen}
    ?borderless=${borderless}
    ?open-top=${openTop}
    ?is-large-icon=${isLargeIcon}
    ?is-right=${isRight}
    ?show-selection-counter=${showSelectionCounter}
    selected=${selected ? selected : nothing}
    @on-select=${handleSelect}
    @on-blur=${onBlur}
    value=${value ? value : nothing}
    size=${size ? size : nothing}
    max-height=${maxHeight ? maxHeight : nothing}
    options=${options ? JSON.stringify(options) : nothing}
    style="margin-bottom: ${marginBottom}px; margin-top: ${marginTop}px; float: ${float}"
  ></lukso-select>`
}

/** Example of select with `string` values.  */
export const DefaultSelect = Template.bind({})
DefaultSelect.args = {
  marginBottom: 160,
}

/** Example with form decorators: `label`, `description` and `error`. */
export const FormDecorators = Template.bind({})
FormDecorators.args = {
  label: 'Title label',
  description: 'My component <i>description</i> text',
  error: 'Error <i>message</i>',
  isOpen: false,
}

/** Example of full width select.  */
export const FullWidthSelect = Template.bind({})
FullWidthSelect.args = {
  marginBottom: 160,
  isFullWidth: true,
}

/** With `placeholder` value you can set fixed text in selection trigger.  */
export const Placeholder = Template.bind({})
Placeholder.args = {
  marginBottom: 160,
  placeholder: 'Select value...',
}

/** Example of select that open top.  */
export const OpenTop = Template.bind({})
OpenTop.args = {
  marginTop: 160,
  openTop: true,
}

/** Example of select with `profile` values.  */
export const ProfileSelect = Template.bind({})
ProfileSelect.args = {
  options: [
    {
      id: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      address: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      name: 'profile1',
      image: 'images/sample-avatar.jpg',
    },
    {
      id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      address: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
      name: 'profile1',
      image: '',
    },
    {
      id: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      address: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
    },
    {
      id: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      address: '0x64DE43F67e533b59A5791E6aB1e5a80626E10710',
      isEOA: true,
    },
  ],
  value: JSON.stringify({
    id: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
    address: '0x3de6b0ad6900E1Efc9C4485a45E7e76019200c49',
    name: 'profile1',
    image: '',
  }),
  marginBottom: 200,
}

/** Example of `small` select.  */
export const SmallSelect = Template.bind({})
SmallSelect.args = {
  marginBottom: 120,
  size: 'small',
}

/** Example of `medium` select.  */
export const MediumSelect = Template.bind({})
MediumSelect.args = {
  marginBottom: 160,
  size: 'medium',
}

/** Example of `large` select.  */
export const LargeSelect = Template.bind({})
LargeSelect.args = {
  marginBottom: 160,
  size: 'large',
}

/** Example of multi select.  */
export const MultiSelect = Template.bind({})
MultiSelect.args = {
  marginBottom: 160,
  value: JSON.stringify([
    {
      id: '2',
      value: 'Second result',
    },
    {
      id: '3',
      value: 'Third result',
    },
  ]),
}

/** Example of right side dropdown.  */
export const RightSideDropdown = Template.bind({})
RightSideDropdown.args = {
  marginBottom: 160,
  isRight: true,
  float: 'right',
}

/** Example of grouped select.  */
export const GroupedSelect = Template.bind({})
GroupedSelect.args = {
  marginBottom: 270,
  value: JSON.stringify({
    id: 'group-1-blue',
    group: 'Color',
    value: 'Blue',
  }),
  options: [
    {
      id: 'group-1-red',
      group: 'Color',
      value: 'Red',
    },
    {
      id: 'group-1-blue',
      group: 'Color',
      value: 'Blue',
    },
    {
      id: 'group-1-green',
      group: 'Color',
      value: 'Green',
    },
    {
      id: 'group-2-small',
      group: 'Size',
      value: 'Small',
    },
    {
      id: 'group-2-medium',
      group: 'Size',
      value: 'Medium',
    },
  ],
}

/** Example of selection counter.  */
export const CountSelections = Template.bind({})
CountSelections.args = {
  marginBottom: 120,
  value: JSON.stringify({
    id: '2',
    value: 'Second result',
  }),
  showSelectionCounter: true,
  size: 'small',
}

const badge = html`<span
  slot="right"
  style="
    background: #f0eaf8;
    color: #6b21a8;
    border-radius: 9999px;
    padding: 2px 10px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  "
  >LSP7 NDT</span
>`

/** Example with a badge in the `right` slot, positioned between the selected value and the chevron icon. */
export const WithBadge = {
  render: () => {
    const [{ options, value }, updateArgs] = useArgs()

    const handleSelect = (event: CustomEvent) => {
      updateArgs({ value: JSON.stringify(event.detail.value) })
    }

    return html`<lukso-select
      label="Token Standard"
      value=${value ? value : nothing}
      options=${options ? JSON.stringify(options) : nothing}
      @on-select=${handleSelect}
      style="margin-bottom: 160px"
    >
      ${badge}
    </lukso-select>`
  },
  args: {
    options: [
      { id: '1', value: 'First result' },
      { id: '2', value: 'Second result' },
      { id: '3', value: 'Third result' },
    ],
    value: JSON.stringify({ id: '2', value: 'Second result' }),
  },
}

/** Example with a badge in the `right` slot and `is-full-width`. */
export const FullWidthWithBadge = {
  render: () => {
    const [{ options, value }, updateArgs] = useArgs()

    const handleSelect = (event: CustomEvent) => {
      updateArgs({ value: JSON.stringify(event.detail.value) })
    }

    return html`<lukso-select
      label="Token Standard"
      is-full-width
      value=${value ? value : nothing}
      options=${options ? JSON.stringify(options) : nothing}
      @on-select=${handleSelect}
      style="margin-bottom: 160px"
    >
      ${badge}
    </lukso-select>`
  },
  args: {
    options: [
      { id: '1', value: 'First result' },
      { id: '2', value: 'Second result' },
      { id: '3', value: 'Third result' },
    ],
    value: JSON.stringify({ id: '2', value: 'Second result' }),
  },
}

/** Example with a badge in the `right` slot, `is-full-width`, secondary label and tooltip on options. */
export const FullWidthWithBadgeSecondaryLabelTooltip = {
  render: () => {
    const [{ options, value }, updateArgs] = useArgs()

    const handleSelect = (event: CustomEvent) => {
      updateArgs({ value: JSON.stringify(event.detail.value) })
    }

    return html`<lukso-select
      label="Token Standard"
      is-full-width
      value=${value ? value : nothing}
      options=${options ? JSON.stringify(options) : nothing}
      @on-select=${handleSelect}
      style="margin-bottom: 160px"
      size="medium"
    >
      ${badge}
    </lukso-select>`
  },
  args: {
    options: [
      {
        id: '1',
        value: 'First result',
        secondaryValue: 'LSP7',
        tooltip: 'Token standard info',
        type: 'secondary-with-tooltip',
      },
      {
        id: '2',
        value: 'Second result',
        secondaryValue: 'LSP8',
        tooltip: 'Token standard info',
        type: 'secondary-with-tooltip',
      },
      {
        id: '3',
        value: 'Third result',
        secondaryValue: 'LSP9',
        tooltip: 'Token standard info',
        type: 'secondary-with-tooltip',
      },
    ],
    value: JSON.stringify({
      id: '2',
      value: 'Second result',
      secondaryValue: 'LSP8',
      tooltip: 'Token standard info',
      type: 'secondary-with-tooltip',
    }),
  },
}
