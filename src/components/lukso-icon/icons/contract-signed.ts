import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import { IconOptions } from '@/components/lukso-icon/index.js'

export const contractSigned = (options: IconOptions) => {
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
      d="M2 10.1211V19.25C2 19.8467 2.23705 20.419 2.65901 20.841C3.08097 21.2629 3.65326 21.5 4.25 21.5H14.75C15.3467 21.5 15.919 21.2629 16.341 20.841C16.7629 20.419 17 19.8467 17 19.25V4.25C17 3.65326 16.7629 3.08097 16.341 2.65901C15.919 2.23705 15.3467 2 14.75 2H10.1211C9.72341 2.00006 9.34202 2.15804 9.06078 2.43922L2.43922 9.06078C2.15804 9.34202 2.00006 9.72341 2 10.1211Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
    <path
      d="M11 13H5"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8 16H5"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11 16H10"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.5 2.13501V8.00001C9.5 8.39783 9.34196 8.77936 9.06066 9.06067C8.77936 9.34197 8.39782 9.50001 8 9.50001H2.135"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M21.25 12C21.25 14.3472 19.3472 16.25 17 16.25C14.6528 16.25 12.75 14.3472 12.75 12C12.75 9.65279 14.6528 7.75 17 7.75C19.3472 7.75 21.25 9.65279 21.25 12Z"
      fill="var(--${options.secondaryColor})"
      stroke="var(--${options.secondaryColor})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M15 12.0714L16.4 13.5L19 11"
      stroke="white"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
