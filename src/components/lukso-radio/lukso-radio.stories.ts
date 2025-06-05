import { useArgs } from '@storybook/client-api'
import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components'

import './index'

/**  Documentation and examples of `lukso-radio` component.  */
const meta: Meta = {
  title: 'Design System/Forms/lukso-radio',
  component: 'lukso-radio',
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['medium', 'small', 'x-small'],
      table: {
        category: 'Attributes',
      },
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
      name: 'is-disabled',
      table: {
        category: 'Attributes',
      },
    },
    isReadonly: {
      control: {
        type: 'boolean',
      },
      name: 'is-readonly',
      table: {
        category: 'Attributes',
      },
    },
    checked: {
      control: {
        type: 'boolean',
      },
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
    name: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    value: {
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
    onChange: {
      name: 'on-change',
      description: 'Emitted on onchange from radio.',
      table: {
        category: 'Events',
      },
    },
    'is-disabled': {
      name: 'isDisabled',
    },
    'is-readonly': {
      name: 'isReadonly',
    },
  },
  args: {
    size: 'medium',
    isDisabled: false,
    isReadonly: false,
    checked: false,
    name: 'radio',
    value: 'option1',
    error: '',
    id: '',
  },
  parameters: {
    controls: {
      exclude: [
        'isDisabled',
        'isReadonly',
        'customClass',
        'hasFocus',
        'hasHighlight',
        'radioStyles',
      ],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?type=design&node-id=376-3984&t=20P0yRhnEEulAelu-0',
    },
  },
}

export default meta

const Template = ({
  size,
  isDisabled,
  isReadonly,
  name,
  value,
  error,
  id,
  children,
  onChange,
}) => {
  const [{ checked }, updateArgs] = useArgs()

  const handleChange = (event: CustomEvent) => {
    if (onChange) {
      onChange(event)
    }
    updateArgs({ checked: checked ? false : true })
  }

  return html`<lukso-radio
    @on-change=${handleChange}
    id=${id ? id : nothing}
    name=${name ? name : nothing}
    value=${value ? value : nothing}
    size=${size}
    error=${error ? error : nothing}
    ?is-disabled=${isDisabled}
    ?is-readonly=${isReadonly}
    ?checked=${checked}
  >
    ${children || 'Option'}
  </lukso-radio>`
}

export const DefaultInput = Template.bind({})
DefaultInput.args = {
  checked: false,
}

/** Example of checked radio.  */
export const CheckedInput = Template.bind({})
CheckedInput.args = {
  checked: true,
}

/** Example of disabled radio.  */
export const DisabledInput = Template.bind({})
DisabledInput.args = {
  isDisabled: true,
}

/** Example of readonly radio.  */
export const ReadonlyInput = Template.bind({})
ReadonlyInput.args = {
  isReadonly: true,
}

/** Example of radio with error.  */
export const ErrorInput = Template.bind({})
ErrorInput.args = {
  error: 'This field is required',
}

/** Example of small size radio.  */
export const SmallSize = Template.bind({})
SmallSize.args = {
  size: 'small',
  children: 'Small (32px)',
}

/** Example of x-small size radio.  */
export const XSmallSize = Template.bind({})
XSmallSize.args = {
  size: 'x-small',
  children: 'X-Small (28px)',
}

/** Example of different sizes.  */
export const Sizes = () => {
  // Use useArgs hook for state management like in the Group story
  const [{ value = 'medium' }, updateArgs] = useArgs()

  const handleChange = (e: CustomEvent) => {
    // Update the selected value using the detail from the custom event
    updateArgs({ value: e.detail.value })
  }

  return html`
    <div class="flex flex-col gap-4">
      <lukso-radio
        name="radio-size"
        value="medium"
        size="medium"
        ?checked=${value === 'medium'}
        @on-change=${handleChange}
        >Medium (40px)</lukso-radio
      >

      <lukso-radio
        name="radio-size"
        value="small"
        size="small"
        ?checked=${value === 'small'}
        @on-change=${handleChange}
        >Small (32px)</lukso-radio
      >

      <lukso-radio
        name="radio-size"
        value="x-small"
        size="x-small"
        ?checked=${value === 'x-small'}
        @on-change=${handleChange}
        >X-Small (28px)</lukso-radio
      >
    </div>
  `
}

/** Example of radio with profiles.  */
export const WithProfiles = () => {
  // Use useArgs hook for state management
  const [{ value = 'profile1' }, updateArgs] = useArgs()

  const handleChange = (e: CustomEvent) => {
    // Update the selected value using the detail from the custom event
    updateArgs({ value: e.detail.value })
  }

  return html`
    <div class="flex flex-col gap-4">
      <lukso-radio
        name="radio-profile"
        value="profile1"
        ?checked=${value === 'profile1'}
        @on-change=${handleChange}
      >
        <div class="flex items-center gap-2">
          <lukso-profile size="small" address="0x123..."></lukso-profile>
          <span>Profile 1</span>
        </div>
      </lukso-radio>

      <lukso-radio
        name="radio-profile"
        value="profile2"
        ?checked=${value === 'profile2'}
        @on-change=${handleChange}
      >
        <div class="flex items-center gap-2">
          <lukso-profile size="small" address="0x456..."></lukso-profile>
          <span>Profile 2</span>
        </div>
      </lukso-radio>
    </div>
  `
}

/** Example of radio with custom content.  */
export const WithCustomContent = () => {
  // Use useArgs hook for state management
  const [{ value = 'custom1' }, updateArgs] = useArgs()

  const handleChange = (e: CustomEvent) => {
    // Update the selected value using the detail from the custom event
    updateArgs({ value: e.detail.value })
  }

  return html`
    <div class="flex flex-col gap-4">
      <lukso-radio
        name="radio-custom"
        value="custom1"
        ?checked=${value === 'custom1'}
        @on-change=${handleChange}
      >
        <div class="flex flex-col">
          <span class="font-bold">Primary Option</span>
          <span class="text-neutral-60 text-sm"
            >This is a description for this option</span
          >
        </div>
      </lukso-radio>

      <lukso-radio
        name="radio-custom"
        value="custom2"
        ?checked=${value === 'custom2'}
        @on-change=${handleChange}
      >
        <div class="flex flex-col">
          <span class="font-bold">Secondary Option</span>
          <span class="text-neutral-60 text-sm"
            >With a different description</span
          >
        </div>
      </lukso-radio>
    </div>
  `
}
