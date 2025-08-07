import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const profileFollowing = (options: IconOptions) => {
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
    <rect width="24" height="24" fill="white" />
    <path
      d="M1.5 12.1607L3.3375 13.875L6.75 10.875"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14 1.75C16.3472 1.75 18.25 3.65279 18.25 6C18.25 8.34721 16.3472 10.25 14 10.25C11.6528 10.25 9.75 8.34721 9.75 6C9.75 3.65279 11.6528 1.75 14 1.75Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M14 12.75C15.5413 12.75 17.9206 13.2756 19.8984 14.332C21.9002 15.4013 23.25 16.8728 23.25 18.667V21.25H4.75V18.667C4.75 16.8728 6.09977 15.4013 8.10156 14.332C10.0794 13.2756 12.4587 12.75 14 12.75Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
  </svg> `
}
