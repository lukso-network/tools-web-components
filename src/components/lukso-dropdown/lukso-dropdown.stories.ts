import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'
import '../lukso-button/index'
import '../lukso-dropdown-option/index'
import '../lukso-icon/index'
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
    position: {
      description:
        'Controls dropdown placement. "auto" (default) measures the trigger\'s viewport position and opens toward the nearest edge. Use explicit values like "bottom-left", "bottom-right", "top-left", "top-right" to force a fixed direction.',
      control: { type: 'select' },
      options: ['auto', 'bottom-left', 'bottom-right', 'top-left', 'top-right'],
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
    customClass: {
      name: 'custom-class',
      control: { type: 'text' },
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
    'custom-class': {
      name: 'customClass',
    },
  },
  args: {
    size: 'large',
    id: '',
    isOpen: true,
    position: 'bottom-left',
    isOpenOnOutsideClick: true,
    isFullWidth: false,
    align: 'left',
    triggerId: '',
    trigger: 'click',
    marginTop: 0,
    marginBottom: 0,
    maxHeight: undefined,
    customClass: '',
  },
  parameters: {
    controls: {
      exclude: [
        'marginBottom',
        'marginTop',
        'styles',
        'isOpen',
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
        'customClass',
      ],
    },
  },
}

export default meta

const Template = ({
  marginBottom,
  id,
  marginTop,
  size,
  align,
  position,
  isOpen,
  isOpenOnOutsideClick,
  triggerId,
  trigger,
  isFullWidth,
  onChange,
  maxHeight,
  customClass,
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
      position=${position ? position : nothing}
      ?is-open-on-outside-click=${isOpenOnOutsideClick}
      ?is-full-width=${isFullWidth}
      size=${size ? size : nothing}
      max-height=${maxHeight ? maxHeight : nothing}
      custom-class=${customClass ? customClass : nothing}
      @on-change=${onChange}
    >
      <lukso-dropdown-option size=${size ? size : nothing}
        ><lukso-icon
          size=${size === 'small' ? 'small' : 'medium'}
          name="edit"
          class=${size === 'small' ? 'mr-1' : 'mr-2'}
        ></lukso-icon>
        Edit</lukso-dropdown-option
      >
      <lukso-dropdown-option size=${size ? size : nothing}
        ><lukso-icon
          size=${size === 'small' ? 'small' : 'medium'}
          name="plus"
          class=${size === 'small' ? 'mr-1' : 'mr-2'}
        ></lukso-icon>
        Add</lukso-dropdown-option
      >
      <div class="border-b border-b-neutral-90 my-1"></div>
      <lukso-dropdown-option size=${size ? size : nothing}
        ><lukso-icon
          size=${size === 'small' ? 'small' : 'medium'}
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
  triggerId: 'dropdown-small',
}

/** Example of `medium` dropdown.  */
export const MediumSize = Template.bind({})
MediumSize.args = {
  marginBottom: 130,
  size: 'medium',
  triggerId: 'dropdown-medium',
}

/** Dropdown opens below the trigger, aligned to the left edge. */
export const BottomLeft = Template.bind({})
BottomLeft.args = {
  marginBottom: 170,
  triggerId: 'dropdown-bottom-left',
  position: 'bottom-left',
}

/** Dropdown opens below the trigger, aligned to the right edge. */
export const BottomRight = Template.bind({})
BottomRight.args = {
  marginBottom: 170,
  triggerId: 'dropdown-bottom-right',
  position: 'bottom-right',
  align: 'right',
}

/** Dropdown opens above the trigger, aligned to the left edge. */
export const TopLeft = Template.bind({})
TopLeft.args = {
  marginTop: 170,
  triggerId: 'dropdown-top-left',
  position: 'top-left',
}

/** Dropdown opens above the trigger, aligned to the right edge. */
export const TopRight = Template.bind({})
TopRight.args = {
  marginTop: 170,
  triggerId: 'dropdown-top-right',
  position: 'top-right',
  align: 'right',
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

/** You can pass any custom CSS class using `custom-class` property. */
export const CustomClass = Template.bind({})
CustomClass.args = {
  marginBottom: 170,
  triggerId: 'dropdown-8',
  customClass: 'border-purple-51',
}

/**
 * Scroll horizontally or vertically to move the button across the viewport midpoint —
 * the dropdown flips left/right and up/down automatically.
 */
export const AutoPositionScroll = () => html`
  <div style="overflow: auto; width: 100%; height: 300px;">
    <div style="width: 250vw; height: 150vh; position: relative;">
      <!-- button is centered in the scrollable area so you can scroll it to any edge -->
      <div
        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
      >
        <div class="relative">
          <lukso-button id="dropdown-auto-scroll">Click me!</lukso-button>
          <lukso-dropdown
            trigger-id="dropdown-auto-scroll"
            position="auto"
            size="large"
          >
            <lukso-dropdown-option
              ><lukso-icon name="edit" class="mr-2"></lukso-icon
              >Edit</lukso-dropdown-option
            >
            <lukso-dropdown-option
              ><lukso-icon name="plus" class="mr-2"></lukso-icon
              >Add</lukso-dropdown-option
            >
            <div class="border-b border-b-neutral-90 my-1"></div>
            <lukso-dropdown-option
              ><lukso-icon name="settings" class="mr-2"></lukso-icon
              >Settings</lukso-dropdown-option
            >
          </lukso-dropdown>
        </div>
      </div>
    </div>
  </div>
  <p style="color: #888; font-size: 13px; margin-top: 8px;">
    Scroll to position the button near an edge, then click to open — the
    dropdown flips left/right and up/down automatically.
  </p>
`
