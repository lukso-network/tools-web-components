import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import { IconOptions } from '@/components/lukso-icon/index.js'

export const handRightOutline = (options: IconOptions) => {
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
      d="M20.25 15V6.75C20.25 6.35218 20.092 5.97064 19.8107 5.68934C19.5294 5.40804 19.1478 5.25 18.75 5.25V5.25C18.3522 5.25 17.9706 5.40804 17.6893 5.68934C17.408 5.97064 17.25 6.35218 17.25 6.75V12"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17.25 12V3.75C17.25 3.35218 17.092 2.97064 16.8107 2.68934C16.5294 2.40804 16.1478 2.25 15.75 2.25C15.3522 2.25 14.9706 2.40804 14.6893 2.68934C14.408 2.97064 14.25 3.35218 14.25 3.75V11.25"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11.25 11.2969V4.5C11.25 4.10218 11.092 3.72064 10.8107 3.43934C10.5294 3.15804 10.1478 3 9.75 3V3C9.35218 3 8.97064 3.15804 8.68934 3.43934C8.40804 3.72064 8.25 4.10218 8.25 4.5V15"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.25 11.25V2.25C14.25 1.85218 14.092 1.47064 13.8107 1.18934C13.5294 0.908035 13.1478 0.75 12.75 0.75C12.3522 0.75 11.9706 0.908035 11.6893 1.18934C11.408 1.47064 11.25 1.85218 11.25 2.25V11.25"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20.25 14.9999C20.25 20.503 17.25 23.2499 13.125 23.2499C9 23.2499 7.3261 21.3936 6.375 19.1249L3.9061 12.3749C3.59391 11.5288 3.73547 10.7441 4.4625 10.3311C5.19 9.91771 6.14578 10.1305 6.53953 10.8786L8.25 14.9999"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
