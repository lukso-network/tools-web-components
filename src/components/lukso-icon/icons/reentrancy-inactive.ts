import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const reentrancyInactive = (options: IconOptions) => {
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
    <g filter="url(#filter0_i_1877_22711)">
      <path
        d="M62 43C63.1045 43 64.0086 43.897 63.9167 44.9978C63.5791 49.0401 62.221 52.9428 59.9552 56.3337C57.3181 60.2805 53.5698 63.3566 49.1844 65.1731C44.799 66.9896 39.9734 67.4649 35.3178 66.5388C30.6623 65.6128 26.3859 63.327 23.0294 59.9706L31.5147 51.4853C33.1929 53.1635 35.3311 54.3064 37.6589 54.7694C39.9867 55.2324 42.3995 54.9948 44.5922 54.0866C46.7849 53.1783 48.659 51.6402 49.9776 49.6668C50.9239 48.2506 51.5536 46.6557 51.8337 44.9908C52.017 43.9015 52.8954 43 54 43H62Z"
        fill="url(#paint0_radial_1877_22711)"
      />
    </g>
    <g filter="url(#filter1_b_1877_22711)">
      <path
        d="M14.0051 44.2143C13.863 42.94 14.94 41.863 16.2144 42.0051L34.4055 44.0329C36.0718 44.2187 36.7837 46.2493 35.5981 47.4348L19.4349 63.5981C18.2493 64.7837 16.2187 64.0718 16.033 62.4054L14.0051 44.2143Z"
        fill="white"
        fill-opacity="0.7"
      />
      <path
        d="M14.2536 44.1866C14.1293 43.0716 15.0716 42.1292 16.1867 42.2535L34.3778 44.2814C35.8358 44.444 36.4587 46.2207 35.4213 47.2581L19.2581 63.4213C18.2207 64.4587 16.444 63.8358 16.2814 62.3778L14.2536 44.1866Z"
        stroke="white"
        stroke-opacity="0.7"
        stroke-width="0.5"
      />
    </g>
    <g filter="url(#filter2_i_1877_22711)">
      <path
        d="M17 37.8406C15.8955 37.8406 14.9914 36.9435 15.0833 35.8428C15.4209 31.8004 16.779 27.8978 19.0448 24.5069C21.6819 20.5601 25.4302 17.484 29.8156 15.6675C34.201 13.851 39.0266 13.3757 43.6822 14.3017C48.3377 15.2278 52.6141 17.5136 55.9706 20.87L47.4853 29.3553C45.8071 27.6771 43.6689 26.5342 41.3411 26.0712C39.0133 25.6081 36.6005 25.8458 34.4078 26.754C32.2151 27.6623 30.341 29.2003 29.0224 31.1737C28.0761 32.59 27.4464 34.1848 27.1663 35.8498C26.983 36.9391 26.1046 37.8406 25 37.8406H17Z"
        fill="url(#paint1_radial_1877_22711)"
      />
    </g>
    <g filter="url(#filter3_b_1877_22711)">
      <path
        d="M64.9949 36.6262C65.137 37.9006 64.06 38.9776 62.7856 38.8355L44.5945 36.8076C42.9282 36.6219 42.2163 34.5913 43.4019 33.4057L59.5651 17.2425C60.7507 16.0569 62.7813 16.7688 62.967 18.4351L64.9949 36.6262Z"
        fill="white"
        fill-opacity="0.7"
      />
      <path
        d="M64.7464 36.6539C64.8707 37.769 63.9284 38.7114 62.8133 38.587L44.6222 36.5592C43.1642 36.3966 42.5413 34.6199 43.5787 33.5825L59.7419 17.4193C60.7793 16.3819 62.556 17.0048 62.7186 18.4628L64.7464 36.6539Z"
        stroke="white"
        stroke-opacity="0.7"
        stroke-width="0.5"
      />
    </g>
    <defs>
      <filter
        id="filter0_i_1877_22711"
        x="22.0294"
        y="42"
        width="41.8937"
        height="25"
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
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_1877_22711"
        />
      </filter>
      <filter
        id="filter1_b_1877_22711"
        x="9.99249"
        y="37.9924"
        width="30.194"
        height="30.194"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_1877_22711"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_1877_22711"
          result="shape"
        />
      </filter>
      <filter
        id="filter2_i_1877_22711"
        x="15.0768"
        y="13.8406"
        width="41.8937"
        height="25"
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
          result="effect1_innerShadow_1877_22711"
        />
      </filter>
      <filter
        id="filter3_b_1877_22711"
        x="38.8135"
        y="12.6542"
        width="30.194"
        height="30.194"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_1877_22711"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_1877_22711"
          result="shape"
        />
      </filter>
      <radialGradient
        id="paint0_radial_1877_22711"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(25.5 55) scale(46 78.5269)"
      >
        <stop stop-color="#EFF2F4" />
        <stop offset="1" stop-color="#E8ECEF" />
      </radialGradient>
      <radialGradient
        id="paint1_radial_1877_22711"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(88.5 13.9999) rotate(-179.891) scale(84.0002 143.397)"
      >
        <stop stop-color="white" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </radialGradient>
    </defs>
  </svg>`
}
