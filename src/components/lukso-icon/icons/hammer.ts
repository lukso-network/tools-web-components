import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const hammer = (options: IconOptions) => {
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
      d="M14.9999 12L6.62694 20.373C6.22911 20.7708 5.68954 20.9943 5.12694 20.9943C4.56433 20.9943 4.02476 20.7708 3.62694 20.373C3.22911 19.9752 3.00562 19.4356 3.00562 18.873C3.00562 18.3104 3.22911 17.7708 3.62694 17.373L11.9999 9"
      stroke="var(--${options.color})"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18 15L22 11"
      stroke="var(--${options.color})"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M21.5 11.5L19.586 9.58599C19.2109 9.21101 19.0001 8.70238 19 8.17199V6.99999L16.74 4.73999C15.6245 3.62518 14.115 2.99435 12.538 2.98399L9 2.95999L9.92 3.77999C10.5735 4.35938 11.0967 5.07069 11.4552 5.86704C11.8137 6.66338 11.9994 7.52666 12 8.39999V9.99999L14 12H15.172C15.7024 12.0001 16.211 12.2109 16.586 12.586L18.5 14.5"
      stroke="var(--${options.color})"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
