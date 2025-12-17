import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const videoOutline = (options: IconOptions) => {
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
    <rect width="24" height="24" fill="white" />
    <path
      d="M20.4375 4.5H3.5625C2.83763 4.5 2.25 5.08763 2.25 5.8125V18.1875C2.25 18.9124 2.83763 19.5 3.5625 19.5H20.4375C21.1624 19.5 21.75 18.9124 21.75 18.1875V5.8125C21.75 5.08763 21.1624 4.5 20.4375 4.5Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
    <path
      d="M20.4375 15.75H19.3125C18.5876 15.75 18 16.3376 18 17.0625V18.1875C18 18.9124 18.5876 19.5 19.3125 19.5H20.4375C21.1624 19.5 21.75 18.9124 21.75 18.1875V17.0625C21.75 16.3376 21.1624 15.75 20.4375 15.75Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
    <path
      d="M20.4375 12H19.3125C18.5876 12 18 12.5876 18 13.3125V14.4375C18 15.1624 18.5876 15.75 19.3125 15.75H20.4375C21.1624 15.75 21.75 15.1624 21.75 14.4375V13.3125C21.75 12.5876 21.1624 12 20.4375 12Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
    <path
      d="M20.4375 8.25H19.3125C18.5876 8.25 18 8.83763 18 9.5625V10.6875C18 11.4124 18.5876 12 19.3125 12H20.4375C21.1624 12 21.75 11.4124 21.75 10.6875V9.5625C21.75 8.83763 21.1624 8.25 20.4375 8.25Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
    <path
      d="M20.4375 4.5H19.3125C18.5876 4.5 18 5.08763 18 5.8125V6.9375C18 7.66237 18.5876 8.25 19.3125 8.25H20.4375C21.1624 8.25 21.75 7.66237 21.75 6.9375V5.8125C21.75 5.08763 21.1624 4.5 20.4375 4.5Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
    <path
      d="M4.6875 15.75H3.5625C2.83763 15.75 2.25 16.3376 2.25 17.0625V18.1875C2.25 18.9124 2.83763 19.5 3.5625 19.5H4.6875C5.41237 19.5 6 18.9124 6 18.1875V17.0625C6 16.3376 5.41237 15.75 4.6875 15.75Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
    <path
      d="M4.6875 12H3.5625C2.83763 12 2.25 12.5876 2.25 13.3125V14.4375C2.25 15.1624 2.83763 15.75 3.5625 15.75H4.6875C5.41237 15.75 6 15.1624 6 14.4375V13.3125C6 12.5876 5.41237 12 4.6875 12Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
    <path
      d="M4.6875 8.25H3.5625C2.83763 8.25 2.25 8.83763 2.25 9.5625V10.6875C2.25 11.4124 2.83763 12 3.5625 12H4.6875C5.41237 12 6 11.4124 6 10.6875V9.5625C6 8.83763 5.41237 8.25 4.6875 8.25Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
    <path
      d="M4.6875 4.5H3.5625C2.83763 4.5 2.25 5.08763 2.25 5.8125V6.9375C2.25 7.66237 2.83763 8.25 3.5625 8.25H4.6875C5.41237 8.25 6 7.66237 6 6.9375V5.8125C6 5.08763 5.41237 4.5 4.6875 4.5Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
    <path
      d="M16.6875 4.5H7.3125C6.58763 4.5 6 5.08763 6 5.8125V10.6875C6 11.4124 6.58763 12 7.3125 12H16.6875C17.4124 12 18 11.4124 18 10.6875V5.8125C18 5.08763 17.4124 4.5 16.6875 4.5Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
    <path
      d="M16.6875 12H7.3125C6.58763 12 6 12.5876 6 13.3125V18.1875C6 18.9124 6.58763 19.5 7.3125 19.5H16.6875C17.4124 19.5 18 18.9124 18 18.1875V13.3125C18 12.5876 17.4124 12 16.6875 12Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
  </svg> `
}
