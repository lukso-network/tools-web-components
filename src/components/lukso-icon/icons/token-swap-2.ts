import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const tokenSwap2 = (options: IconOptions) => {
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
      d="M23 15.97C23 19.84 19.87 22.97 16 22.97L17.05 21.22"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M1 7.96997C1 4.09997 4.13 0.969971 8 0.969971L6.95 2.71997"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.85 15.33C14.85 18.74 12.09 21.5 8.67998 21.5C5.26998 21.5 2.50998 18.74 2.50998 15.33C2.50998 11.92 5.26998 9.15997 8.67998 9.15997C8.83998 9.15997 8.98998 9.16999 9.15998 9.17999C12.19 9.40999 14.61 11.83 14.84 14.86C14.84 15.01 14.85 15.16 14.85 15.33Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M21.5 8.66998C21.5 12.08 18.74 14.84 15.33 14.84H14.84C14.61 11.81 12.19 9.38997 9.16 9.15997V8.66998C9.16 5.25998 11.92 2.5 15.33 2.5C18.74 2.5 21.5 5.25998 21.5 8.66998Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.9101 13.4684L9.1767 12.4681C8.8697 12.2903 8.4903 12.2903 8.1833 12.4681L6.4499 13.4684C6.1429 13.6462 5.9532 13.9741 5.9532 14.3287V16.3304C5.9532 16.685 6.1429 17.0128 6.4499 17.1906L8.1833 18.1919C8.4903 18.3698 8.8697 18.3698 9.1767 18.1919L10.9101 17.1906C11.2171 17.0128 11.4068 16.685 11.4068 16.3304V14.3287C11.4068 13.9741 11.2181 13.6462 10.9101 13.4684ZM10.0558 15.529L9.5403 16.4217C9.4697 16.545 9.3386 16.6204 9.1966 16.6204H8.1644C8.0224 16.6204 7.8913 16.545 7.8207 16.4217L7.3052 15.529C7.2347 15.4057 7.2347 15.2547 7.3052 15.1314L7.8207 14.2387C7.8913 14.1155 8.0224 14.04 8.1644 14.04H9.1966C9.3386 14.04 9.4697 14.1155 9.5403 14.2387L10.0558 15.1314C10.1263 15.2547 10.1263 15.4057 10.0558 15.529Z"
      fill="var(--${options.color})"
      transform="translate(8.68, 15.33) scale(1.35) translate(-8.68, -15.33)"
    />
  </svg>`
}
