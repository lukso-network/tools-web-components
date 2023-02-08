import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import { IconOptions } from '@/components/lukso-icon/index.js'

export const qrCode = (options: IconOptions) => {
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
      d="M4 8V6C4 4.89543 4.89543 4 6 4H8"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <path
      d="M4 16V18C4 19.1046 4.89543 20 6 20H8"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <path
      d="M16 4L18 4C19.1046 4 20 4.89543 20 6L20 8"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <path
      d="M16 20L18 20C19.1046 20 20 19.1046 20 18L20 16"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <mask id="path-5-inside-1_52_1474" fill="var(--${options.secondaryColor})">
      <rect x="7" y="7" width="4" height="4" rx="1" />
    </mask>
    <rect
      x="7"
      y="7"
      width="4"
      height="4"
      rx="1"
      stroke="var(--${options.color})"
      stroke-width="3"
      mask="url(#path-5-inside-1_52_1474)"
    />
    <mask id="path-6-inside-2_52_1474" fill="var(--${options.secondaryColor})">
      <rect x="7" y="13" width="4" height="4" rx="1" />
    </mask>
    <rect
      x="7"
      y="13"
      width="4"
      height="4"
      rx="1"
      stroke="var(--${options.color})"
      stroke-width="3"
      mask="url(#path-6-inside-2_52_1474)"
    />
    <rect
      x="13"
      y="13"
      width="1"
      height="1"
      rx="0.5"
      fill="var(--${options.color})"
    />
    <rect
      x="16"
      y="13"
      width="1"
      height="1"
      rx="0.5"
      fill="var(--${options.color})"
    />
    <rect
      x="16"
      y="16"
      width="1"
      height="1"
      rx="0.5"
      fill="var(--${options.color})"
    />
    <rect
      x="13"
      y="16"
      width="1"
      height="1"
      rx="0.5"
      fill="var(--${options.color})"
    />
    <rect
      x="14.5"
      y="14.5"
      width="1"
      height="1"
      rx="0.5"
      fill="var(--${options.color})"
    />
    <mask id="path-12-inside-3_52_1474" fill="var(--${options.secondaryColor})">
      <rect x="13" y="7" width="4" height="4" rx="1" />
    </mask>
    <rect
      x="13"
      y="7"
      width="4"
      height="4"
      rx="1"
      stroke="var(--${options.color})"
      stroke-width="3"
      mask="url(#path-12-inside-3_52_1474)"
    />
  </svg> `
}
