import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const search = (options: IconOptions) => {
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
      d="M18.25 10.5C18.25 14.7802 14.7802 18.25 10.5 18.25C6.21979 18.25 2.75 14.7802 2.75 10.5C2.75 6.21979 6.21979 2.75 10.5 2.75C14.7802 2.75 18.25 6.21979 18.25 10.5Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M16.5303 15.4697L16 14.9393L14.9393 16L15.4697 16.5303L16.5303 15.4697ZM20.4697 21.5303C20.7626 21.8232 21.2374 21.8232 21.5303 21.5303C21.8232 21.2374 21.8232 20.7626 21.5303 20.4697L20.4697 21.5303ZM15.4697 16.5303L20.4697 21.5303L21.5303 20.4697L16.5303 15.4697L15.4697 16.5303Z"
      fill="var(--${options.color})"
    />
  </svg> `
}
