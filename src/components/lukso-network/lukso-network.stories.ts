import { html } from 'lit-html'
import { Meta } from '@storybook/web-components'

import './index'
import '../lukso-icon'

/**  Documentation and examples of `lukso-network` component. */
const meta: Meta = {
  title: 'Design System/Components/lukso-network',
  component: 'lukso-network',
  args: {
    isConfirmation: false,
  },
  parameters: {
    controls: {
      exclude: [
        'isConfirmation',
        'defaultStyles',
        'confirmationStyles',
        'styles',
      ],
    },
  },
}

export default meta

const Template = ({ isConfirmation, content }) =>
  html`<lukso-network ?is-confirmation=${isConfirmation}
    >${content}</lukso-network
  >`

export const DefaultNetwork = Template.bind({})
DefaultNetwork.args = {
  content: 'TESTNET',
}
DefaultNetwork.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/1qom46hRRFACK1CxZvtf8T/Testnet-Indicator?node-id=1%3A2&mode=dev',
  },
}
