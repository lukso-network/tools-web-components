import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const gas = (options: IconOptions) => {
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
      d="M2.6167 5C2.6167 4.30964 3.17634 3.75 3.8667 3.75H12.5334C13.2237 3.75 13.7834 4.30964 13.7834 5V21.25H2.6167V5Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M4.40015 18.2H12.0001"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M4.40015 15.6667H12.0001"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M4.40015 13.1333H12.0001"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M14.5334 14.9507V14.9507C15.9763 14.9507 17.1459 16.1204 17.1459 17.5632V18.2396C17.1459 19.6168 18.2624 20.7333 19.6397 20.7333V20.7333C21.017 20.7333 22.1334 19.6168 22.1334 18.2396V9.72406C22.1334 8.51878 21.59 7.37776 20.6541 6.61823L16.1959 3"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <circle
      cx="19.6"
      cy="9.33332"
      r="1.78333"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
  </svg> `
}
