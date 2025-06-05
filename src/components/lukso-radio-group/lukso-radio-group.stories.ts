import { useArgs } from '@storybook/client-api'
import { html } from 'lit-html'

import type { Meta } from '@storybook/web-components'

import '.'
import '../lukso-radio'

/**  Documentation and examples of div-based `lukso-radio-group` component.  */
const meta: Meta = {
  title: 'Design System/Forms/lukso-radio-group',
  component: 'lukso-radio-group',
  argTypes: {
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
    autoFocus: {
      control: {
        type: 'boolean',
      },
      name: 'auto-focus',
      table: {
        category: 'Attributes',
      },
    },
    onChange: {
      name: 'change',
      description: 'Emitted when a radio in the group is selected.',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    name: 'radio-group',
    value: 'option1',
    autoFocus: false,
  },
  parameters: {
    controls: {
      exclude: ['autoFocus', 'onChange', 'focusedIndex', 'radios'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?type=design&node-id=376-3984&t=20P0yRhnEEulAelu-0',
    },
  },
}

export default meta

const Template = ({ name, onChange }) => {
  const [args, updateArgs] = useArgs()

  const handleChange = (event: CustomEvent) => {
    if (onChange) {
      onChange(event)
    }
    updateArgs({ value: event.detail.value })
  }

  return html`
    <lukso-radio-group name=${name} value=${args.value} @change=${handleChange}>
      <div class="flex flex-col gap-4">
        <lukso-radio name=${name} value="option1">Option 1</lukso-radio>
        <lukso-radio name=${name} value="option2">Option 2</lukso-radio>
        <lukso-radio name=${name} value="option3">Option 3</lukso-radio>
      </div>
    </lukso-radio-group>
  `
}

export const AutoFocusRadioGroup = () => {
  const [{ value = 'medium' }, updateArgs] = useArgs()

  const handleChange = (e: CustomEvent) => {
    updateArgs({ value: e.detail.value })
  }

  return html`
    <lukso-radio-group
      name="radio-size"
      auto-focus
      value=${value}
      @change=${handleChange}
    >
      <div class="flex flex-col gap-4">
        <lukso-radio name="radio-size" value="medium" size="medium">
          Medium (40px)
        </lukso-radio>

        <lukso-radio name="radio-size" value="small" size="small">
          Small (32px)
        </lukso-radio>

        <lukso-radio name="radio-size" value="x-small" size="x-small">
          X-Small (28px)
        </lukso-radio>
      </div>
    </lukso-radio-group>
  `
}

/** Default div-based radio group with three options. */
export const DefaultRadioGroup = Template.bind({})
DefaultRadioGroup.args = {
  value: 'option1',
}

/** Radio group with different sizes. */
export const DifferentSizes = () => {
  const [{ value = 'medium' }, updateArgs] = useArgs()

  const handleChange = (e: CustomEvent) => {
    updateArgs({ value: e.detail.value })
  }

  return html`
    <lukso-radio-group name="radio-size" value=${value} @change=${handleChange}>
      <div class="flex flex-col gap-4">
        <lukso-radio name="radio-size" value="medium" size="medium">
          Medium (40px)
        </lukso-radio>

        <lukso-radio name="radio-size" value="small" size="small">
          Small (32px)
        </lukso-radio>

        <lukso-radio name="radio-size" value="x-small" size="x-small">
          X-Small (28px)
        </lukso-radio>
      </div>
    </lukso-radio-group>
  `
}

/** Radio group with error state on radios. */
export const WithError = () => {
  const [{ value = 'error1' }, updateArgs] = useArgs()

  const handleChange = (e: CustomEvent) => {
    updateArgs({ value: e.detail.value })
  }

  return html`
    <lukso-radio-group
      name="radio-error"
      value=${value}
      @change=${handleChange}
    >
      <div class="flex flex-col gap-4">
        <lukso-radio
          name="radio-error"
          value="error1"
          error="This option has an error"
        >
          Option with error
        </lukso-radio>

        <lukso-radio name="radio-error" value="error2">
          Normal option
        </lukso-radio>
      </div>
    </lukso-radio-group>
  `
}

/** Radio group with disabled and readonly radios. */
export const DisabledAndReadonly = () => {
  const [{ value = 'normal' }, updateArgs] = useArgs()

  const handleChange = (e: CustomEvent) => {
    updateArgs({ value: e.detail.value })
  }

  return html`
    <lukso-radio-group
      name="radio-states"
      value=${value}
      @change=${handleChange}
    >
      <div class="flex flex-col gap-4">
        <lukso-radio name="radio-states" value="normal">
          Normal option
        </lukso-radio>

        <lukso-radio name="radio-states" value="disabled" is-disabled>
          Disabled option
        </lukso-radio>

        <lukso-radio name="radio-states" value="readonly" is-readonly>
          Readonly option
        </lukso-radio>
      </div>
    </lukso-radio-group>
  `
}

/** Radio group with custom content. */
export const WithCustomContent = () => {
  const [{ value = 'custom1' }, updateArgs] = useArgs()

  const handleChange = (e: CustomEvent) => {
    updateArgs({ value: e.detail.value })
  }

  return html`
    <lukso-radio-group
      name="radio-custom"
      value=${value}
      @change=${handleChange}
    >
      <div class="flex flex-col gap-4">
        <lukso-radio name="radio-custom" value="custom1">
          <div class="flex flex-col">
            <span class="font-bold">Primary Option</span>
            <span class="text-neutral-60 text-sm">
              This is a description for this option
            </span>
          </div>
        </lukso-radio>

        <lukso-radio name="radio-custom" value="custom2">
          <div class="flex flex-col">
            <span class="font-bold">Secondary Option</span>
            <span class="text-neutral-60 text-sm">
              With a different description
            </span>
          </div>
        </lukso-radio>
      </div>
    </lukso-radio-group>
  `
}

/** Radio group with horizontal layout. */
export const HorizontalLayout = () => {
  const [{ value = 'option1' }, updateArgs] = useArgs()

  const handleChange = (e: CustomEvent) => {
    updateArgs({ value: e.detail.value })
  }

  return html`
    <lukso-radio-group
      name="radio-horizontal"
      value=${value}
      @change=${handleChange}
    >
      <div class="flex gap-6">
        <lukso-radio name="radio-horizontal" value="option1"
          >Option 1</lukso-radio
        >
        <lukso-radio name="radio-horizontal" value="option2"
          >Option 2</lukso-radio
        >
        <lukso-radio name="radio-horizontal" value="option3"
          >Option 3</lukso-radio
        >
      </div>
    </lukso-radio-group>
  `
}
