import * as jest from 'jest-mock'
;(window as any).jest = jest

import { setCustomElementsManifest } from '@storybook/web-components'
import customElements from '../package/custom-elements.json'
import './styles.scss'

setCustomElementsManifest(customElements)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
  options: {
    storySort: {
      order: ['Components', 'Forms'],
    },
  },
}
