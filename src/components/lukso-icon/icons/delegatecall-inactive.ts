import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const delegatecallInactive = (options: IconOptions) => {
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
    <g opacity="0.5" filter="url(#filter0_i_2501_33146)">
      <path
        d="M35.1429 39.1429C39.8768 39.1429 43.7143 35.3053 43.7143 30.5714C43.7143 25.8376 39.8768 22 35.1429 22C30.409 22 26.5715 25.8376 26.5715 30.5714C26.5715 35.3053 30.409 39.1429 35.1429 39.1429Z"
        fill="#CBD2D8"
      />
      <path
        d="M35.1429 40.8571C29.4214 40.8571 18 44.6856 18 52.2856V54.9999C18 56.6568 19.3431 57.9999 21 57.9999H49.2858C50.9426 57.9999 52.2858 56.6568 52.2858 54.9999V52.2856C52.2858 44.6856 40.8643 40.8571 35.1429 40.8571Z"
        fill="#CBD2D8"
      />
    </g>
    <g filter="url(#filter1_bi_2501_33146)">
      <path
        d="M44.1429 39.1429C48.8768 39.1429 52.7143 35.3053 52.7143 30.5714C52.7143 25.8376 48.8768 22 44.1429 22C39.409 22 35.5715 25.8376 35.5715 30.5714C35.5715 35.3053 39.409 39.1429 44.1429 39.1429Z"
        fill="white"
        fill-opacity="0.6"
      />
      <path
        d="M51.9643 30.5714C51.9643 34.8911 48.4626 38.3929 44.1429 38.3929C39.8232 38.3929 36.3215 34.8911 36.3215 30.5714C36.3215 26.2518 39.8232 22.75 44.1429 22.75C48.4626 22.75 51.9643 26.2518 51.9643 30.5714Z"
        stroke="white"
        stroke-opacity="0.1"
        stroke-width="1.5"
      />
      <path
        d="M44.1429 40.8571C38.4214 40.8571 27 44.6856 27 52.2856V54.9999C27 56.6568 28.3431 57.9999 30 57.9999H58.2858C59.9426 57.9999 61.2858 56.6568 61.2858 54.9999V52.2856C61.2858 44.6856 49.8643 40.8571 44.1429 40.8571Z"
        fill="white"
        fill-opacity="0.6"
      />
      <path
        d="M27.75 52.2856C27.75 48.9081 30.2897 46.2468 33.7793 44.3829C37.2448 42.5318 41.4096 41.6071 44.1429 41.6071C46.8761 41.6071 51.0409 42.5318 54.5065 44.3829C57.996 46.2468 60.5358 48.9081 60.5358 52.2856V54.9999C60.5358 56.2426 59.5284 57.2499 58.2858 57.2499H30C28.7574 57.2499 27.75 56.2426 27.75 54.9999V52.2856Z"
        stroke="white"
        stroke-opacity="0.1"
        stroke-width="1.5"
      />
    </g>
    <defs>
      <filter
        id="filter0_i_2501_33146"
        x="18"
        y="22"
        width="37.2858"
        height="37.9999"
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
        <feOffset dx="3" dy="2" />
        <feGaussianBlur stdDeviation="4.5" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.702857 0 0 0 0 0.742857 0 0 0 0 0.777143 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_2501_33146"
        />
      </filter>
      <filter
        id="filter1_bi_2501_33146"
        x="21"
        y="16"
        width="46.2858"
        height="47.9999"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="3" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_2501_33146"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2501_33146"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="2" dy="2" />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_2501_33146"
        />
      </filter>
    </defs>
  </svg>`
}
