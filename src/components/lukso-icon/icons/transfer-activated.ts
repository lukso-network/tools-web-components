import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const transferActivated = (options: IconOptions) => {
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
    <g filter="url(#filter0_ii_6_1450)">
      <rect width="80" height="80" rx="24" fill="#FAD276" />
      <rect
        x="14"
        y="47"
        width="50.1429"
        height="16"
        rx="8"
        fill="url(#paint0_linear_6_1450)"
      />
      <circle cx="57.2857" cy="55" r="8" fill="#F9AE3F" />
      <rect
        x="14"
        y="18"
        width="52"
        height="16"
        rx="8"
        fill="url(#paint1_linear_6_1450)"
      />
      <circle cx="22" cy="26" r="8" fill="white" fill-opacity="0.7" />
    </g>
    <defs>
      <filter
        id="filter0_ii_6_1450"
        x="-1"
        y="-1"
        width="82"
        height="82"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-1" dy="-1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.970833 0 0 0 0 0.791867 0 0 0 0 0.380243 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_6_1450"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="1" dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_innerShadow_6_1450"
          result="effect2_innerShadow_6_1450"
        />
      </filter>
      <linearGradient
        id="paint0_linear_6_1450"
        x1="57.5"
        y1="56.5"
        x2="14"
        y2="55"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FDBE3F" />
        <stop offset="1" stop-color="#FDBE3F" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_6_1450"
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
