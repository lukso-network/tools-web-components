import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'

import './index'

/**  Documentation and examples of `lukso-share` component. */
const meta: Meta = {
  title: 'Design System/Components/lukso-share',
  component: 'lukso-share',
  argTypes: {
    providers: {
      control: {
        type: 'object',
      },
      table: {
        category: 'Attributes',
      },
      description: 'If no value passed it will use `defaultProviders`',
    },
    customStyle: {
      name: 'custom-style',
      control: { type: 'text' },
      table: {
        category: 'Attributes',
      },
    },
    'custom-style': {
      name: 'customStyle',
    },
  },
  args: {
    customStyle: '',
    providers: [],
  },
  parameters: {
    controls: {
      exclude: [
        'linkTemplate',
        'defaultProviderLinks',
        'customStyle',
        'styles',
      ],
    },
  },
}

export default meta

const Template = ({ customStyle, providers }) =>
  html`<lukso-share
    custom-style=${customStyle ? customStyle : nothing}
    providers=${providers.length ? JSON.stringify(providers) : nothing}
  ></lukso-share>`

/** Component render responsive list of links. */
export const Default = Template.bind({})

/** With `custom-style` attribute you can change layout of the elements. */
export const CustomStyle = Template.bind({})
CustomStyle.args = {
  customStyle: 'grid-template-columns: repeat(4, max-content)',
}

/** With `providers` attribute pick only providers that you want, you can also control order this way. Use `JSON.stringify` to encode `array`. */
export const LimitProviders = Template.bind({})
LimitProviders.args = {
  providers: ['instagram', 'linkedin', 'twitter'],
}

/** If you want overwrite default provider link instead of using just `ProviderName` then pass it as the `ProviderObject`:
 *
```json
{
  name: 'twitter',
  url: 'https://twitter.com/lukso_io'
}
```
*/
export const CustomProviderLink = Template.bind({})
CustomProviderLink.args = {
  providers: [{ name: 'twitter', url: 'https://twitter.com/lukso_io' }],
}
