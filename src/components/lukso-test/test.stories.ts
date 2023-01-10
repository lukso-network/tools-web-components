import { html } from 'lit-html'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import './index'

export default {
  title: 'Test',
  component: 'lukso-test',
}

export function Primary({ disabled }) {
  return html`<lukso-test ?disabled=${disabled}>Hello World</lukso-test>`
}

Primary.args = {
  disabled: false,
}

Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // 👇 Assert DOM structure
  await expect(canvas.getByText('Hello World')).toBeInTheDocument()

  // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
  // await userEvent.click(canvas.getByTestId("button"));

  // 👇 Assert DOM structure
  await expect(canvas.getByText('Hello World')).toBeInTheDocument()
}
