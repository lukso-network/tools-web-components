import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const executeRelayCallActivated = (options: IconOptions) => {
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
    <g filter="url(#filter0_ii_1009_927)">
      <rect width="40" height="40" rx="8" fill="#FAD276" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.5 9C12.7091 9 14.5 10.7909 14.5 13V22.0085C14.5 22.5561 14.9439 23 15.4915 23C16.0391 23 16.4831 22.5561 16.4831 22.0085V17.5085C16.4831 12.8094 20.2924 9 24.9915 9C29.6906 9 33.5 12.8094 33.5 17.5085V27C33.5 29.2091 31.7091 31 29.5 31C27.2909 31 25.5 29.2091 25.5 27V17.5085C25.5 17.2277 25.2723 17 24.9915 17C24.7107 17 24.4831 17.2277 24.4831 17.5085V22.0085C24.4831 26.9744 20.4574 31 15.4915 31C10.5256 31 6.5 26.9744 6.5 22.0085V13C6.5 10.7909 8.29086 9 10.5 9Z"
        fill="url(#paint0_radial_1009_927)"
      />
      <g filter="url(#filter1_b_1009_927)">
        <rect
          x="6.5"
          y="8.5"
          width="8"
          height="8"
          rx="4"
          fill="#FCFCFC"
          fill-opacity="0.6"
        />
        <rect
          x="7"
          y="9"
          width="7"
          height="7"
          rx="3.5"
          stroke="white"
          stroke-opacity="0.7"
        />
      </g>
      <g filter="url(#filter2_b_1009_927)">
        <rect
          x="25.5"
          y="23.5"
          width="8"
          height="8"
          rx="4"
          fill="#FCFCFC"
          fill-opacity="0.6"
        />
        <rect
          x="26"
          y="24"
          width="7"
          height="7"
          rx="3.5"
          stroke="white"
          stroke-opacity="0.7"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_ii_1009_927"
        x="-2"
        y="-2"
        width="44"
        height="44"
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
          result="effect1_innerShadow_1009_927"
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
          in2="effect1_innerShadow_1009_927"
          result="effect2_innerShadow_1009_927"
        />
      </filter>
      <filter
        id="filter1_b_1009_927"
        x="2.5"
        y="4.5"
        width="16"
        height="16"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_1009_927"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_1009_927"
          result="shape"
        />
      </filter>
      <filter
        id="filter2_b_1009_927"
        x="21.5"
        y="19.5"
        width="16"
        height="16"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_1009_927"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_1009_927"
          result="shape"
        />
      </filter>
      <radialGradient
        id="paint0_radial_1009_927"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(20 20) scale(19.2115 18.9652)"
      >
        <stop stop-color="#F9AE3F" />
        <stop offset="1" stop-color="#FBCB63" />
      </radialGradient>
    </defs>
  </svg>`
}
