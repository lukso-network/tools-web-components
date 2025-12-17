import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const progressComplete = (options: IconOptions) => {
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
    <g clip-path="url(#clip0_1438_17663)">
      <g filter="url(#filter0_ddd_1438_17663)">
        <circle cx="20" cy="20" r="20" fill="#F8FAFB" />
      </g>
      <g filter="url(#filter1_ii_1438_17663)">
        <path
          d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20ZM5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20Z"
          fill="#F8FAFB"
        />
      </g>
      <g filter="url(#filter2_i_1438_17663)">
        <path
          d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20ZM5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5C11.7157 5 5 11.7157 5 20Z"
          fill="url(#paint0_linear_1438_17663)"
        />
      </g>
      <g filter="url(#filter3_di_1438_17663)">
        <path
          d="M27 15.3381L17.4837 25.1263L14.9216 22.3296L13.6405 20.9313L13 20.2322"
          stroke="url(#paint1_linear_1438_17663)"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_ddd_1438_17663"
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
          result="effect1_dropShadow_1438_17663"
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
          result="effect1_dropShadow_1438_17663"
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
          in2="effect1_dropShadow_1438_17663"
          result="effect2_dropShadow_1438_17663"
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
          in2="effect2_dropShadow_1438_17663"
          result="effect3_dropShadow_1438_17663"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect3_dropShadow_1438_17663"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_ii_1438_17663"
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
          result="effect1_innerShadow_1438_17663"
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
          in2="effect1_innerShadow_1438_17663"
          result="effect2_innerShadow_1438_17663"
        />
      </filter>
      <filter
        id="filter2_i_1438_17663"
        x="0"
        y="0"
        width="41"
        height="41"
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
          result="effect1_innerShadow_1438_17663"
        />
      </filter>
      <filter
        id="filter3_di_1438_17663"
        x="10"
        y="13.3381"
        width="20"
        height="15.7882"
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
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.827451 0 0 0 0 0.682353 0 0 0 0 0.705882 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1438_17663"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1438_17663"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="-1" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.17 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_1438_17663"
        />
      </filter>
      <linearGradient
        id="paint0_linear_1438_17663"
        x1="31"
        y1="24"
        x2="-22"
        y2="-9.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#F8DAD3" />
        <stop offset="1" stop-color="#CC99AE" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_1438_17663"
        x1="23.85"
        y1="21.211"
        x2="9.56459"
        y2="8.2962"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#F8DAD3" />
        <stop offset="1" stop-color="#CC99AE" />
      </linearGradient>
      <clipPath id="clip0_1438_17663">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg> `
}
