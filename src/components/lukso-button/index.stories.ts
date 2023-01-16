import { html } from 'lit-html'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import './index'

export default {
  title: 'Design System/Button',
  component: 'lukso-button',
}

export function Primary({ variant, disabled, style }) {
  return html`<lukso-button
    style=${style}
    variant=${variant}
    ?disabled=${disabled}
    >Hello World</lukso-button
  >`
}
Primary.args = {
  variant: 'primary',
  disabled: false,
  style: 'font-family: Roboto',
}
Primary.argTypes = {
  variant: {
    options: ['primary', 'secondary'],
  },
}
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // 👇 Assert DOM structure
  await expect(canvas.getByText('Hello World')).toBeInTheDocument()

  // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
  // await userEvent.click(canvas.getByTestId("button"));

  // 👇 Assert DOM structure
  // await expect(
  //   canvas.getByText(
  //     "Hello World"
  //   )
  // ).toBeInTheDocument();
}
