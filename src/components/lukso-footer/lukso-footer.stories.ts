import { html } from 'lit-html'
import { Meta } from '@storybook/web-components'

import './index'

/**  Documentation and examples of `lukso-footer` component. There are two slots for the links called `top` and `bottom`.   */
const meta: Meta = {
  title: 'Design System/Components/lukso-footer',
  component: 'lukso-footer',
  argTypes: {},
  args: {},
  parameters: {
    controls: {
      exclude: [],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/NFCh20xAq3Jg2g8A0DNC9I/UI-Library?type=design&node-id=1348-19092',
    },
  },
}

export default meta

const Template = ({}) =>
  html`<lukso-footer>
    <div
      slot="top"
      class="grid gap-6 items-center sm:gap-10
      sm:grid-cols-[repeat(2,max-content)]"
    >
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

    <div slot="bottom" class="gap-8 flex items-center">
      <a href="" class="paragraph-inter-12-medium hover:underline">
        Privacy Policy
      </a>
      <a href="" class="paragraph-inter-12-medium hover:underline">
        Terms & Conditions
      </a>
    </div>
  </lukso-footer>`

/** Example of default footer.  */
export const DefaultFooter = Template.bind({})
