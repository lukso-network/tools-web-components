import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'
import { IconOptions } from '@/components/lukso-icon/index.js'

export const connect = (options: IconOptions) => {
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
      d="M16.1584 6.06115C17.4126 6.93932 18.3565 8.192 18.855 9.63963C19.3535 11.0873 19.3808 12.6555 18.9332 14.1197C18.4856 15.5838 17.5859 16.8687 16.3632 17.7901C15.1404 18.7115 13.6573 19.2222 12.1265 19.2489C10.5957 19.2756 9.09573 18.817 7.84157 17.9389C6.58741 17.0607 5.64345 15.808 5.14499 14.3604C4.64653 12.9127 4.61915 11.3445 5.06679 9.88031C5.51442 8.41616 6.41409 7.1313 7.63684 6.20989"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12 5.14282V12.2539"
      stroke="var(--${options.color})"
      stroke-width="${options.strokeWidth}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg> `
}
