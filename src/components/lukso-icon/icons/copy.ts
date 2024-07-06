import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const copy = (options: IconOptions) => {
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
      d="M3 9V19C3 20.1046 3.89543 21 5 21H15C16.1046 21 17 20.1046 17 19V9C17 7.89543 16.1046 7 15 7H5C3.89543 7 3 7.89543 3 9Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <path
      d="M7 7V5C7 3.89543 7.89543 3 9 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H17"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
  </svg> `
}
