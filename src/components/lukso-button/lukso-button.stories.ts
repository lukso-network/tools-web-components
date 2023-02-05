import { html } from 'lit-html'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import '../lukso-button'

export default {
  title: 'Design System/Components/Button',
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
