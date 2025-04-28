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
  },
  args: {
    size: 'medium',
    id: '',
    isOpen: true,
    openTop: false,
    isRight: false,
    isOpenOnOutsideClick: true,
    isFullWidth: false,
    float: 'left',
    triggerId: '',
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
        'float',
        '_isOpen',
        'isOpenOnOutsideClick',
        'triggerId',
        'isFullWidth',
        'onChangeEvent',
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
  float,
  isRight,
  isOpen,
  isOpenOnOutsideClick,
  triggerId,
  isFullWidth,
  onChange,
}) => {
  return html`<div
    class="relative"
    style="margin-bottom: ${marginBottom}px; margin-top: ${marginTop}px; float: ${float}"
  >
    <lukso-button id=${triggerId} size=${size ? size : nothing}
      >Click me!</lukso-button
    >
    <lukso-dropdown
      id=${id ? id : nothing}
      trigger-id=${triggerId}
      ?is-open=${isOpen}
      ?open-top=${openTop}
      ?is-right=${isRight}
      ?is-open-on-outside-click=${isOpenOnOutsideClick}
      ?is-full-width=${isFullWidth}
      size=${size ? size : nothing}
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
export const DefaultDropdown = Template.bind({})
DefaultDropdown.args = {
  marginBottom: 170,
  triggerId: 'dropdown-1',
}

/** Example of `small` dropdown.  */
export const SmallDropdown = Template.bind({})
SmallDropdown.args = {
  marginBottom: 130,
  size: 'small',
  triggerId: 'dropdown-2',
}
