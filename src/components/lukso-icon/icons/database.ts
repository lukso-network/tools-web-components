import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const database = (options: IconOptions) => {
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
      d="M10 6.6665C14.1421 6.6665 17.5 5.54722 17.5 4.1665C17.5 2.78579 14.1421 1.6665 10 1.6665C5.85786 1.6665 2.5 2.78579 2.5 4.1665C2.5 5.54722 5.85786 6.6665 10 6.6665Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.5 4.1665V15.8332C2.5 16.4962 3.29018 17.1321 4.6967 17.6009C6.10322 18.0698 8.01088 18.3332 10 18.3332C11.9891 18.3332 13.8968 18.0698 15.3033 17.6009C16.7098 17.1321 17.5 16.4962 17.5 15.8332V4.1665"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.5 10C2.5 10.663 3.29018 11.2989 4.6967 11.7678C6.10322 12.2366 8.01088 12.5 10 12.5C11.9891 12.5 13.8968 12.2366 15.3033 11.7678C16.7098 11.2989 17.5 10.663 17.5 10"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`
}
