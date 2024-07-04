import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const barbellOutline = (options: IconOptions) => {
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
      d="M2.25 12H21.75"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.5 6.75C19.5 6.33579 19.1642 6 18.75 6C18.3358 6 18 6.33579 18 6.75V17.25C18 17.6642 18.3358 18 18.75 18C19.1642 18 19.5 17.6642 19.5 17.25V6.75Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6 6.75C6 6.33579 5.66421 6 5.25 6C4.83579 6 4.5 6.33579 4.5 6.75V17.25C4.5 17.6642 4.83579 18 5.25 18C5.66421 18 6 17.6642 6 17.25V6.75Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.25 9.375C2.25 9.16789 2.08211 9 1.875 9C1.66789 9 1.5 9.16789 1.5 9.375V14.625C1.5 14.8321 1.66789 15 1.875 15C2.08211 15 2.25 14.8321 2.25 14.625V9.375Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M22.5 9.375C22.5 9.16789 22.3321 9 22.125 9C21.9179 9 21.75 9.16789 21.75 9.375V14.625C21.75 14.8321 21.9179 15 22.125 15C22.3321 15 22.5 14.8321 22.5 14.625V9.375Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
