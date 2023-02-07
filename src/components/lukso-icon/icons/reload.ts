import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'
import { IconOptions } from '@/components/lukso-icon/index.js'

export const reload = (options: IconOptions) => {
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
      d="M17.8336 6.16637C19.1833 7.51601 20.0232 9.29187 20.2103 11.1914C20.3974 13.0908 19.92 14.9964 18.8596 16.5835C17.7992 18.1705 16.2213 19.3407 14.3949 19.8948C12.5684 20.4488 10.6063 20.3524 8.84286 19.622C7.07947 18.8916 5.6239 17.5723 4.72415 15.889C3.8244 14.2057 3.53616 12.2625 3.90852 10.3905C4.28089 8.5185 5.29082 6.83352 6.76625 5.62267C8.24168 4.41181 10.0913 3.75 12 3.75"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <path
      d="M20.979 5.40921C19.1661 5.2228 17 5 17 5L16.5909 8.97902"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
