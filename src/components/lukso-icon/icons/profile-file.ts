import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const profileFile = (options: IconOptions) => {
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
      d="M19.5 10.3711V19.5C19.5 20.0967 19.2629 20.669 18.841 21.091C18.419 21.5129 17.8467 21.75 17.25 21.75H6.75C6.15326 21.75 5.58097 21.5129 5.15901 21.091C4.73705 20.669 4.5 20.0967 4.5 19.5V4.5C4.5 3.90326 4.73705 3.33097 5.15901 2.90901C5.58097 2.48705 6.15326 2.25 6.75 2.25H11.3789C11.7766 2.25006 12.158 2.40804 12.4392 2.68922L19.0608 9.31078C19.342 9.59202 19.4999 9.97341 19.5 10.3711Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linejoin="round"
    />
    <path
      d="M12 2.38501V8.25001C12 8.64783 12.158 9.02936 12.4393 9.31067C12.7206 9.59197 13.1022 9.75001 13.5 9.75001H19.365"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M13.25 13C13.25 13.6904 12.6904 14.25 12 14.25C11.3096 14.25 10.75 13.6904 10.75 13C10.75 12.3096 11.3096 11.75 12 11.75C12.6904 11.75 13.25 12.3096 13.25 13Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
    <path
      d="M8.75 18.0667C8.75 17.6026 9.1006 17.1317 9.85273 16.7299C10.5809 16.341 11.46 16.1501 12 16.1501C12.54 16.1501 13.4191 16.341 14.1473 16.7299C14.8994 17.1317 15.25 17.6026 15.25 18.0667V18.4001C15.25 18.5381 15.1381 18.6501 15 18.6501H9C8.86193 18.6501 8.75 18.5381 8.75 18.4001V18.0667Z"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
    />
  </svg> `
}
