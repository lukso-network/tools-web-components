import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const maximizeVertical = (options: IconOptions) => {
  return html`<svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style=${styleMap({
      width: `${options.width}px`,
      height: `${options.height}px`,
    })}
  >
    <path
      d="M11.9994 3.51473L12.0005 20.4853"
      stroke="var(--${options.color})"
      stroke-width="1.3125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.828 6.34296L11.9994 3.51472L9.17114 6.34332"
      stroke="var(--${options.color})"
      stroke-width="1.3125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.17188 17.657L12.0005 20.4853L14.8287 17.6567"
      stroke="var(--${options.color})"
      stroke-width="1.3125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
