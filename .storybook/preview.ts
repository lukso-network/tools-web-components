import * as jest from 'jest-mock'
import { setCustomElementsManifest } from '@storybook/web-components-vite'

import customElements from '../package/custom-elements.json'
import './styles.css'
;(window as any).jest = jest

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
export const tags = ['autodocs']
