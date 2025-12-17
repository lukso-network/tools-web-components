import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const transferInactive = (options: IconOptions) => {
  return html`<svg
    width="24"
    height="24"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style=${styleMap({
      width: `${options.width}px`,
      height: `${options.height}px`,
    })}
  >
    <rect width="80" height="80" rx="24" fill="#E1E7EB" />
    <rect
      x="14"
      y="47"
      width="50.1429"
      height="16"
      rx="8"
      fill="url(#paint0_linear_6_1483)"
    />
    <circle cx="57.2857" cy="55" r="8" fill="#CBD2D8" />
    <rect
      x="14"
      y="18"
      width="52"
      height="16"
      rx="8"
      fill="url(#paint1_linear_6_1483)"
    />
    <circle cx="22" cy="26" r="8" fill="white" />
    <defs>
      <linearGradient
        id="paint0_linear_6_1483"
        x1="79.5"
        y1="55"
        x2="59.9982"
        y2="84.9507"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#C3CBD1" />
        <stop offset="1" stop-color="#D5DBE1" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_6_1483"
        x1="-4.5"
        y1="26"
        x2="66"
        y2="26"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>`
}
