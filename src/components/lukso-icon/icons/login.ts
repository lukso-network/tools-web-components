import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const login = (options: IconOptions) => {
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
      d="M10.4142 14.771C11.7029 13.4823 13.2427 11.9426 13.2427 11.9426L10.4142 9.1142"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.75736 11.9426H13.2426"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7 6.40541V5C7 3.89543 7.89543 3 9 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H9C7.89543 21 7 20.1046 7 19V17.5946"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
  </svg>`
}
