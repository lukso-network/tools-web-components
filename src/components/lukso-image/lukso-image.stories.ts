import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components'

import './index'

/**
 * Documentation and examples of `lukso-image` component. This is very primitive component that main goal is to
 * handle error/loading states and provide ability to customize placeholder image.
 */
const meta: Meta = {
  title: 'Design System/Components/lukso-image',
  component: 'lukso-image',
  argTypes: {
    src: {
      name: 'src',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    placeholder: {
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
  },
  args: {
    src: 'images/sample-avatar.jpg',
    placeholder: undefined,
  },
  parameters: {
    controls: {
      exclude: ['imageStyles', 'isLoading', 'resolvedPlaceholder', 'hasError'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?node-id=378%3A3395&t=AGmdbG8fXRENuU3o-4',
    },
  },
}

export default meta

const DefaultTemplate = ({ src, placeholder, wrapper }) =>
  html`<div class=${wrapper}>
    <lukso-image
      src=${src ? src : nothing}
      placeholder=${placeholder ? placeholder : nothing}
    ></lukso-image>
    <div></div>
  </div>`

/** Example of image with fixed size.*/
export const DefaultImage = DefaultTemplate.bind({})
DefaultImage.args = {
  wrapper: 'size-[300px]',
}

/** Example of image with rounded corners.*/
export const RoundedCorners = DefaultTemplate.bind({})
RoundedCorners.args = {
  wrapper: 'size-[200px] rounded-12 overflow-hidden',
}

/** Example of image with custom placeholder.*/
export const CustomPlaceholder = DefaultTemplate.bind({})
CustomPlaceholder.args = {
  wrapper: 'size-[200px]',
  src: '',
  placeholder: 'images/profile-default.svg',
}
