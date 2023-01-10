import { html } from 'lit-html'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import './index'

export default {
  title: 'Design System/Button',
}

export function Primary() {
  return html`<wc-button variant="primary" disabled="true"
    >Hello World</wc-button
  >`
}

export function Secondary() {
  return html`<wc-button variant="secondary">Hello World</wc-button>`
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
