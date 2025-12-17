import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const fishOutline = (options: IconOptions) => {
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
      d="M11.25 7.125C8.87297 7.69734 6.83672 9.57703 5.61094 10.567C5.2573 10.2394 4.88462 9.93291 4.49484 9.64922C2.79047 8.40422 0.75 8.25 0.75 8.25C0.75 8.25 1.28297 10.6655 2.68875 11.992C1.28297 13.3191 0.75 15.7345 0.75 15.7345C0.75 15.7345 2.79047 15.5803 4.49484 14.3353C4.88133 14.0541 5.25088 13.7503 5.60156 13.4255C6.825 14.4164 8.87063 16.3008 11.25 16.875L10.5 19.5C12.3483 19.1873 14.1966 17.8355 14.94 17.2383C21 16.9688 23.25 13.0781 23.25 12C23.25 10.9688 21 7.03125 14.9583 6.76266C14.2275 6.17719 12.3637 4.815 10.5 4.5L11.25 7.125Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
    <path
      d="M19.5 11.9995C19.9142 11.9995 20.25 11.6637 20.25 11.2495C20.25 10.8353 19.9142 10.4995 19.5 10.4995C19.0858 10.4995 18.75 10.8353 18.75 11.2495C18.75 11.6637 19.0858 11.9995 19.5 11.9995Z"
      fill="var(--${options.color})"
    />
    <path
      d="M17.7361 16.6875C16.9096 15.2635 16.4744 13.6464 16.4744 12C16.4744 10.3536 16.9096 8.73646 17.7361 7.3125"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-miterlimit="20"
      stroke-linecap="round"
    />
  </svg> `
}
