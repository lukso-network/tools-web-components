import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const adduniversalreceiverdelegateActivated = (options: IconOptions) => {
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
    <g filter="url(#filter0_ii_3044_25536)">
      <rect width="80" height="80" rx="24" fill="#FAD276" />
      <path
        d="M58 31.347C58 21.5132 52.2951 18.0097 47.5998 16.3081C43.823 14.9423 39.9971 15.0006 39.9971 15.0006C39.9971 15.0006 36.2081 14.9315 32.4013 16.3081C27.7003 18.0122 22.0011 21.5033 22.0011 31.347C21.9986 35.0826 22.0011 52 22.0011 52H58C58 52 58 35.0663 58 31.347Z"
        fill="url(#paint0_radial_3044_25536)"
      />
      <g filter="url(#filter1_b_3044_25536)">
        <rect
          x="30.8641"
          y="43.1396"
          width="18.3042"
          height="18.3042"
          rx="9.15211"
          fill="#FCFCFC"
          fill-opacity="0.6"
        />
        <rect
          x="31.4361"
          y="43.7117"
          width="17.1602"
          height="17.1602"
          rx="8.58011"
          stroke="white"
          stroke-opacity="0.7"
          stroke-width="1.14401"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_ii_3044_25536"
        x="-2"
        y="-2"
        width="84"
        height="84"
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
        <feOffset dx="-2" dy="-2" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.970833 0 0 0 0 0.791867 0 0 0 0 0.380243 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect1_innerShadow_3044_25536"
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
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_innerShadow_3044_25536"
          result="effect2_innerShadow_3044_25536"
        />
      </filter>
      <filter
        id="filter1_b_3044_25536"
        x="26.8641"
        y="39.1396"
        width="26.3042"
        height="26.3042"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_3044_25536"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_3044_25536"
          result="shape"
        />
      </filter>
      <radialGradient
        id="paint0_radial_3044_25536"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(40 33.5) scale(25.6154 31.8961)"
      >
        <stop stop-color="#F9AE3F" />
        <stop offset="1" stop-color="#FBCB63" />
      </radialGradient>
    </defs>
  </svg>`
}
