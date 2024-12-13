import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const bitcoinConvert = (options: IconOptions) => {
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
    <path
      d="M23 15.97C23 19.84 19.87 22.97 16 22.97L17.05 21.22"
      stroke="var(--${options.color})"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M1 7.96997C1 4.09997 4.13 0.969971 8 0.969971L6.95 2.71997"
      stroke="var(--${options.color})"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.62 13.07H9.43C10.05 13.07 10.56 13.63 10.56 14.2C10.56 14.82 10.06 15.33 9.43 15.33H6.62V13.07Z"
      stroke="var(--${options.color})"
      stroke-width="1.3"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.62 15.33H9.84C10.55 15.33 11.13 15.83 11.13 16.46C11.13 17.08 10.55 17.59 9.84 17.59H6.62V15.33Z"
      stroke="var(--${options.color})"
      stroke-width="1.3"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.85 15.33C14.85 18.74 12.09 21.5 8.67998 21.5C5.26998 21.5 2.50998 18.74 2.50998 15.33C2.50998 11.92 5.26998 9.15997 8.67998 9.15997C8.83998 9.15997 8.98998 9.16999 9.15998 9.17999C12.19 9.40999 14.61 11.83 14.84 14.86C14.84 15.01 14.85 15.16 14.85 15.33Z"
      stroke="var(--${options.color})"
      stroke-width="1.3"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M21.5 8.66998C21.5 12.08 18.74 14.84 15.33 14.84H14.84C14.61 11.81 12.19 9.38997 9.16 9.15997V8.66998C9.16 5.25998 11.92 2.5 15.33 2.5C18.74 2.5 21.5 5.25998 21.5 8.66998Z"
      stroke="var(--${options.color})"
      stroke-width="1.3"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
