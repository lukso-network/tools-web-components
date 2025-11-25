import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const addextensionsInactive = (options: IconOptions) => {
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
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M66 21C66 17.134 62.866 14 59 14H21C17.134 14 14 17.134 14 21C14 24.866 17.134 28 21 28H59C62.866 28 66 24.866 66 21ZM66 59C66 55.134 62.866 52 59 52H21C17.134 52 14 55.134 14 59C14 62.866 17.134 66 21 66H59C62.866 66 66 62.866 66 59Z"
      fill="#EBEFF2"
    />
    <g filter="url(#filter0_b_3043_25501)">
      <rect x="32" y="32" width="16" height="16" rx="8" fill="white" />
      <rect
        x="32.5"
        y="32.5"
        width="15"
        height="15"
        rx="7.5"
        stroke="white"
        stroke-opacity="0.7"
      />
    </g>
    <defs>
      <filter
        id="filter0_b_3043_25501"
        x="24"
        y="24"
        width="32"
        height="32"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="4" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_3043_25501"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_3043_25501"
          result="shape"
        />
      </filter>
    </defs>
  </svg>`
}
