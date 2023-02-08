import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import { IconOptions } from '@/components/lukso-icon/index.js'

export const link2 = (options: IconOptions) => {
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
      d="M19.9999 8C19.9999 6.17755 20 4 20 4H16"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13 11L20 4"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <mask id="path-3-inside-1_156_2008" fill="var(--${options.secondaryColor})">
      <rect x="4" y="13" width="7" height="7" rx="1" />
    </mask>
    <rect
      x="4"
      y="13"
      width="7"
      height="7"
      rx="1"
      stroke="var(--${options.color})"
      stroke-width="3"
      mask="url(#path-3-inside-1_156_2008)"
    />
  </svg> `
}
