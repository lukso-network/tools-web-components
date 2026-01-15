import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const parachute = (options: IconOptions) => {
  return html`<svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style=${styleMap({
      width: `${options.width}px`,
      height: `${options.height}px`,
    })}
  >
    <mask
      id="mask0_7790_250"
      style="mask-type:luminance"
      maskUnits="userSpaceOnUse"
      x="1"
      y="1"
      width="22"
      height="22"
    >
      <path d="M23 1H1V23H23V1Z" fill="white" />
    </mask>
    <g mask="url(#mask0_7790_250)">
      <mask
        id="mask1_7790_250"
        style="mask-type:luminance"
        maskUnits="userSpaceOnUse"
        x="1"
        y="1"
        width="22"
        height="22"
      >
        <path d="M1 1H23V23H1V1Z" fill="white" />
      </mask>
      <g mask="url(#mask1_7790_250)">
        <path
          d="M8.77734 20.5266C8.77734 21.5391 9.59816 22.36 10.6107 22.36H13.3893C14.4018 22.36 15.2227 21.5391 15.2227 20.5266V17.748C15.2227 16.7355 14.4018 15.9146 13.3893 15.9146H10.6107C9.59816 15.9146 8.77734 16.7355 8.77734 17.748V20.5266Z"
          stroke="var(--${options.color})"
          stroke-width="1.375"
          stroke-miterlimit="10"
        />
        <path
          d="M11.1716 14.1659C11.5027 14.8649 12.4973 14.8649 12.8284 14.1659L14.7047 10.2053C14.7628 10.0826 14.7932 9.94792 14.7921 9.81218C14.7555 5.28018 13.5194 1.64009 12 1.64009C10.4806 1.64009 9.24446 5.28018 9.20787 9.81218C9.20677 9.94792 9.23718 10.0826 9.29529 10.2053L11.1716 14.1659Z"
          stroke="var(--${options.color})"
          stroke-width="1.28906"
          stroke-miterlimit="10"
        />
        <path
          d="M3.62109 10.019C5.16488 8.4752 7.66325 8.4752 9.20703 10.019C10.7508 8.4752 13.2492 8.4752 14.793 10.019C16.3368 8.4752 18.8351 8.4752 20.3789 10.019"
          stroke="var(--${options.color})"
          stroke-width="1.28906"
          stroke-miterlimit="10"
        />
        <path
          d="M11.4725 15.5435C11.7889 15.7661 12.2111 15.7661 12.5275 15.5435L19.9897 10.2928C20.2337 10.1212 20.3823 9.84101 20.3656 9.54314C20.1189 5.13698 16.4679 1.64009 12 1.64009C7.53218 1.64009 3.88107 5.13698 3.63438 9.54314C3.6177 9.84101 3.76628 10.1212 4.01026 10.2928L11.4725 15.5435Z"
          stroke="var(--${options.color})"
          stroke-width="1.28906"
          stroke-miterlimit="10"
        />
      </g>
    </g>
  </svg> `
}
