import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const progressIndicator = (options: IconOptions) => {
  const uniqueId = Math.random().toString(36).substring(7)
  return html`<svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style=${styleMap({
        width: `${options.width}px`,
        height: `${options.height}px`,
      })}
    >
      <g clip-path="url(#clip0_1744_19360)">
        <g filter="url(#filter0_ddd_1744_19360)">
          <circle cx="20" cy="20" r="20" fill="transparent" />
        </g>
        <g filter="url(#filter1_ii_1744_19360)">
          <path
            d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20ZM5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20Z"
            fill="#F8FAFB"
          />
        </g>
      </g>
      <defs>
        <filter
          id="${uniqueId}_filter0_ddd_1744_19360"
          x="-42"
          y="-42"
          width="124"
          height="124"
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
          <feMorphology
            radius="2"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow_1744_19360"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="20" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.973333 0 0 0 0 0.853333 0 0 0 0 0.826667 0 0 0 0.34 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1744_19360"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-1" dy="-1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_1744_19360"
            result="effect2_dropShadow_1744_19360"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_1744_19360"
            result="effect3_dropShadow_1744_19360"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_1744_19360"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_ii_1744_19360"
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
            result="effect1_innerShadow_1744_19360"
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
            in2="effect1_innerShadow_1744_19360"
            result="effect2_innerShadow_1744_19360"
          />
        </filter>
        <clipPath id="clip0_1744_19360">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs></svg
    ><svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style=${styleMap({
        width: `${options.width}px`,
        height: `${options.height}px`,
      })}
      class="absolute animate-spin top-0 left-0"
    >
      <g clip-path="url(#${uniqueId}_clip0_1744_19359)">
        <g filter="url(#${uniqueId}_filter0_i_1744_19359)">
          <path
            d="M37.5 20C38.8807 20 40.0161 21.1236 39.844 22.4935C39.5295 24.9957 38.7437 27.4237 37.5201 29.646C35.8933 32.6008 33.5456 35.0962 30.6954 36.8999C27.8452 38.7037 24.5851 39.7574 21.2184 39.9629C17.8516 40.1683 14.4876 39.519 11.4392 38.0752C8.39078 36.6314 5.75706 34.4401 3.78299 31.7051C1.80892 28.97 0.558635 25.7802 0.148441 22.4322C-0.261752 19.0842 0.181468 15.6869 1.43687 12.5562C2.38109 10.2015 3.76167 8.05527 5.49841 6.22669C6.44925 5.22556 8.0379 5.39214 8.91267 6.46039V6.46039C9.78744 7.52863 9.61127 9.09217 8.70295 10.132C7.59699 11.3982 6.70777 12.8458 6.07766 14.4171C5.1361 16.7652 4.80369 19.3132 5.11133 21.8242C5.41898 24.3351 6.35669 26.7275 7.83724 28.7788C9.31779 30.8301 11.2931 32.4735 13.5794 33.5564C15.8657 34.6392 18.3887 35.1263 20.9138 34.9721C23.4388 34.818 25.8839 34.0278 28.0216 32.675C30.1592 31.3221 31.92 29.4506 33.1401 27.2345C33.9566 25.7515 34.5132 24.1463 34.7921 22.4885C35.0212 21.1269 36.1193 20 37.5 20V20Z"
            fill="url(#${uniqueId}_paint0_linear_1744_19359)"
          />
        </g>
      </g>
      <defs>
        <filter
          id="${uniqueId}_filter0_i_1744_19359"
          x="0"
          y="5.5603"
          width="40.8613"
          height="35.4397"
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
            result="effect1_innerShadow_1744_19359"
          />
        </filter>
        <linearGradient
          id="${uniqueId}_paint0_linear_1744_19359"
          x1="31"
          y1="24"
          x2="-22"
          y2="-9.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F8DAD3" />
          <stop offset="1" stop-color="#CC99AE" />
        </linearGradient>
        <clipPath id="${uniqueId}_clip0_1744_19359">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>`
}
