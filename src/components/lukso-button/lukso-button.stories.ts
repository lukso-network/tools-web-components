import { html } from 'lit-html'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

import './index'
import '../lukso-icon'

/**  Documentation and examples of button component. */
export default {
  title: 'Design System/Components/lukso-button',
  component: 'lukso-button',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'landing', 'link'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    text: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    isFullWidth: {
      control: { type: 'boolean' },
    },
  },
  args: {
    text: 'Hello World',
    disabled: false,
    size: 'medium',
    variant: 'primary',
    isFullWidth: false,
  },
  parameters: {
    controls: {
      exclude: [
        'defaultStyles',
        'secondaryStyles',
        'primaryStyles',
        'landingStyles',
        'linkStyles',
        'mediumSize',
        'smallSize',
        'is-full-width',
      ],
    },
  },
}

const Template = ({ variant, disabled, text, size, isFullWidth }) =>
  html`<lukso-button
    variant=${variant}
    ?disabled=${disabled}
    size=${size}
    ?is-full-width=${isFullWidth}
    >${text}</lukso-button
  >`

/** By default button is displayed in `primary` style. You use different versions of the button by specifying `variant` property. */
export const Primary = Template.bind({})
Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=743%3A9778&t=AGmdbG8fXRENuU3o-4',
  },
}

Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // 👇 Assert DOM structure
  expect(canvas.getByText('Hello World')).toBeInTheDocument()
}

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
}
Secondary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=743%3A9745&t=AGmdbG8fXRENuU3o-4',
  },
}

export const Landing = Template.bind({})
Landing.args = {
  variant: 'landing',
}
Landing.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=743%3A9912&t=AGmdbG8fXRENuU3o-4',
  },
}

export const Link = Template.bind({})
Link.args = {
  variant: 'link',
}
Link.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=743%3A9822&t=AGmdbG8fXRENuU3o-4',
  },
}

/** If you need button to take full width of the parent element add `is-full-width` property. */
export const FullWidth = Template.bind({})
FullWidth.args = {
  isFullWidth: true,
}
FullWidth.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=743%3A9778&t=AGmdbG8fXRENuU3o-4',
  },
}

/** In order to have disabled button add `disabled` property. */
export const DisabledButton = Template.bind({})
DisabledButton.args = {
  variant: 'primary',
  text: 'Disabled Button',
  disabled: true,
}
DisabledButton.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=6%3A1324&t=mppskGJvpl3LbsWL-4',
  },
}

/** Buttons can have icons inside. Please check `lukso-icon` component for more details about using icons. */
export const IconButton = Template.bind({})
IconButton.args = {
  variant: 'primary',
  text: unsafeHTML(
    `<lukso-icon name="add-photo" size="medium" color="neutral-100" class="mr-2"></lukso-icon>Icon Button`
  ),
}
IconButton.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=6%3A1324&t=mppskGJvpl3LbsWL-4',
  },
}
