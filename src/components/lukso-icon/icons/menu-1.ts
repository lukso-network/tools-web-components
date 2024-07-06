import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const menu1 = (options: IconOptions) => {
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
    <mask id="path-1-inside-1_156_2042" fill="white">
      <rect x="5" y="5" width="6" height="6" rx="1" />
    </mask>
    <rect
      x="5"
      y="5"
      width="6"
      height="6"
      rx="1"
      stroke="var(--${options.color})"
      stroke-width="3"
      mask="url(#path-1-inside-1_156_2042)"
    />
    <mask id="path-2-inside-2_156_2042" fill="white">
      <rect x="5" y="13" width="6" height="6" rx="1" />
    </mask>
    <rect
      x="5"
      y="13"
      width="6"
      height="6"
      rx="1"
      stroke="var(--${options.color})"
      stroke-width="3"
      mask="url(#path-2-inside-2_156_2042)"
    />
    <mask id="path-3-inside-3_156_2042" fill="white">
      <rect x="13" y="5" width="6" height="6" rx="1" />
    </mask>
    <rect
      x="13"
      y="5"
      width="6"
      height="6"
      rx="1"
      stroke="var(--${options.color})"
      stroke-width="3"
      mask="url(#path-3-inside-3_156_2042)"
    />
    <mask id="path-4-inside-4_156_2042" fill="white">
      <rect x="13" y="13" width="6" height="6" rx="1" />
    </mask>
    <rect
      x="13"
      y="13"
      width="6"
      height="6"
      rx="1"
      stroke="var(--${options.color})"
      stroke-width="3"
      mask="url(#path-4-inside-4_156_2042)"
    />
  </svg> `
}
