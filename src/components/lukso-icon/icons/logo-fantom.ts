import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

import type { IconOptions } from '@/shared/types.js'

export const logoFantom = (options: IconOptions) => {
  return html`<svg
    width="24"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style=${styleMap({
      width: `${options.width}px`,
      height: `${options.height}px`,
    })}
  >
    <circle cx="12.5" cy="12" r="12" fill="#1969FF" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.306 3.813a1.71 1.71 0 0 0-1.613 0L7.763 5.91c-.26.195-.384.407-.398.605h-.008v10.949c0 .253.14.486.363.605l3.973 2.119c.504.269 1.11.269 1.613 0l3.973-2.12a.69.69 0 0 0 .363-.604V6.514h-.007c.01-.237-.11-.474-.398-.605zm3.65 3.456-3.65 1.946-.08.04 3.73 1.99zm0 5.485-3.65 1.947a1.71 1.71 0 0 1-1.613 0l-3.65-1.947v4.709l3.973 2.119c.302.161.665.161.968 0l3.973-2.12zm-8.914-1.508 3.732-1.99-.081-.04-3.65-1.947zm3.974-6.828a1.03 1.03 0 0 1 .968 0l3.93 2.096-3.93 2.096a1.03 1.03 0 0 1-.968 0l-3.93-2.096zm.826 9.74v-4.33L16.915 12l-3.93 2.096a1 1 0 0 1-.142.062m-.685-4.33v4.33a1 1 0 0 1-.141-.062L8.086 12z"
      fill="#fff"
    />
    <path
      d="m17.481 4.338.566.353a2.06 2.06 0 0 1 .967 1.745v.421h-.686v-.421c0-.473-.243-.912-.644-1.163l-.566-.354zM6.952 19.309l.566.353.363-.581-.565-.354a1.37 1.37 0 0 1-.645-1.163v-.421h-.686v.421c0 .71.366 1.369.967 1.744"
      fill="#fff"
    />
  </svg> `
}
