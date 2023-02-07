import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'
import { IconOptions } from '@/components/lukso-icon/index.js'

export const eyeHide = (options: IconOptions) => {
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
      d="M4.99976 19L18.9998 5"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.77284 14.227C8.54284 12.997 8.54284 11.002 9.77284 9.77199C11.0028 8.54199 12.9978 8.54199 14.2278 9.77199"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18.9998 9L20.7044 11.5569C20.889 11.8339 20.9273 12.1845 20.7837 12.4849C19.3958 15.3885 15.55 20.0126 9.49976 18.5"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17.0438 6.956C15.4968 5.759 13.7478 5 11.9998 5C8.50475 5 5.00975 8.033 3.11775 11.533C2.96075 11.824 2.96075 12.177 3.11775 12.468C4.06375 14.217 5.40975 15.849 6.95575 17.045"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
