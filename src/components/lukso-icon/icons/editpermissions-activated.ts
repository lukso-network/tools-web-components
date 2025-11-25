import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const editpermissionsActivated = (options: IconOptions) => {
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
    <g filter="url(#filter0_ii_6_1600)">
      <rect width="80" height="80" rx="24" fill="#F69E82" />
      <g filter="url(#filter1_bi_6_1600)">
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
      <g filter="url(#filter2_b_6_1600)">
        <rect x="24" y="28" width="28" height="5" rx="2.5" fill="#EB7F5D" />
      </g>
      <g filter="url(#filter3_b_6_1600)">
        <circle cx="50.5" cy="30.5" r="6.5" fill="white" fill-opacity="0.7" />
        <circle
          cx="50.5"
          cy="30.5"
          r="6.25"
          stroke="white"
          stroke-opacity="0.7"
          stroke-width="0.5"
        />
      </g>
      <g filter="url(#filter4_b_6_1600)">
        <rect x="28" y="46" width="28" height="5" rx="2.5" fill="#EB7F5D" />
      </g>
      <g filter="url(#filter5_b_6_1600)">
        <circle cx="29.5" cy="48.5" r="6.5" fill="white" fill-opacity="0.7" />
        <circle
          cx="29.5"
          cy="48.5"
          r="6.25"
          stroke="white"
          stroke-opacity="0.7"
          stroke-width="0.5"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_ii_6_1600"
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
          values="0 0 0 0 0.925 0 0 0 0 0.498118 0 0 0 0 0.362292 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_6_1600"
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
          in2="effect1_innerShadow_6_1600"
          result="effect2_innerShadow_6_1600"
        />
      </filter>
      <filter
        id="filter1_bi_6_1600"
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
          result="effect1_backgroundBlur_6_1600"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_6_1600"
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
          result="effect2_innerShadow_6_1600"
        />
      </filter>
      <filter
        id="filter2_b_6_1600"
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
          result="effect1_backgroundBlur_6_1600"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_6_1600"
          result="shape"
        />
      </filter>
      <filter
        id="filter3_b_6_1600"
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
          result="effect1_backgroundBlur_6_1600"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_6_1600"
          result="shape"
        />
      </filter>
      <filter
        id="filter4_b_6_1600"
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
          result="effect1_backgroundBlur_6_1600"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_6_1600"
          result="shape"
        />
      </filter>
      <filter
        id="filter5_b_6_1600"
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
          result="effect1_backgroundBlur_6_1600"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_6_1600"
          result="shape"
        />
      </filter>
    </defs>
  </svg>`
}
