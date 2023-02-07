import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'
import { IconOptions } from '@/components/lukso-icon/index.js'

export const timerOutline = (options: IconOptions) => {
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
      d="M4 4H20"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <path
      d="M6 5C6 5.17925 6.00788 5.34626 6.02293 5.50178C6.28304 8.18956 10.714 9.22784 11.5854 11.7837V11.7837C11.7202 12.1794 12.2798 12.1794 12.4146 11.7837V11.7837C13.286 9.22784 17.717 8.18956 17.9771 5.50178C17.9921 5.34626 18 5.17925 18 5"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <path
      d="M20 20L4 20"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <path
      d="M18 19C18 18.8208 17.9921 18.6537 17.9771 18.4982C17.717 15.8104 13.286 14.7722 12.4146 12.2163V12.2163C12.2798 11.8206 11.7202 11.8206 11.5854 12.2163V12.2163C10.714 14.7722 6.28304 15.8104 6.02293 18.4982C6.00788 18.6537 6 18.8208 6 19"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <path
      d="M7.5 16C10.0994 15.1537 14.6225 15.4636 16.5 16C17.4191 16.2626 17.5293 16.9407 17.5217 17.288C17.5187 17.4289 17.5143 17.5714 17.5419 17.7096L17.7608 18.8039C17.8845 19.4227 17.4112 20 16.7802 20H7.2198C6.58876 20 6.11546 19.4227 6.23922 18.8039L6.4584 17.708C6.48583 17.5708 6.48159 17.4292 6.48042 17.2894C6.47759 16.9509 6.59647 16.2941 7.5 16Z"
      fill="var(--${options.color})"
    />
  </svg> `
}
