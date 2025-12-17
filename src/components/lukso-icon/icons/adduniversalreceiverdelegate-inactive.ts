import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const adduniversalreceiverdelegateInactive = (options: IconOptions) => {
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
      d="M58 31.347C58 21.5132 52.2951 18.0097 47.5998 16.3081C43.823 14.9423 39.9971 15.0006 39.9971 15.0006C39.9971 15.0006 36.2081 14.9315 32.4013 16.3081C27.7003 18.0122 22.0011 21.5033 22.0011 31.347C21.9986 35.0826 22.0011 52 22.0011 52H58C58 52 58 35.0663 58 31.347Z"
      fill="#EBEFF2"
    />
    <g filter="url(#filter0_b_3044_25542)">
      <rect
        x="30.8641"
        y="43.1396"
        width="18.3042"
        height="18.3042"
        rx="9.15211"
        fill="#FCFCFC"
      />
      <rect
        x="31.4361"
        y="43.7117"
        width="17.1602"
        height="17.1602"
        rx="8.58011"
        stroke="white"
        stroke-width="1.14401"
      />
    </g>
    <defs>
      <filter
        id="filter0_b_3044_25542"
        x="21.712"
        y="33.9875"
        width="36.6084"
        height="36.6084"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="4.57606" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_3044_25542"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_3044_25542"
          result="shape"
        />
      </filter>
    </defs>
  </svg>`
}
