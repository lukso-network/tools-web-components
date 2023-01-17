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
      options: ['primary', 'secondary'],
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

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
}

// import { html } from 'lit-html'
// import { Meta, Story } from '@storybook/react'
// import './index'

// const meta: Meta = {
//   title: 'Web Components/Button',
//   component: 'lukso-button',
//   argTypes: {
//     variant: {
//       options: ['primary', 'secondary'],
//       control: { type: 'select' },
//     },
//     disabled: {
//       options: [true, false],
//     },
//     // children: {
//     //   defaultValue: 'Click me!',
//     //   control: {
//     //     type: 'text',
//     //   },
//     // },
//     // onClick: {
//     //   action: 'clicked',
//     // },
//   },
//   parameters: {
//     controls: { expanded: true },
//     docs: {
//       page: null,
//     },
//     design: {
//       type: 'figma',
//       url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=6%3A1324&t=eru1dzxSBVeJ3NJw-4',
//     },
//   },
// }

// export default meta

// export function Primary({ variant, disabled }) {
//   return html`<lukso-button variant=${variant} ?disabled=${disabled}
//     >Hello World</lukso-button
//   >`
// }

// // Secondary.args = {
// //   variant: 'secondary',
// //   disabled: false,
// // }

// Primary.args = { variant: 'primary', disabled: false }
