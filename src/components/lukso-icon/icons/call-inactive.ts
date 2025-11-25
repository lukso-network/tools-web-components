import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const callInactive = (options: IconOptions) => {
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
    <rect x="12" y="34" width="35" height="13" rx="4" fill="#CBD2D8" />
    <g filter="url(#filter0_b_6_1510)">
      <path
        d="M67.004 38.4286C68.0211 39.2293 68.0211 40.7707 67.004 41.5714L39.2372 63.4321C37.9252 64.465 36 63.5305 36 61.8607L36 18.1393C36 16.4695 37.9252 15.535 39.2372 16.5679L67.004 38.4286Z"
        fill="white"
        fill-opacity="0.7"
      />
      <path
        d="M66.8494 38.625C67.7393 39.3257 67.7393 40.6743 66.8494 41.375L39.0825 63.2357C37.9346 64.1395 36.25 63.3218 36.25 61.8607L36.25 18.1393C36.25 16.6782 37.9346 15.8605 39.0825 16.7643L66.8494 38.625Z"
        stroke="white"
        stroke-opacity="0.7"
        stroke-width="0.5"
      />
    </g>
    <defs>
      <filter
        id="filter0_b_6_1510"
        x="32"
        y="12.1355"
        width="39.7668"
        height="55.7289"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_6_1510"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_6_1510"
          result="shape"
        />
      </filter>
    </defs>
  </svg>`
}
