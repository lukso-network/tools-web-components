import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const changeextensionsActivated = (options: IconOptions) => {
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
    <g filter="url(#filter0_ii_3043_25488)">
      <rect width="80" height="80" rx="24" fill="#FAD276" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M66 21C66 17.134 62.866 14 59 14H21C17.134 14 14 17.134 14 21C14 24.866 17.134 28 21 28H59C62.866 28 66 24.866 66 21ZM66 59C66 55.134 62.866 52 59 52H21C17.134 52 14 55.134 14 59C14 62.866 17.134 66 21 66H59C62.866 66 66 62.866 66 59Z"
        fill="url(#paint0_radial_3043_25488)"
      />
      <g filter="url(#filter1_b_3043_25488)">
        <rect
          x="14"
          y="32"
          width="32"
          height="16"
          rx="8"
          fill="#FCFCFC"
          fill-opacity="0.6"
        />
        <rect
          x="14.5"
          y="32.5"
          width="31"
          height="15"
          rx="7.5"
          stroke="white"
          stroke-opacity="0.7"
        />
      </g>
      <g filter="url(#filter2_b_3043_25488)">
        <rect
          x="50"
          y="32"
          width="16"
          height="16"
          rx="8"
          fill="#FCFCFC"
          fill-opacity="0.6"
        />
        <rect
          x="50.5"
          y="32.5"
          width="15"
          height="15"
          rx="7.5"
          stroke="white"
          stroke-opacity="0.7"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_ii_3043_25488"
        x="-2"
        y="-2"
        width="84"
        height="84"
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
        <feOffset dx="-2" dy="-2" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.970833 0 0 0 0 0.791867 0 0 0 0 0.380243 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_3043_25488"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="2" dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_innerShadow_3043_25488"
          result="effect2_innerShadow_3043_25488"
        />
      </filter>
      <filter
        id="filter1_b_3043_25488"
        x="10"
        y="28"
        width="40"
        height="24"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_3043_25488"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_3043_25488"
          result="shape"
        />
      </filter>
      <filter
        id="filter2_b_3043_25488"
        x="46"
        y="28"
        width="24"
        height="24"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_3043_25488"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_3043_25488"
          result="shape"
        />
      </filter>
      <radialGradient
        id="paint0_radial_3043_25488"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(40 40) scale(37 44.8269)"
      >
        <stop stop-color="#F9AE3F" />
        <stop offset="1" stop-color="#FBCB63" />
      </radialGradient>
    </defs>
  </svg>`
}
