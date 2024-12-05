import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const qrCode = (options: IconOptions) => {
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
    <mask id="path-1-inside-1_2994_36309" fill="var(--${options.color})">
      <rect x="4" y="4" width="6.4" height="6.4" rx="1" />
    </mask>
    <rect
      x="4"
      y="4"
      width="6.4"
      height="6.4"
      rx="1"
      stroke="var(--${options.color})"
      stroke-width="3"
      mask="url(#path-1-inside-1_2994_36309)"
    />
    <mask id="path-2-inside-2_2994_36309" fill="var(--${options.color})">
      <rect x="4" y="13.6" width="6.4" height="6.4" rx="1" />
    </mask>
    <rect
      x="4"
      y="13.6"
      width="6.4"
      height="6.4"
      rx="1"
      stroke="var(--${options.color})"
      stroke-width="3"
      mask="url(#path-2-inside-2_2994_36309)"
    />
    <rect
      x="13.6001"
      y="13.6"
      width="1.6"
      height="1.6"
      rx="0.8"
      fill="var(--${options.color})"
    />
    <rect
      x="18.3999"
      y="13.6"
      width="1.6"
      height="1.6"
      rx="0.8"
      fill="var(--${options.color})"
    />
    <rect
      x="18.3999"
      y="18.4"
      width="1.6"
      height="1.6"
      rx="0.8"
      fill="var(--${options.color})"
    />
    <rect
      x="13.6001"
      y="18.4"
      width="1.6"
      height="1.6"
      rx="0.8"
      fill="var(--${options.color})"
    />
    <rect
      x="16"
      y="16"
      width="1.6"
      height="1.6"
      rx="0.8"
      fill="var(--${options.color})"
    />
    <mask id="path-8-inside-3_2994_36309" fill="var(--${options.color})">
      <rect x="13.6001" y="4" width="6.4" height="6.4" rx="1" />
    </mask>
    <rect
      x="13.6001"
      y="4"
      width="6.4"
      height="6.4"
      rx="1"
      stroke="var(--${options.color})"
      stroke-width="3"
      mask="url(#path-8-inside-3_2994_36309)"
    />
  </svg> `
}
