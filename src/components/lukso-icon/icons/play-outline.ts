import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const playOutline = (options: IconOptions) => {
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
      d="M8.24232 7.01557L15.7423 11.3457C15.909 11.4419 15.909 11.6825 15.7423 11.7787L8.24232 16.1088C8.07565 16.2051 7.86732 16.0848 7.86732 15.8923L7.86732 7.23208C7.86732 7.03963 8.07565 6.91934 8.24232 7.01557Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
  </svg> `
}
