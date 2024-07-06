import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const logoFacebookMono = (options: IconOptions) => {
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
    <g clip-path="url(#clip0_3223_11837)">
      <path
        d="M9.101 23.691V15.711H6.627V12.044H9.101V10.464C9.101 6.37901 10.949 4.48601 14.959 4.48601C15.36 4.48601 15.914 4.52801 16.427 4.58901C16.8112 4.62855 17.1924 4.69369 17.568 4.78401V8.10901C17.3509 8.08875 17.133 8.07675 16.915 8.07301C16.6707 8.06667 16.4264 8.06367 16.182 8.06401C15.475 8.06401 14.923 8.16001 14.507 8.37301C14.2273 8.51332 13.9922 8.72869 13.828 8.99501C13.57 9.41501 13.454 9.99001 13.454 10.747V12.044H17.373L16.987 14.147L16.7 15.711H13.454V23.956C19.396 23.238 24 18.179 24 12.044C24 5.41701 18.627 0.0440063 12 0.0440063C5.373 0.0440063 0 5.41701 0 12.044C0 17.672 3.874 22.394 9.101 23.691Z"
        fill="var(--${options.color})"
      />
    </g>
    <defs>
      <clipPath id="clip0_3223_11837">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg> `
}
