import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const setdataInactive = (options: IconOptions) => {
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
    <path
      d="M38.8561 43.4899C39.875 43.0328 41.0386 43.0223 42.0656 43.4612L67.8448 54.478C68.6031 54.802 68.5626 55.8904 67.7823 56.1572L41.708 65.0715C40.8941 65.3497 40.0122 65.3582 39.1931 65.0957L13.1454 56.747C12.3596 56.4952 12.2988 55.4067 13.0517 55.0689L38.8561 43.4899Z"
      fill="#C3CBD1"
    />
    <g filter="url(#filter0_b_6_1368)">
      <path
        d="M39.4522 29.4608C39.949 29.2533 40.5084 29.2548 41.004 29.465L67.8259 40.8405C68.5871 41.1634 68.5467 42.2557 67.7636 42.5214L41.5045 51.4309C40.677 51.7116 39.7803 51.7137 38.9516 51.4368L12.2742 42.5225C11.4857 42.2591 11.4454 41.1589 12.2125 40.8385L39.4522 29.4608Z"
        fill="#DADFE6"
        fill-opacity="0.5"
      />
    </g>
    <g filter="url(#filter1_b_6_1368)">
      <path
        d="M39.4522 15.8244C39.949 15.617 40.5084 15.6185 41.004 15.8287L67.8259 27.2042C68.5871 27.527 68.5467 28.6194 67.7637 28.885L41.5045 37.7945C40.677 38.0753 39.7803 38.0773 38.9516 37.8004L12.2742 28.8862C11.4857 28.6227 11.4454 27.5225 12.2125 27.2021L39.4522 15.8244Z"
        fill="white"
        fill-opacity="0.8"
      />
    </g>
    <defs>
      <filter
        id="filter0_b_6_1368"
        x="3.6594"
        y="21.3063"
        width="72.7151"
        height="38.3367"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="4" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_6_1368"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_6_1368"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_b_6_1368"
        x="9.6594"
        y="13.6699"
        width="60.7151"
        height="26.3367"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="1" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_6_1368"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_6_1368"
          result="shape"
        />
      </filter>
    </defs>
  </svg>`
}
