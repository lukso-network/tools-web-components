import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const logoMediumMono = (options: IconOptions) => {
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
    <g clip-path="url(#clip0_3223_11840)">
      <path
        d="M13.54 12C13.5453 13.8017 12.8354 15.5319 11.566 16.8107C10.2967 18.0894 8.57177 18.8121 6.77003 18.82C4.96829 18.8121 3.24335 18.0894 1.97402 16.8107C0.704678 15.5319 -0.00528713 13.8017 2.96483e-05 12C-0.00528713 10.1982 0.704678 8.46804 1.97402 7.18932C3.24335 5.91061 4.96829 5.18793 6.77003 5.17999C8.57177 5.18793 10.2967 5.91061 11.566 7.18932C12.8354 8.46804 13.5453 10.1982 13.54 12ZM20.96 12C20.96 15.54 19.45 18.42 17.58 18.42C15.71 18.42 14.19 15.54 14.19 12C14.19 8.45999 15.71 5.57999 17.58 5.57999C19.45 5.57999 20.96 8.45999 20.96 12ZM24 12C24 15.17 23.47 17.75 22.81 17.75C22.15 17.75 21.62 15.17 21.62 12C21.62 8.82999 22.15 6.24999 22.81 6.24999C23.47 6.24999 24 8.82999 24 12Z"
        fill="var(--${options.color})"
      />
    </g>
    <defs>
      <clipPath id="clip0_3223_11840">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg> `
}
