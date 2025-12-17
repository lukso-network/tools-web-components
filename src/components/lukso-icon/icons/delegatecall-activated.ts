import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const delegatecallActivated = (options: IconOptions) => {
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
    <g filter="url(#filter0_ii_1810_22228)">
      <rect width="80" height="80" rx="24" fill="#F69E82" />
      <g opacity="0.5" filter="url(#filter1_i_1810_22228)">
        <path
          d="M35.1429 39.1429C39.8768 39.1429 43.7143 35.3053 43.7143 30.5714C43.7143 25.8376 39.8768 22 35.1429 22C30.409 22 26.5715 25.8376 26.5715 30.5714C26.5715 35.3053 30.409 39.1429 35.1429 39.1429Z"
          fill="#F56F45"
        />
        <path
          d="M35.1429 40.8571C29.4214 40.8571 18 44.6856 18 52.2856V54.9999C18 56.6568 19.3431 57.9999 21 57.9999H49.2858C50.9426 57.9999 52.2858 56.6568 52.2858 54.9999V52.2856C52.2858 44.6856 40.8643 40.8571 35.1429 40.8571Z"
          fill="#F56F45"
        />
      </g>
      <g filter="url(#filter2_bi_1810_22228)">
        <path
          d="M44.1429 39.1429C48.8768 39.1429 52.7143 35.3053 52.7143 30.5714C52.7143 25.8376 48.8768 22 44.1429 22C39.409 22 35.5715 25.8376 35.5715 30.5714C35.5715 35.3053 39.409 39.1429 44.1429 39.1429Z"
          fill="white"
          fill-opacity="0.6"
        />
        <path
          d="M52.4643 30.5714C52.4643 35.1672 48.7387 38.8929 44.1429 38.8929C39.5471 38.8929 35.8215 35.1672 35.8215 30.5714C35.8215 25.9756 39.5471 22.25 44.1429 22.25C48.7387 22.25 52.4643 25.9756 52.4643 30.5714Z"
          stroke="white"
          stroke-opacity="0.7"
          stroke-width="0.5"
        />
        <path
          d="M44.1429 40.8571C38.4214 40.8571 27 44.6856 27 52.2856V54.9999C27 56.6568 28.3431 57.9999 30 57.9999H58.2858C59.9426 57.9999 61.2858 56.6568 61.2858 54.9999V52.2856C61.2858 44.6856 49.8643 40.8571 44.1429 40.8571Z"
          fill="white"
          fill-opacity="0.6"
        />
        <path
          d="M27.25 52.2856C27.25 48.6265 30.0001 45.8346 33.5437 43.9419C37.0792 42.0534 41.3247 41.1071 44.1429 41.1071C46.9611 41.1071 51.2065 42.0534 54.7421 43.9419C58.2856 45.8346 61.0358 48.6265 61.0358 52.2856V54.9999C61.0358 56.5187 59.8045 57.7499 58.2858 57.7499H30C28.4812 57.7499 27.25 56.5187 27.25 54.9999V52.2856Z"
          stroke="white"
          stroke-opacity="0.7"
          stroke-width="0.5"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_ii_1810_22228"
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
          result="effect1_innerShadow_1810_22228"
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
          in2="effect1_innerShadow_1810_22228"
          result="effect2_innerShadow_1810_22228"
        />
      </filter>
      <filter
        id="filter1_i_1810_22228"
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
          values="0 0 0 0 0.914306 0 0 0 0 0.258052 0 0 0 0 0.0523611 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_1810_22228"
        />
      </filter>
      <filter
        id="filter2_bi_1810_22228"
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
          result="effect1_backgroundBlur_1810_22228"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_1810_22228"
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
          result="effect2_innerShadow_1810_22228"
        />
      </filter>
    </defs>
  </svg>`
}
