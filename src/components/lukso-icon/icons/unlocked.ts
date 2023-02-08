import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import { IconOptions } from '@/components/lukso-icon/index.js'

export const unlocked = (options: IconOptions) => {
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
      d="M6.25 10V10.75H7.75V10H6.25ZM7.75 10V7H6.25V10H7.75ZM11 3.75H13.5V2.25H11V3.75ZM13.5 3.75C15.0188 3.75 16.25 4.98122 16.25 6.5H17.75C17.75 4.15279 15.8472 2.25 13.5 2.25V3.75ZM7.75 7C7.75 5.20507 9.20507 3.75 11 3.75V2.25C8.37665 2.25 6.25 4.37665 6.25 7H7.75Z"
      fill="var(--${options.color})"
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
