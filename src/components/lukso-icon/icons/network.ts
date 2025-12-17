import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const network = (options: IconOptions) => {
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
      d="M5.75 20.125C4.09315 20.125 2.75 18.7819 2.75 17.125C2.75 15.4681 4.09315 14.125 5.75 14.125C7.40685 14.125 8.75 15.4681 8.75 17.125C8.75 18.7819 7.40685 20.125 5.75 20.125Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M18.25 20.125C16.5931 20.125 15.25 18.7819 15.25 17.125C15.25 15.4681 16.5931 14.125 18.25 14.125C19.9069 14.125 21.25 15.4681 21.25 17.125C21.25 18.7819 19.9069 20.125 18.25 20.125Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M12 8.875C10.3431 8.875 9 7.53185 9 5.875C9 4.21815 10.3431 2.875 12 2.875C13.6569 2.875 15 4.21815 15 5.875C15 7.53185 13.6569 8.875 12 8.875Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M10.125 8.375L6.375 14.8702"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M15.75 17.75L8.25 17.75"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M17 14.625L13.25 8.12981"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
  </svg> `
}
