import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const logoYoutubeMono = (options: IconOptions) => {
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
      d="M23.498 6.18598C23.3624 5.67526 23.095 5.20912 22.7226 4.83425C22.3502 4.45937 21.8858 4.18892 21.376 4.04998C19.505 3.54498 12 3.54498 12 3.54498C12 3.54498 4.495 3.54498 2.623 4.04998C2.11341 4.18917 1.64929 4.45972 1.27708 4.83456C0.904861 5.20941 0.637591 5.67542 0.502 6.18598C0 8.06998 0 12 0 12C0 12 0 15.93 0.502 17.814C0.637586 18.3247 0.904975 18.7908 1.27739 19.1657C1.64981 19.5406 2.11418 19.811 2.624 19.95C4.495 20.455 12 20.455 12 20.455C12 20.455 19.505 20.455 21.377 19.95C21.8869 19.8111 22.3513 19.5407 22.7237 19.1658C23.0961 18.7909 23.3635 18.3248 23.499 17.814C24 15.93 24 12 24 12C24 12 24 8.06998 23.498 6.18598ZM9.545 15.568V8.43198L15.818 12L9.545 15.568Z"
      fill="var(--${options.color})"
    />
  </svg> `
}
