import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'
import { IconOptions } from '@/components/lukso-icon/index.js'

export const clipboard = (options: IconOptions) => {
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
      d="M15.75 3H17.25C17.8467 3 18.419 3.23705 18.841 3.65901C19.2629 4.08097 19.5 4.65326 19.5 5.25V20.25C19.5 20.8467 19.2629 21.419 18.841 21.841C18.419 22.2629 17.8467 22.5 17.25 22.5H6.75C6.15326 22.5 5.58097 22.2629 5.15901 21.841C4.73705 21.419 4.5 20.8467 4.5 20.25V5.25C4.5 4.65326 4.73705 4.08097 5.15901 3.65901C5.58097 3.23705 6.15326 3 6.75 3H8.25"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
    <path
      d="M14.5252 1.5H9.47484C8.79838 1.5 8.25 2.04838 8.25 2.72484V3.27516C8.25 3.95162 8.79838 4.5 9.47484 4.5H14.5252C15.2016 4.5 15.75 3.95162 15.75 3.27516V2.72484C15.75 2.04838 15.2016 1.5 14.5252 1.5Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
    <path
      d="M17 9H7"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13 12H7"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10 15H7"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13 15H12"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
