import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/components/lukso-icon/index.js'

export const tokenCreate = (options: IconOptions) => {
  return html` <svg
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
      d="M19.5 4.175h4.348m-2.174 2.173V2"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
    />
    <path
      d="M20.083 8.79a8.696 8.696 0 1 1-15.43-1.443 8.696 8.696 0 0 1 12-2.694"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="m13.068 9.084.305.621c.153.305.534.588.872.654l.414.065c1.243.207 1.537 1.122.643 2.027l-.381.38c-.25.262-.392.764-.316 1.112l.054.229c.338 1.503-.457 2.08-1.765 1.297l-.284-.164c-.337-.196-.882-.196-1.22 0l-.284.164c-1.318.795-2.114.207-1.765-1.297l.054-.229c.077-.348-.065-.85-.316-1.111l-.381-.381c-.894-.905-.6-1.82.643-2.027l.414-.065c.327-.055.72-.349.872-.654l.305-.621c.589-1.188 1.548-1.188 2.136 0"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`
}
