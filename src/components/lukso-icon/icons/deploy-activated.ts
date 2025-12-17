import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const deployActivated = (options: IconOptions) => {
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
    <g filter="url(#filter0_ii_6_1514)">
      <rect width="80" height="80" rx="24" fill="#FAD276" />
      <path
        d="M20 22C20 20.8954 20.8954 20 22 20H31.8382C33.62 20 34.5124 22.1543 33.2525 23.4142L23.4142 33.2525C22.1543 34.5124 20 33.62 20 31.8382V22Z"
        fill="#FDBE3F"
      />
      <path
        d="M58 20C59.1046 20 60 20.8954 60 22L60 31.8382C60 33.62 57.8457 34.5124 56.5858 33.2525L46.7475 23.4142C45.4876 22.1543 46.38 20 48.1618 20L58 20Z"
        fill="#FDBE3F"
      />
      <path
        d="M60 58C60 59.1046 59.1046 60 58 60L48.1618 60C46.38 60 45.4876 57.8457 46.7475 56.5858L56.5858 46.7475C57.8457 45.4876 60 46.38 60 48.1618L60 58Z"
        fill="#FDBE3F"
      />
      <path
        d="M22 60C20.8954 60 20 59.1046 20 58L20 48.1618C20 46.38 22.1543 45.4876 23.4142 46.7475L33.2525 56.5858C34.5124 57.8457 33.62 60 31.8382 60L22 60Z"
        fill="#FDBE3F"
      />
      <rect
        x="30"
        y="30"
        width="20"
        height="20"
        rx="4"
        fill="white"
        fill-opacity="0.7"
      />
      <rect
        x="30.25"
        y="30.25"
        width="19.5"
        height="19.5"
        rx="3.75"
        stroke="white"
        stroke-opacity="0.7"
        stroke-width="0.5"
      />
    </g>
    <defs>
      <filter
        id="filter0_ii_6_1514"
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
          result="effect1_innerShadow_6_1514"
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
          in2="effect1_innerShadow_6_1514"
          result="effect2_innerShadow_6_1514"
        />
      </filter>
    </defs>
  </svg>`
}
