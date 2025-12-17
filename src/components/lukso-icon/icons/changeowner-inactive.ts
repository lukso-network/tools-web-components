import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const changeownerInactive = (options: IconOptions) => {
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
    <g filter="url(#filter0_i_6_1589)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M65.5 39.5C65.5 25.1406 53.8594 13.5 39.5 13.5C25.1406 13.5 13.5 25.1406 13.5 39.5H25.5C25.5 31.768 31.768 25.5 39.5 25.5C47.232 25.5 53.5 31.768 53.5 39.5H65.5Z"
        fill="url(#paint0_radial_6_1589)"
      />
    </g>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.5002 39.5C13.5002 53.8594 25.1407 65.5 39.5002 65.5C53.8596 65.5 65.5002 53.8594 65.5002 39.5L53.5002 39.5C53.5002 47.232 47.2321 53.5 39.5002 53.5C31.7682 53.5 25.5002 47.232 25.5002 39.5L13.5002 39.5Z"
      fill="url(#paint1_linear_6_1589)"
    />
    <rect x="52" y="32.5" width="14" height="14" rx="7" fill="white" />
    <g filter="url(#filter1_b_6_1589)">
      <rect x="13.5" y="35" width="12" height="8" rx="2" fill="#C6CED4" />
    </g>
    <defs>
      <filter
        id="filter0_i_6_1589"
        x="13.5"
        y="13.5"
        width="53"
        height="27"
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
        <feOffset dx="1" dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_6_1589"
        />
      </filter>
      <filter
        id="filter1_b_6_1589"
        x="10.5"
        y="32"
        width="18"
        height="14"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_6_1589"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_6_1589"
          result="shape"
        />
      </filter>
      <radialGradient
        id="paint0_radial_6_1589"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(82 39.5) rotate(180) scale(73.5 333.001)"
      >
        <stop stop-color="white" />
        <stop offset="0.762031" stop-color="white" stop-opacity="0.237969" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </radialGradient>
      <linearGradient
        id="paint1_linear_6_1589"
        x1="17.9849"
        y1="40"
        x2="33.7335"
        y2="75.8002"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#C3CBD1" />
        <stop offset="1" stop-color="#D5DBE1" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>`
}
