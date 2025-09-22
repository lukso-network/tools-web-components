import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const tokenCreate = (options: IconOptions) => {
  return html` <svg
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
      d="M15.995 4.5h5.5m-2.75 2.75v-5.5"
      stroke="#1B2832"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M17.858 9.836a8 8 0 1 1-14.256.063 8 8 0 0 1 10.744-3.542"
      stroke="#1B2832"
      stroke-width="1.846"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="m12.976 11.639-1.734-1a.99.99 0 0 0-.993 0l-1.734 1a1 1 0 0 0-.496.86V14.5c0 .354.19.682.496.86l1.734 1.001a.99.99 0 0 0 .993 0l1.733-1.001a1 1 0 0 0 .497-.86v-2.002a.99.99 0 0 0-.496-.86m-.855 2.06-.515.893a.4.4 0 0 1-.344.199H10.23a.4.4 0 0 1-.344-.2l-.516-.89a.4.4 0 0 1 0-.397l.515-.894a.4.4 0 0 1 .344-.198h1.03c.143 0 .274.075.345.198l.515.894a.4.4 0 0 1 .002.397"
      fill="#1B2832"
    />
  </svg>`
}
