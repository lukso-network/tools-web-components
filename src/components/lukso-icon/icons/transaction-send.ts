import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import { IconOptions } from '@/components/lukso-icon/index.js'

export const transactionSend = (options: IconOptions) => {
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
      d="M18.75 8.75L12 2L5.25 8.75"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 2.9375L12 16.625"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2 18V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V18"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
  </svg> `
}
