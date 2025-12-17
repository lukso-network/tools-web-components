import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const trash = (options: IconOptions) => {
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
      d="M6 9L6.64154 17.2331C6.76323 18.7948 8.06601 20 9.63247 20H14.3675C15.934 20 17.2368 18.7948 17.3585 17.2331L18 9"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4 6H20"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6 6H7.75C8.44036 6 9 5.44036 9 4.75V4.75C9 4.05964 9.55964 3.5 10.25 3.5H13.75C14.4404 3.5 15 4.05964 15 4.75V4.75C15 5.44036 15.5596 6 16.25 6H18"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
