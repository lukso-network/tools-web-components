import { html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'

export const profileRecovery = (
  width: number,
  height: number,
  color: string,
  strokeWidth: number = 1.5
) => {
  return html`<svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style=${styleMap({
      width: `${width}px`,
      height: `${height}px`,
    })}
  >
    <g clip-path="url(#clip0_642_8623)">
      <path
        d="M2.75 18.6667C2.75 16.8725 4.09998 15.4016 6.10179 14.3324C8.07966 13.2759 10.4587 12.75 12 12.75C13.5413 12.75 15.9203 13.2759 17.8982 14.3324C19.9 15.4016 21.25 16.8725 21.25 18.6667V21.25H2.75V18.6667Z"
        stroke="var(--${color})"
        stroke-width="${strokeWidth}"
      />
      <path
        d="M13.9214 9.90371C13.3135 10.1872 12.6472 10.3227 11.9769 10.2993C11.3066 10.2759 10.6514 10.0942 10.0648 9.76904C9.4782 9.44388 8.97688 8.9845 8.60183 8.42847C8.22679 7.87244 7.98866 7.23554 7.90692 6.56985"
        stroke="var(--${color})"
        stroke-width="${strokeWidth}"
        stroke-linecap="round"
      />
      <path
        d="M10.0759 6.65833L7.61788 5.25903L6.21859 7.71708"
        stroke="var(--${color})"
        stroke-width="${strokeWidth}"
        stroke-linecap="round"
      />
      <path
        d="M10.0786 2.45042C10.6865 2.16697 11.3528 2.03141 12.0231 2.05481C12.6934 2.07822 13.3486 2.25993 13.9352 2.58509C14.5218 2.91025 15.0231 3.36962 15.3982 3.92565C15.7732 4.48168 16.0113 5.11858 16.0931 5.78428"
        stroke="var(--${color})"
        stroke-width="${strokeWidth}"
        stroke-linecap="round"
      />
      <path
        d="M13.9241 5.6958L16.3821 7.09509L17.7814 4.63705"
        stroke="var(--${color})"
        stroke-width="${strokeWidth}"
        stroke-linecap="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_642_8623">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg> `
}
