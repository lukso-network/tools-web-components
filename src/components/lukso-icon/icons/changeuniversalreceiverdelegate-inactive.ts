import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const changeuniversalreceiverdelegateInactive = (options: IconOptions) => {
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
    <g filter="url(#filter0_b_3044_25572)">
      <rect x="31" y="24" width="18" height="37" rx="9" fill="#FCFCFC" />
      <rect
        x="31.572"
        y="24.572"
        width="16.856"
        height="35.856"
        rx="8.42799"
        stroke="white"
        stroke-width="1.14401"
      />
    </g>
    <defs>
      <filter
        id="filter0_b_3044_25572"
        x="21.8479"
        y="14.8479"
        width="36.3042"
        height="55.3042"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="4.57606" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_3044_25572"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_3044_25572"
          result="shape"
        />
      </filter>
    </defs>
  </svg>`
}
