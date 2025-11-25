import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const editpermissionsInactive = (options: IconOptions) => {
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
    <g filter="url(#filter0_bi_6_1634)">
      <rect
        x="16"
        y="16"
        width="48"
        height="48"
        rx="8"
        fill="white"
        fill-opacity="0.3"
      />
    </g>
    <g filter="url(#filter1_b_6_1634)">
      <rect x="24" y="28" width="28" height="5" rx="2.5" fill="#C3CBD1" />
    </g>
    <g filter="url(#filter2_b_6_1634)">
      <circle cx="50.5" cy="30.5" r="6.5" fill="white" />
      <circle
        cx="50.5"
        cy="30.5"
        r="6.25"
        stroke="white"
        stroke-opacity="0.7"
        stroke-width="0.5"
      />
    </g>
    <g filter="url(#filter3_b_6_1634)">
      <rect x="28" y="46" width="28" height="5" rx="2.5" fill="#C3CBD1" />
    </g>
    <g filter="url(#filter4_b_6_1634)">
      <circle cx="29.5" cy="48.5" r="6.5" fill="white" />
      <circle
        cx="29.5"
        cy="48.5"
        r="6.25"
        stroke="white"
        stroke-opacity="0.7"
        stroke-width="0.5"
      />
    </g>
    <defs>
      <filter
        id="filter0_bi_6_1634"
        x="8"
        y="8"
        width="64"
        height="64"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="4" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_6_1634"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_6_1634"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_6_1634"
        />
      </filter>
      <filter
        id="filter1_b_6_1634"
        x="21"
        y="25"
        width="34"
        height="11"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_6_1634"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_6_1634"
          result="shape"
        />
      </filter>
      <filter
        id="filter2_b_6_1634"
        x="43"
        y="23"
        width="15"
        height="15"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="0.5" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_6_1634"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_6_1634"
          result="shape"
        />
      </filter>
      <filter
        id="filter3_b_6_1634"
        x="25"
        y="43"
        width="34"
        height="11"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_6_1634"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_6_1634"
          result="shape"
        />
      </filter>
      <filter
        id="filter4_b_6_1634"
        x="22"
        y="41"
        width="15"
        height="15"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="0.5" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_6_1634"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_6_1634"
          result="shape"
        />
      </filter>
    </defs>
  </svg>`
}
