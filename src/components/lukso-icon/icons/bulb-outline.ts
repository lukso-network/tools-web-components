import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'
import { IconOptions } from '@/components/lukso-icon/index.js'

export const bulbOutline = (options: IconOptions) => {
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
      d="M14.25 18V16.875C14.25 15.5157 15.7285 14.2299 16.6875 13.3125C18.0394 12.0202 18.75 10.2839 18.75 8.25003C18.75 4.50003 15.7627 1.50003 12 1.50003C11.1129 1.49755 10.2341 1.67046 9.41399 2.0088C8.59392 2.34714 7.84883 2.84425 7.22154 3.47154C6.59425 4.09883 6.09714 4.84392 5.7588 5.66399C5.42046 6.48405 5.24755 7.36291 5.25003 8.25003C5.25003 10.2113 5.99112 12.0652 7.31253 13.3125C8.26643 14.213 9.75003 15.5016 9.75003 16.875V18"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.5 22.5H13.5"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.75 20.25H14.25"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 18V12"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.7812 11.25C13.7812 11.25 12.773 12 12 12C11.227 12 10.2188 11.25 10.2188 11.25"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
