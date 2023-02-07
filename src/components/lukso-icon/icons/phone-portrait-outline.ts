import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'
import { IconOptions } from '@/components/lukso-icon/index.js'

export const phonePortraitOutline = (options: IconOptions) => {
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
      d="M15.75 0.75H8.25C7.00736 0.75 6 1.75736 6 3V21C6 22.2426 7.00736 23.25 8.25 23.25H15.75C16.9926 23.25 18 22.2426 18 21V3C18 1.75736 16.9926 0.75 15.75 0.75Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.25 0.75H9.375C9.47446 0.75 9.56984 0.789509 9.64017 0.859835C9.71049 0.930161 9.75 1.02554 9.75 1.125C9.75 1.32391 9.82902 1.51468 9.96967 1.65533C10.1103 1.79598 10.3011 1.875 10.5 1.875H13.5C13.6989 1.875 13.8897 1.79598 14.0303 1.65533C14.171 1.51468 14.25 1.32391 14.25 1.125C14.25 1.02554 14.2895 0.930161 14.3598 0.859835C14.4302 0.789509 14.5255 0.75 14.625 0.75H15.75"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
