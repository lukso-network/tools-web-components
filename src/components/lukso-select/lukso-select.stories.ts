import { html, nothing } from 'lit-html'
import { Meta } from '@storybook/web-components'
import { useArgs } from '@storybook/client-api'

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
    },
    openTop: {
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
  },
  args: {
    value: JSON.stringify({
      id: '2',
      value: 'Second result',
    }),
    label: '',
    description: '',
    error: '',
    isReadonly: false,
    placeholder: '',
    isFullWidth: false,
    isDisabled: false,
    borderless: false,
    id: 'select',
    isOpen: true,
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
      {
        id: '3',
        value: 'Third result',
      },
      {
        id: '3',
        value: 'Third result',
      },
      {
        id: '3',
        value: 'Third result',
      },
      {
        id: '3',
        value: 'Third result',
      },
      {
        id: '3',
        value: 'Third result',
      },
      {
        id: '3',
        value: 'Third result',
      },
    ],
    selected: undefined,
    openTop: false,
  },
  parameters: {
    controls: {
      exclude: [
        'defaultInputStyles',
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
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?type=design&node-id=2093-26038&mode=design&t=VUUsUiVc8b9e2Hxb-4',
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
    selected=${selected ? selected : nothing}
    @on-select=${handleSelect}
    @on-blur=${onBlur}
    value=${value ? value : nothing}
    options=${options ? JSON.stringify(options) : nothing}
    style="margin-bottom: ${marginBottom}px; margin-top: ${marginTop}px;"
  ></lukso-select>`
}

/** Example of select with `string` values.  */
export const DefaultSelect = Template.bind({})
DefaultSelect.args = {
  marginBottom: 150,
}

/** Example of select that open top.  */
export const OpenTop = Template.bind({})
OpenTop.args = {
  marginTop: 150,
  openTop: true,
}
