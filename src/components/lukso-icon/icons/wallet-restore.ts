import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import { IconOptions } from '@/components/lukso-icon/index.js'

export const walletRestore = (options: IconOptions) => {
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
      d="M20.773 8.386H7.59a1.977 1.977 0 0 0-1.977 1.978v7.909c0 1.092.885 1.977 1.977 1.977h13.182a1.977 1.977 0 0 0 1.977-1.977v-7.91a1.977 1.977 0 0 0-1.977-1.977Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
    <path
      d="M20.582 8.386V7.151a2.06 2.06 0 0 0-2.446-2.023L7.288 6.98a2.06 2.06 0 0 0-1.674 2.024v2.019"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
    <path
      d="M18.796 15.636a1.318 1.318 0 1 1 0-2.636 1.318 1.318 0 0 1 0 2.636"
      fill="var(--${options.color})"
    />
    <path
      d="M2.62 5.628 1.23 4.46m1.528 3.267H1M4.515 5.09V3.334"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`
}
