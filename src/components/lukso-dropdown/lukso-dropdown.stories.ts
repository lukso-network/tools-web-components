import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components'

import '../lukso-button/index'
import '../lukso-dropdown-option/index'
import './index'

/**  Documentation and examples of `lukso-dropdown` component. */
const meta: Meta = {
  title: 'Design System/Components/lukso-dropdown',
  component: 'lukso-dropdown',
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
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
    trigger: {
      control: { type: 'select' },
      options: ['click', 'hover'],
      table: {
        category: 'Attributes',
      },
    },
    triggerId: {
      control: { type: 'text' },
      description: 'Id of the element that will trigger dropdown open/close.',
      table: {
        category: 'Attributes',
      },
    },
    isOpen: {
      name: 'is-open',
      description: 'Programmatically open/close dropdown.',
      control: { type: 'boolean' },
      table: {
        category: 'Attributes',
      },
    },
    openTop: {
      name: 'open-top',
      description: 'Open dropdown on top.',
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
    isOpenOnOutsideClick: {
      name: 'is-open-on-outside-click',
      description: 'Prevent to close dropdown on outside click.',
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
    maxHeight: {
      name: 'max-height',
      description: 'Set max-height of the dropdown.',
      control: { type: 'number' },
      table: {
        category: 'Attributes',
      },
    },
    onChange: {
      name: 'on-change',
      description: 'Fires when dropdown is opened or closed.',
      table: {
        category: 'Events',
      },
    },
    'is-open': {
      name: 'isOpen',
    },
    'open-top': {
      name: 'openTop',
    },
    'is-right': {
      name: 'isRight',
    },
    'is-open-on-outside-click': {
      name: 'isOpenOnOutsideClick',
    },
    'trigger-id': {
      name: 'triggerId',
    },
    'is-full-width': {
      name: 'isFullWidth',
    },
    'max-height': {
      name: 'maxHeight',
    },
  },
  args: {
    size: 'medium',
    id: '',
    isOpen: true,
    openTop: false,
    isRight: false,
    isOpenOnOutsideClick: true,
    isFullWidth: false,
    align: 'left',
    triggerId: '',
    trigger: 'click',
    marginTop: 0,
    marginBottom: 0,
    maxHeight: undefined,
  },
  parameters: {
    controls: {
      exclude: [
        'marginBottom',
        'marginTop',
        'styles',
        'isOpen',
        'openTop',
        'isRight',
        'align',
        '_isOpen',
        'isOpenOnOutsideClick',
        'triggerId',
        'isFullWidth',
        'onChangeEvent',
        'handleMouseEnter',
        'handleMouseLeave',
        'handleClick',
        'maxHeight',
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
  marginBottom,
  id,
  openTop,
  marginTop,
  size,
  align,
  isRight,
  isOpen,
  isOpenOnOutsideClick,
  triggerId,
  trigger,
  isFullWidth,
  onChange,
  maxHeight,
}) => {
  return html`<div
    class="relative"
    style="margin-bottom: ${marginBottom}px; margin-top: ${marginTop}px; text-align: ${align}; width: 100%;"
  >
    <lukso-button id=${triggerId}>Click me!</lukso-button>
    <lukso-dropdown
      id=${id ? id : nothing}
      trigger-id=${triggerId ? triggerId : nothing}
      trigger=${trigger ? trigger : nothing}
      ?is-open=${isOpen}
      ?open-top=${openTop}
      ?is-right=${isRight}
      ?is-open-on-outside-click=${isOpenOnOutsideClick}
      ?is-full-width=${isFullWidth}
      size=${size ? size : nothing}
      max-height=${maxHeight ? maxHeight : nothing}
      @on-change=${onChange}
    >
      <lukso-dropdown-option size=${size ? size : nothing}
        ><lukso-icon
          size=${size ? size : nothing}
          name="edit"
          class=${size === 'small' ? 'mr-1' : 'mr-2'}
        ></lukso-icon>
        Edit</lukso-dropdown-option
      >
      <lukso-dropdown-option size=${size ? size : nothing}
        ><lukso-icon
          size=${size ? size : nothing}
          name="plus"
          class=${size === 'small' ? 'mr-1' : 'mr-2'}
        ></lukso-icon>
        Add</lukso-dropdown-option
      >
      <div class="border-b border-b-neutral-90 my-1"></div>
      <lukso-dropdown-option size=${size ? size : nothing}
        ><lukso-icon
          size=${size ? size : nothing}
          name="settings"
          class=${size === 'small' ? 'mr-1' : 'mr-2'}
        ></lukso-icon>
        Settings</lukso-dropdown-option
      >
    </lukso-dropdown>
  </div>`
}

/** Example of dropdown.  */
export const Default = Template.bind({})
Default.args = {
  marginBottom: 170,
  triggerId: 'dropdown-1',
}

/** Example of `small` dropdown.  */
export const SmallSize = Template.bind({})
SmallSize.args = {
  marginBottom: 130,
  size: 'small',
  triggerId: 'dropdown-2',
}

/** Example of right side dropdown.  */
export const RightSide = Template.bind({})
RightSide.args = {
  marginBottom: 170,
  triggerId: 'dropdown-4',
  isRight: true,
  align: 'right',
}

/** Example of dropdown that opens to the top.  */
export const OpenTop = Template.bind({})
OpenTop.args = {
  marginTop: 170,
  triggerId: 'dropdown-5',
  openTop: true,
}

/** Example of full width dropdown.  */
export const FullWidth = Template.bind({})
FullWidth.args = {
  marginBottom: 170,
  triggerId: 'dropdown-6',
  isFullWidth: true,
}

/** Example of dropdown triggered on hover.  */
export const HoverTrigger = Template.bind({})
HoverTrigger.args = {
  marginBottom: 170,
  triggerId: 'dropdown-7',
  trigger: 'hover',
}
