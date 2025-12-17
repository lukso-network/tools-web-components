import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const headsetOutline = (options: IconOptions) => {
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
      d="M3.89062 18C3.28125 16.4531 2.25 13.6233 2.25 12C2.25 6.615 6.99984 2.25 12 2.25C17.0002 2.25 21.75 6.615 21.75 12C21.75 13.6233 20.6719 16.5469 20.1094 18"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5.081 12.6623L4.43928 13.0373C3.02225 13.867 2.95335 16.4315 4.28085 18.7654C5.60835 21.0993 7.83725 22.319 9.25428 21.4898L9.896 21.1148C10.0663 21.0134 10.1901 20.8492 10.2408 20.6575C10.2914 20.4659 10.2649 20.262 10.1669 20.0896L6.09397 12.9375C6.04595 12.8524 5.98154 12.7778 5.90446 12.7179C5.82739 12.6579 5.73918 12.6139 5.64496 12.5883C5.55074 12.5627 5.45237 12.5561 5.35556 12.5688C5.25876 12.5815 5.16543 12.6133 5.081 12.6623V12.6623Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-miterlimit="10"
    />
    <path
      d="M18.9193 12.6623L19.561 13.0373C20.978 13.8665 21.0488 16.4311 19.7194 18.765C18.3901 21.0989 16.163 22.3186 14.746 21.4893L14.1043 21.1143C13.9339 21.0129 13.8102 20.8487 13.7595 20.6571C13.7089 20.4654 13.7354 20.2615 13.8333 20.0892L17.9063 12.9375C17.9543 12.8524 18.0187 12.7778 18.0958 12.7179C18.1729 12.6579 18.2611 12.6139 18.3553 12.5883C18.4495 12.5627 18.5479 12.5561 18.6447 12.5688C18.7415 12.5815 18.8348 12.6133 18.9193 12.6623V12.6623Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-miterlimit="10"
    />
  </svg> `
}
