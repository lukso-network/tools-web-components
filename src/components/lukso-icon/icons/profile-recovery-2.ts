import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const profileRecovery2 = (options: IconOptions) => {
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
    <g clip-path="url(#clip0_643_8332)">
      <path
        d="M18.25 6C18.25 8.34721 16.3472 10.25 14 10.25C11.6528 10.25 9.75 8.34721 9.75 6C9.75 3.65279 11.6528 1.75 14 1.75C16.3472 1.75 18.25 3.65279 18.25 6Z"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
      />
      <path
        d="M4.75 18.6667C4.75 16.8725 6.09998 15.4016 8.10179 14.3324C10.0797 13.2759 12.4587 12.75 14 12.75C15.5413 12.75 17.9203 13.2759 19.8982 14.3324C21.9 15.4016 23.25 16.8725 23.25 18.6667V21.25H4.75V18.6667Z"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
      />
      <path
        d="M1 10L6.25 10"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5 12L7 10L5 8"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
        stroke-linecap="round"
      />
      <path
        d="M7 5L1.75 5"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3 3L1 5L3 7"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
        stroke-linecap="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_643_8332">
        <rect width="24" height="24" fill="var(--${options.secondaryColor})" />
      </clipPath>
    </defs>
  </svg> `
}
