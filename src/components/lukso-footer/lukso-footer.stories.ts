import { html, nothing } from 'lit-html'

import type { Meta } from '@storybook/web-components-vite'

import './index'

/**  Documentation and examples of `lukso-footer` component. There are two slots for the links called `top` and `bottom`.   */
const meta: Meta = {
  title: 'Design System/Components/lukso-footer',
  component: 'lukso-footer',
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
  },
  args: {
    providers: [],
  },
  parameters: {
    controls: {
      exclude: [],
    },
  },
}

export default meta

const Template = ({ providers }) =>
  html`<lukso-footer
    providers=${providers.length ? JSON.stringify(providers) : nothing}
  >
    <div
      slot="links"
      class="grid gap-4 items-center grid-cols-1 grid-rows-2
      xl:grid-cols-[repeat(3,max-content)] xl:gap-10 xl:grid-rows-1"
    >
      <div class="flex gap-10">
        <a
          href=""
          class="nav-apax-12-medium-uppercase text-purple-41 hover:underline hover:text-purple-31"
        >
          FAQs
        </a>
        <a
          href=""
          class="nav-apax-12-medium-uppercase text-purple-41 hover:underline hover:text-purple-31"
        >
          NEED HELP?
        </a>
      </div>
      <div class="hidden w-0.5 h-4 bg-purple-63 xl:block"></div>
      <div class="flex gap-10">
        <a
          href=""
          class="nav-apax-12-medium-uppercase text-purple-41/70 hover:underline hover:text-purple-31/70"
        >
          TERMs
        </a>
      </div>
    </div>
  </lukso-footer>`

/** Example of default footer.  */
export const DefaultFooter = Template.bind({})

/** With `providers` attribute pick only providers that you want, you can also control order this way. Use `JSON.stringify` to encode `array`. */
export const LimitProviders = Template.bind({})
LimitProviders.args = {
  providers: ['instagram', 'linkedin', 'twitter'],
}
