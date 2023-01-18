import { html } from 'lit-html'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import '../lukso-button'

export default {
  title: 'Design System/Atoms/Button',
  component: 'lukso-button',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'landing'],
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
  parameters: {
    controls: {
      exclude: ['defaultStyles', 'secondaryStyles', 'primaryStyles'],
    },
  },
}

const Template = ({ variant, disabled }) =>
  html`<lukso-button variant=${variant} ?disabled=${disabled}
    >Hello World</lukso-button
  >`

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
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

export const Landing = Template.bind({})
Landing.args = {
  variant: 'landing',
}
