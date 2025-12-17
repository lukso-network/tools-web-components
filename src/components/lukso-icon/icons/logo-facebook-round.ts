import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const logoFacebookRound = (options: IconOptions) => {
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
    <rect width="24" height="24" rx="12" fill="var(--${options.color})" />
    <path
      d="M16.6711 15.4688L17.2031 12H13.875V9.74906C13.875 8.80008 14.34 7.875 15.8306 7.875H17.3438V4.92188C17.3438 4.92188 15.9705 4.6875 14.6576 4.6875C11.9166 4.6875 10.125 6.34875 10.125 9.35625V12H7.07812V15.4688H10.125V23.8542C10.736 23.9501 11.362 24 12 24C12.638 24 13.264 23.9501 13.875 23.8542V15.4688H16.6711Z"
      fill="white"
    />
  </svg> `
}
