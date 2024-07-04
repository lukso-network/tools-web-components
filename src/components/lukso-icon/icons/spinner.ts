import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const spinner = (options: IconOptions) => {
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
      d="M20.25 12C20.25 13.6317 19.7661 15.2267 18.8596 16.5835C17.9531 17.9402 16.6646 18.9976 15.1571 19.622C13.6496 20.2464 11.9908 20.4098 10.3905 20.0915C8.79016 19.7732 7.32015 18.9874 6.16637 17.8336C5.01259 16.6798 4.22685 15.2098 3.90852 13.6095C3.59019 12.0092 3.75357 10.3504 4.37799 8.84286C5.00242 7.33537 6.05984 6.0469 7.41655 5.14038C8.77325 4.23385 10.3683 3.75 12 3.75"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
  </svg> `
}
