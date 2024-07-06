import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const unlink = (options: IconOptions) => {
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
      d="M6.77 12.884 5.356 11.47a4.5 4.5 0 1 1 6.364-6.364l1.414 1.414m4.596 4.596 1.415 1.414a4.5 4.5 0 1 1-6.364 6.364l-1.415-1.414M16.7 3.722l-.732 2.732m4.56 1.096-2.732.732M3.972 16.45l2.732-.732m1.096 4.56.732-2.732m5.132-6.96-2.828 2.828"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
