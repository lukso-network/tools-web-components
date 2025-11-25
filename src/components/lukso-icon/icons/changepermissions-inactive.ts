import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const changepermissionsInactive = (options: IconOptions) => {
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
    <g id="Group 207">
      <g id="Rectangle 125" filter="url(#filter0_bi_780_544)">
        <rect width="24" height="24" rx="8" fill="white" fill-opacity="0.3" />
      </g>
      <g id="Group 205">
        <g id="Rectangle 124" filter="url(#filter1_b_780_544)">
          <rect x="4" y="6" width="14" height="2.5" rx="1.25" fill="#C3CBD1" />
        </g>
        <g id="Ellipse 31" filter="url(#filter2_b_780_544)">
          <circle cx="17.25" cy="7.25" r="3.25" fill="white" />
          <circle
            cx="17.25"
            cy="7.25"
            r="3"
            stroke="white"
            stroke-opacity="0.7"
            stroke-width="0.5"
          />
        </g>
      </g>
      <g id="Group 206">
        <g id="Rectangle 124_2" filter="url(#filter3_b_780_544)">
          <rect x="6" y="15" width="14" height="2.5" rx="1.25" fill="#C3CBD1" />
        </g>
        <g id="Ellipse 31_2" filter="url(#filter4_b_780_544)">
          <circle cx="6.75" cy="16.25" r="3.25" fill="white" />
          <circle
            cx="6.75"
            cy="16.25"
            r="3"
            stroke="white"
            stroke-opacity="0.7"
            stroke-width="0.5"
          />
        </g>
      </g>
    </g>
    <defs>
      <filter
        id="filter0_bi_780_544"
        x="-8"
        y="-8"
        width="40"
        height="40"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="4" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_780_544"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_780_544"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_780_544"
        />
      </filter>
      <filter
        id="filter1_b_780_544"
        x="1"
        y="3"
        width="20"
        height="8.5"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_780_544"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_780_544"
          result="shape"
        />
      </filter>
      <filter
        id="filter2_b_780_544"
        x="13"
        y="3"
        width="8.5"
        height="8.5"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="0.5" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_780_544"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_780_544"
          result="shape"
        />
      </filter>
      <filter
        id="filter3_b_780_544"
        x="3"
        y="12"
        width="20"
        height="8.5"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.5" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_780_544"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_780_544"
          result="shape"
        />
      </filter>
      <filter
        id="filter4_b_780_544"
        x="2.5"
        y="12"
        width="8.5"
        height="8.5"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="0.5" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_780_544"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_780_544"
          result="shape"
        />
      </filter>
    </defs>
  </svg>`
}
