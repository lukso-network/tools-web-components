import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'
import { IconOptions } from '@/components/lukso-icon/index.js'

export const locked = (options: IconOptions) => {
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
      d="M5 19V11C5 10.4477 5.44772 10 6 10H18C18.5523 10 19 10.4477 19 11V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <path
      d="M13.2375 15.7375C13.9208 15.0541 13.9208 13.9459 13.2375 13.2625C12.5541 12.5792 11.4459 12.5792 10.7625 13.2625C10.0792 13.9459 10.0792 15.0541 10.7625 15.7375C11.4459 16.4208 12.5541 16.4208 13.2375 15.7375Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M7 10V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79113 17 7.00027C17 8.25889 17 9.46107 17 10"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="square"
      stroke-linejoin="round"
    />
    <path
      d="M12 16.5V18"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
