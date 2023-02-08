import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import { IconOptions } from '@/components/lukso-icon/index.js'

export const cloud = (options: IconOptions) => {
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
      d="M18.75 11.25C18.3333 7.05281 15.4219 4.5 12 4.5C8.76562 4.5 6.6825 6.75938 6 9C3.1875 9.28125 0.75 11.0433 0.75 14.25C0.75 17.3438 3.28125 19.5 6.375 19.5H18.5625C21.1406 19.5 23.25 18.2138 23.25 15.375C23.25 12.5709 20.7656 11.355 18.75 11.25Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
  </svg> `
}
