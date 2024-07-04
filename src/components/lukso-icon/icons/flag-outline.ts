import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const flagOutline = (options: IconOptions) => {
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
      d="M3.75 21.75V3.19406C3.75023 3.12846 3.76767 3.06407 3.80057 3.00731C3.83347 2.95056 3.88069 2.90343 3.9375 2.87063C4.30359 2.65594 5.29312 2.25 7.5 2.25C10.5 2.25 14.2969 4.5 16.5 4.5C17.7439 4.49677 18.9746 4.24546 20.1202 3.76078C20.1344 3.75483 20.1499 3.7525 20.1653 3.75399C20.1807 3.75549 20.1955 3.76076 20.2083 3.76934C20.2212 3.77793 20.2317 3.78955 20.239 3.80319C20.2462 3.81682 20.25 3.83205 20.25 3.8475V14.13C20.2499 14.1663 20.2393 14.2018 20.2194 14.2322C20.1995 14.2625 20.1712 14.2865 20.138 14.3011C19.7517 14.4703 18.3905 15 16.5 15C14.25 15 10.5 13.5 7.5 13.5C4.5 13.5 3.75 14.25 3.75 14.25"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-miterlimit="10"
      stroke-linecap="round"
    />
  </svg> `
}
