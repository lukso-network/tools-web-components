import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const imageLinear = (options: IconOptions) => {
  return html`<svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style=${styleMap({
      width: `${options.width}px`,
      height: `${options.height}px`,
    })}
  >
    <path
      d="M21.7632 16.96L18.6332 9.65001C17.5732 7.17001 15.6232 7.07001 14.3132 9.43001L12.4232 12.84C11.4632 14.57 9.67318 14.72 8.43318 13.17L8.21318 12.89C6.92318 11.27 5.10318 11.47 4.17318 13.32L2.45318 16.77C1.24318 19.17 2.99318 22 5.67318 22H18.4332C21.0332 22 22.7832 19.35 21.7632 16.96Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <path
      d="M7.05322 8C8.71008 8 10.0532 6.65685 10.0532 5C10.0532 3.34315 8.71008 2 7.05322 2C5.39637 2 4.05322 3.34315 4.05322 5C4.05322 6.65685 5.39637 8 7.05322 8Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
