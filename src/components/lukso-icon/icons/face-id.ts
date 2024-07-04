import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const faceId = (options: IconOptions) => {
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
    <g clip-path="url(#clip0_2189_24953)">
      <path
        d="M1 17.5V19C1 21.2091 2.79086 23 5 23H6.5M1 6.5V5C1 2.79086 2.79086 1 5 1H6.5M17.5 1H19C21.2091 1 23 2.79086 23 5V6.5M23 17.5V19C23 21.2091 21.2091 23 19 23H17.5M36 8.5V11"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17 8.5V10.5"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 8.5V10.5"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 9V13C12 13.5523 11.5523 14 11 14V14"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 17V17C10.2902 19.0039 13.7098 19.0039 16 17V17"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2189_24953">
        <rect width="24" height="24" fill="var(--${options.secondaryColor})" />
      </clipPath>
    </defs>
  </svg> `
}
