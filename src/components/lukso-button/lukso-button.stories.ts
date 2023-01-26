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
  },
  args: {
    text: 'Hello World',
    disabled: false,
    size: 'medium',
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
      ],
    },
  },
}

const Template = ({ variant, disabled, text, size }) =>
  html`<lukso-button variant=${variant} ?disabled=${disabled} size=${size}
    >${text}</lukso-button
  >`

export const Button = Template.bind({})

Button.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // 👇 Assert DOM structure
  expect(canvas.getByText('Hello World')).toBeInTheDocument()
}
