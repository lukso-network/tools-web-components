import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const infinite = (options: IconOptions) => {
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
      d="M12 12C12 12 9.75 7.5 6.09375 7.5C3.55688 7.5 1.5 9.51562 1.5 12C1.5 14.4844 3.55688 16.5 6.09375 16.5C7.85203 16.5 9.42188 15.4495 10.5 14.25"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-miterlimit="10"
      stroke-linecap="round"
    />
    <path
      d="M12 12C12 12 14.25 16.5 17.9062 16.5C20.4431 16.5 22.5 14.4844 22.5 12C22.5 9.51562 20.4431 7.5 17.9062 7.5C16.148 7.5 14.5781 8.55047 13.5 9.75"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-miterlimit="10"
      stroke-linecap="round"
    />
  </svg> `
}
