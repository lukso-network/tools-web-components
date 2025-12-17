import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const glasses = (options: IconOptions) => {
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
      d="M6.25 19a4 4 0 1 0 0-8 4 4 0 0 0 0 8m12 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8"
      fill="var(--${options.color})"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M14.25 15a2 2 0 0 0-4 0" fill="var(--${options.color})" />
    <path
      d="M14.25 15a2 2 0 0 0-4 0m-7.5-2 2.5-6c.7-1.3 1.4-2 3-2m13.5 8-2.5-6c-.7-1.3-1.5-2-3-2"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
