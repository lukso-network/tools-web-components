import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const progressIndicatorAlt = (options: IconOptions) => {
  const uniqueId = Math.random().toString(36).substring(7)
  return html`<svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style=${styleMap({
        width: `${options.width}px`,
        height: `${options.height}px`,
      })}
    >
      <g filter="url(#filter0_ii_2356_9)">
        <path
          d="M64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32ZM4.8 32C4.8 47.0221 16.9779 59.2 32 59.2C47.0221 59.2 59.2 47.0221 59.2 32C59.2 16.9779 47.0221 4.8 32 4.8C16.9779 4.8 4.8 16.9779 4.8 32Z"
          fill="#F8FAFB"
        />
      </g>
      <defs>
        <filter
          id="filter0_ii_2356_9"
          x="-2"
          y="-2"
          width="68"
          height="68"
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
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.17 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_2356_9"
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
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_2356_9"
            result="effect2_innerShadow_2356_9"
          />
        </filter>
      </defs></svg
    ><svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style=${styleMap({
        width: `${options.width}px`,
        height: `${options.height}px`,
      })}
      class="absolute animate-spin top-0 left-0"
    >
      <g clip-path="url(#${uniqueId}_clip0_2235_25110)">
        <g filter="url(#${uniqueId}_filter0_i_2235_25110)">
          <path
            d="M61.6 32C62.9255 32 64.0094 33.0761 63.91 34.3978C63.5671 38.9614 62.2484 43.4083 60.0322 47.4336C57.4293 52.1613 53.673 56.1538 49.1127 59.0399C44.5523 61.926 39.3362 63.6118 33.9494 63.9406C28.5626 64.2693 23.1801 63.2304 18.3027 60.9203C13.4253 58.6102 9.21129 55.1041 6.05278 50.7281C2.89427 46.3521 0.893816 41.2483 0.237506 35.8915C-0.418804 30.5348 0.290348 25.099 2.299 20.0899C4.00925 15.8249 6.61426 11.9873 9.92785 8.83061C10.8876 7.91635 12.4068 8.0732 13.2466 9.09871V9.09871C14.0863 10.1242 13.9272 11.6292 12.9797 12.5561C10.2862 15.1908 8.163 18.3631 6.75415 21.8764C5.0468 26.1342 4.44402 30.7545 5.00188 35.3078C5.55974 39.8611 7.26013 44.1993 9.94486 47.9189C12.6296 51.6385 16.2115 54.6187 20.3573 56.5823C24.5031 58.5458 29.0782 59.4289 33.657 59.1495C38.2358 58.87 42.6695 57.4371 46.5458 54.9839C50.422 52.5308 53.6149 49.1371 55.8273 45.1186C57.653 41.8027 58.7622 38.1502 59.0942 34.3969C59.211 33.0766 60.2745 32 61.6 32V32Z"
            fill="url(#${uniqueId}_paint0_linear_2235_25110)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="${uniqueId}_filter0_i_2235_25110"
          x="0"
          y="8.22852"
          width="64.9164"
          height="56.7715"
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
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_2235_25110"
          />
        </filter>
        <linearGradient
          id="${uniqueId}_paint0_linear_2235_25110"
          x1="49.6"
          y1="38.4"
          x2="-35.2"
          y2="-15.2"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F8DAD3" />
          <stop offset="1" stop-color="#CC99AE" />
        </linearGradient>
        <clipPath id="${uniqueId}_clip0_2235_25110">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>`
}
