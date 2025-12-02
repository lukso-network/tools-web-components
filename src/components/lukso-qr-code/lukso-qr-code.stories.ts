import { html, nothing } from 'lit'

import type { Meta, StoryObj } from '@storybook/web-components-vite'
import './index'
import type { QRCodeOptions } from './index'

type Props = {
  value?: string
  size?: number
  image?: string
  options?: QRCodeOptions
  customClass?: string
}

const meta: Meta = {
  title: 'Design System/Components/lukso-qr-code',
  component: 'lukso-qr-code',
  argTypes: {
    value: {
      control: 'text',
      description: 'The value/data to encode in the QR code',
      table: {
        category: 'Attributes',
      },
    },
    size: {
      control: 'number',
      description: 'The size of the QR code in pixels',
      table: {
        category: 'Attributes',
        defaultValue: { summary: '280' },
        type: { summary: 'number' },
      },
    },
    image: {
      control: 'text',
      description: 'The URL of the image to embed in the center of the QR code',
      table: {
        category: 'Attributes',
      },
    },
    options: {
      control: 'object',
      description:
        'Custom QRCodeStyling options to override defaults (dotsOptions, backgroundOptions, etc)',
      table: {
        category: 'Attributes',
      },
    },
    customClass: {
      name: 'custom-class',
      control: 'text',
      description: 'Custom CSS classes to apply to the component',
      table: {
        category: 'Attributes',
      },
    },
    'custom-class': {
      name: 'customClass',
    },
  },
  args: {
    value: 'https://lukso.io',
    size: '',
    customClass: '',
    image: '',
    options: {},
  },
  parameters: {
    docs: {
      description: {
        component:
          'A web component for displaying QR codes. Uses qr-code-styling library to generate styled SVG QR codes with rounded corners and custom styling.',
      },
    },
    controls: {
      exclude: ['customClass'],
    },
  },
}

export default meta
type Story = StoryObj<Props>

const Template = (props: Props) => html`
  <lukso-qr-code
    value="${props.value ? props.value : nothing}"
    size="${props.size ? props.size : nothing}"
    image="${props.image ? props.image : nothing}"
    .options=${props.options}
    ?custom-class="${props.customClass ? props.customClass : nothing}"
  ></lukso-qr-code>
`

export const Default: Story = Template.bind({})

export const WithImage: Story = Template.bind({})
WithImage.args = {
  image: '/images/up-cube-glass.png',
}

export const SmallSize: Story = Template.bind({})
SmallSize.args = {
  size: 150,
}

export const CustomOptions: Story = Template.bind({})
CustomOptions.args = {
  options: {
    dotsOptions: {
      color: '#FF00FF',
      type: 'square' as const,
    },
    backgroundOptions: {
      color: '#FFFFFF',
    },
    cornersSquareOptions: {
      type: 'square' as const,
    },
  },
}
