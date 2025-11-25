import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const transactionActivated = (options: IconOptions) => {
  return html`<svg
    width="24"
    height="24"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style=${styleMap({
      width: `${options.width}px`,
      height: `${options.height}px`,
    })}
  >
    <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" fill="white" />
    <rect x="0.5" y="0.5" width="39" height="39" rx="19.5" stroke="#DEE7ED" />
    <g filter="url(#filter0_ii_960_256)">
      <rect width="40" height="40" rx="8" fill="#FAD276" />
      <rect
        x="7"
        y="23.5"
        width="25.0714"
        height="8"
        rx="4"
        fill="url(#paint0_linear_960_256)"
      />
      <circle cx="28.6428" cy="27.5" r="4" fill="#F9AE3F" />
      <rect
        x="7"
        y="9"
        width="26"
        height="8"
        rx="4"
        fill="url(#paint1_linear_960_256)"
      />
      <circle cx="11" cy="13" r="4" fill="white" fill-opacity="0.7" />
    </g>
    <defs>
      <filter
        id="filter0_ii_960_256"
        x="-1"
        y="-1"
        width="42"
        height="42"
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
          result="effect1_innerShadow_960_256"
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
          in2="effect1_innerShadow_960_256"
          result="effect2_innerShadow_960_256"
        />
      </filter>
      <linearGradient
        id="paint0_linear_960_256"
        x1="28.75"
        y1="28.25"
        x2="7"
        y2="27.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FDBE3F" />
        <stop offset="1" stop-color="#FDBE3F" stop-opacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_960_256"
        x1="-2.25"
        y1="13"
        x2="33"
        y2="13"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>`
}
