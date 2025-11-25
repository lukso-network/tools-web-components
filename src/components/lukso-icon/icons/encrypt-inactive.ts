import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const encryptInactive = (options: IconOptions) => {
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
    <g filter="url(#filter0_bi_2542_32351)">
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
    <g filter="url(#filter1_d_2542_32351)">
      <path
        d="M35.8125 16.3207V30.2501C35.8125 31.1949 35.4372 32.101 34.7691 32.7691C34.101 33.4372 33.1948 33.8126 32.25 33.8126H18.3206"
        fill="white"
        fill-opacity="0.4"
        shape-rendering="crispEdges"
      />
    </g>
    <path
      d="M47 46.25V38.25C47 37.6977 47.4477 37.25 48 37.25H60C60.5523 37.25 61 37.6977 61 38.25V46.25C61 47.3546 60.1046 48.25 59 48.25H49C47.8954 48.25 47 47.3546 47 46.25Z"
      fill="white"
      stroke="white"
      stroke-width="0.5"
      stroke-linecap="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M54.7071 41.0429C55.0976 41.4333 55.0976 42.0667 54.7071 42.4571C54.3167 42.8476 53.6833 42.8476 53.2929 42.4571C52.9024 42.0667 52.9024 41.4333 53.2929 41.0429C53.6833 40.6524 54.3167 40.6524 54.7071 41.0429Z"
      fill="#CBD2D8"
    />
    <path
      d="M49 37.25V34.25C49 32.0409 50.7909 30.25 53 30.25H55C57.2091 30.25 59 32.0411 59 34.2503C59 35.5089 59 36.7111 59 37.25"
      stroke="white"
      stroke-linecap="square"
      stroke-linejoin="round"
    />
    <path
      d="M54 42L54 45"
      stroke="#CBD2D8"
      stroke-width="0.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <defs>
      <filter
        id="filter0_bi_2542_32351"
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
          result="effect1_backgroundBlur_2542_32351"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2542_32351"
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
          result="effect2_innerShadow_2542_32351"
        />
      </filter>
      <filter
        id="filter1_d_2542_32351"
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
          values="0 0 0 0 0.796078 0 0 0 0 0.823529 0 0 0 0 0.847059 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2542_32351"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2542_32351"
          result="shape"
        />
      </filter>
    </defs>
  </svg>`
}
