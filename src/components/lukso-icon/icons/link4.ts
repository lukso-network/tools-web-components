import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const link4 = (options: IconOptions) => {
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
      d="M3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6C4.34315 3 3 4.34315 3 6Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <path
      d="M17.9999 10C17.9999 8.17755 18 6 18 6H14"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11 13L18 6"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <mask id="path-4-inside-1_156_2044" fill="var(--${options.secondaryColor})">
      <rect x="5" y="14" width="5" height="5" rx="1" />
    </mask>
    <rect
      x="5"
      y="14"
      width="5"
      height="5"
      rx="1"
      stroke="var(--${options.color})"
      stroke-width="3"
      mask="url(#path-4-inside-1_156_2044)"
    />
  </svg> `
}
