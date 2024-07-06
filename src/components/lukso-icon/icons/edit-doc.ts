import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const editDoc = (options: IconOptions) => {
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
    <g clip-path="url(#clip0_3613_28842)">
      <path
        d="M2 10.1211V19.25C2 19.8467 2.23705 20.419 2.65901 20.841C3.08097 21.2629 3.65326 21.5 4.25 21.5H14.75C15.3467 21.5 15.919 21.2629 16.341 20.841C16.7629 20.419 17 19.8467 17 19.25V4.25C17 3.65326 16.7629 3.08097 16.341 2.65901C15.919 2.23705 15.3467 2 14.75 2H10.1211C9.72341 2.00006 9.34202 2.15804 9.06078 2.43922L2.43922 9.06078C2.15804 9.34202 2.00006 9.72341 2 10.1211Z"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
        stroke-linejoin="round"
      />
      <path
        d="M11 13H5"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 16H5"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11 16H10"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.5 2.13501V8.00001C9.5 8.39783 9.34196 8.77936 9.06066 9.06067C8.77936 9.34197 8.39782 9.50001 8 9.50001H2.135"
        stroke="var(--${options.color})"
        stroke-width="${options.strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.5817 14.0969L23.6322 7.04643C24.0227 6.65591 24.0227 6.02274 23.6322 5.63222L22.3956 4.39561C22.0051 4.00509 21.3719 4.00509 20.9814 4.39561L13.9309 11.4461C13.7915 11.5855 13.6965 11.7629 13.6576 11.956L13.3463 13.504C13.2054 14.2045 13.8233 14.8224 14.5238 14.6815L16.0718 14.3702C16.2649 14.3313 16.4423 14.2363 16.5817 14.0969Z"
        fill="var(--${options.color})"
      />
    </g>
    <defs>
      <clipPath id="clip0_3613_28842">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg> `
}
