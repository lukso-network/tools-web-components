import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'
import { IconOptions } from '@/components/lukso-icon/index.js'

export const profile = (options: IconOptions) => {
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
      d="M16.25 6C16.25 8.34721 14.3472 10.25 12 10.25C9.65279 10.25 7.75 8.34721 7.75 6C7.75 3.65279 9.65279 1.75 12 1.75C14.3472 1.75 16.25 3.65279 16.25 6Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M2.75 18.6667C2.75 16.8725 4.09998 15.4016 6.10179 14.3324C8.07966 13.2759 10.4587 12.75 12 12.75C13.5413 12.75 15.9203 13.2759 17.8982 14.3324C19.9 15.4016 21.25 16.8725 21.25 18.6667V21.25H2.75V18.6667Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
  </svg> `
}
