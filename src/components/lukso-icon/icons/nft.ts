import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const nft = (options: IconOptions) => {
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
      d="M21.0799 8.58003V15.42C21.0799 16.54 20.4799 17.58 19.5099 18.15L13.5699 21.58C12.5999 22.14 11.3999 22.14 10.4199 21.58L4.47991 18.15C3.50991 17.59 2.90991 16.55 2.90991 15.42V8.58003C2.90991 7.46003 3.50991 6.41999 4.47991 5.84999L10.4199 2.42C11.3899 1.86 12.5899 1.86 13.5699 2.42L19.5099 5.84999C20.4799 6.41999 21.0799 7.45003 21.0799 8.58003Z"
      stroke="var(--${options.color})"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.662 10.6036V14H9.96549L8.61391 12.0398H8.59235V14H7.77145V10.6036H8.47792L9.81458 12.5605H9.84277V10.6036H10.662ZM11.1782 14V10.6036H13.4966V11.2703H11.9991V11.9668H13.349V12.6352H11.9991V14H11.1782ZM13.7988 11.2703V10.6036H16.6695V11.2703H15.6396V14H14.8304V11.2703H13.7988Z"
      fill="var(--${options.color})"
    />
  </svg> `
}
