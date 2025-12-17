import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const minimizeVertical = (options: IconOptions) => {
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
      d="M12.3238 3.77781V8.62654"
      stroke="var(--${options.color})"
      stroke-width="1.3125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.49183 7.01028L12.3203 9.83871L15.1487 7.01028"
      stroke="var(--${options.color})"
      stroke-width="1.3125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.3313 16.0754V20.9241"
      stroke="var(--${options.color})"
      stroke-width="1.3125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M15.1484 17.6917L12.32 14.8633L9.49158 17.6917"
      stroke="var(--${options.color})"
      stroke-width="1.3125"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
