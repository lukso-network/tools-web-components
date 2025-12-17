import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const starFilled = (options: IconOptions) => {
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
      d="M11.1751 3.20359C11.5723 2.62402 12.4277 2.62401 12.8249 3.20359L15.3257 6.85257C15.4557 7.0423 15.6472 7.18141 15.8678 7.24645L20.111 8.49726C20.7849 8.69593 21.0492 9.50939 20.6208 10.0663L17.9232 13.5723C17.7829 13.7546 17.7098 13.9796 17.7161 14.2096L17.8377 18.6316C17.8571 19.334 17.1651 19.8367 16.5031 19.6013L12.335 18.1191C12.1183 18.0421 11.8817 18.0421 11.665 18.1191L7.49693 19.6013C6.83492 19.8367 6.14295 19.334 6.16226 18.6316L6.28388 14.2096C6.29021 13.9796 6.21708 13.7546 6.07681 13.5723L3.37922 10.0663C2.95075 9.5094 3.21506 8.69593 3.88901 8.49726L8.1322 7.24645C8.35282 7.18141 8.54429 7.0423 8.67432 6.85257L11.1751 3.20359Z"
      fill="var(--${options.color})"
    />
  </svg> `
}
