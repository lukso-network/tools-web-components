import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import { IconOptions } from '@/components/lukso-icon/index.js'

export const addPhoto = (options: IconOptions) => {
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
      d="M14 3H6C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V10"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <path
      d="M18 3V9"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M21 6L15 6"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.1214 9.87858C15.2929 11.05 15.2929 12.95 14.1214 14.1214C12.95 15.2929 11.05 15.2929 9.87858 14.1214C8.70714 12.95 8.70714 11.05 9.87858 9.87858C11.05 8.70714 12.95 8.70714 14.1214 9.87858Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
  </svg> `
}
