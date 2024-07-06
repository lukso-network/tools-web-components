import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const starOutline = (options: IconOptions) => {
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
      d="M13.0311 4.83116L14.506 6.98324C14.8636 7.505 15.3901 7.88754 15.9968 8.06639L18.4993 8.80408C19.3418 9.05242 19.6722 10.0693 19.1366 10.7653L17.5456 12.8331C17.1599 13.3344 16.9588 13.9534 16.9762 14.5857L17.0479 17.1936C17.0721 18.0716 16.2071 18.7 15.3796 18.4058L12.9214 17.5316C12.3254 17.3197 11.6746 17.3197 11.0786 17.5316L8.62043 18.4058C7.79292 18.7 6.92795 18.0716 6.9521 17.1937L7.02382 14.5857C7.04121 13.9534 6.8401 13.3344 6.45438 12.8331L4.86341 10.7653C4.32783 10.0693 4.65822 9.05242 5.50066 8.80408L8.00317 8.06639C8.60989 7.88754 9.13641 7.505 9.494 6.98324L10.9689 4.83117C11.4654 4.1067 12.5346 4.1067 13.0311 4.83116Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
  </svg> `
}
