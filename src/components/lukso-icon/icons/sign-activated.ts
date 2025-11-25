import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const signActivated = (options: IconOptions) => {
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
    <g filter="url(#filter0_i_2543_33265)">
      <rect width="80" height="80" rx="24" fill="#98BEE1" />
      <g filter="url(#filter1_bi_2543_33265)">
        <path
          d="M18 35.2876V56.9688C18 58.386 18.563 59.7452 19.5651 60.7474C20.5673 61.7495 21.9265 62.3125 23.3438 62.3125H48.2812C49.6985 62.3125 51.0577 61.7495 52.0599 60.7474C53.062 59.7452 53.625 58.386 53.625 56.9688V21.3438C53.625 19.9265 53.062 18.5673 52.0599 17.5651C51.0577 16.563 49.6985 16 48.2812 16H37.2876C36.3431 16.0001 35.4373 16.3754 34.7694 17.0431L19.0431 32.7694C18.3754 33.4373 18.0001 34.3431 18 35.2876Z"
          fill="white"
          fill-opacity="0.3"
        />
      </g>
      <path
        d="M39.375 42.125H25.125"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M32.25 49.25H25.125"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M39.375 49.25H37"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <g filter="url(#filter2_d_2543_33265)">
        <path
          d="M35.8125 16.3207V30.2501C35.8125 31.1949 35.4372 32.101 34.7691 32.7691C34.101 33.4372 33.1948 33.8126 32.25 33.8126H18.3206"
          fill="white"
          fill-opacity="0.4"
          shape-rendering="crispEdges"
        />
      </g>
      <path
        d="M50.8312 46.9215L63.1804 34.9707C63.5773 34.5866 63.5773 33.9639 63.1804 33.5799L60.1998 30.6954C59.8029 30.3113 59.1594 30.3113 58.7626 30.6954L46.4134 42.6462C46.2718 42.7832 46.1752 42.9577 46.1357 43.1477L45.0839 48.2081L50.313 47.1903C50.5093 47.1521 50.6896 47.0586 50.8312 46.9215Z"
        fill="white"
        stroke="white"
        stroke-width="0.5"
        stroke-linecap="round"
      />
      <path d="M56 33L61 38" stroke="#6393B8" />
    </g>
    <defs>
      <filter
        id="filter0_i_2543_33265"
        x="-1"
        y="-1"
        width="81"
        height="81"
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
          values="0 0 0 0 0.548958 0 0 0 0 0.705665 0 0 0 0 0.85 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_2543_33265"
        />
      </filter>
      <filter
        id="filter1_bi_2543_33265"
        x="10"
        y="8"
        width="51.625"
        height="62.3125"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="4" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_2543_33265"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2543_33265"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="3" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_2543_33265"
        />
      </filter>
      <filter
        id="filter2_d_2543_33265"
        x="13.3206"
        y="11.3207"
        width="29.4919"
        height="29.4918"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="1" dy="1" />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.388235 0 0 0 0 0.576471 0 0 0 0 0.721569 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2543_33265"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2543_33265"
          result="shape"
        />
      </filter>
    </defs>
  </svg>`
}
