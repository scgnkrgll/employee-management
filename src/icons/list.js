import {html} from 'lit';

export const ListIcon = ({
  width = 24,
  height = 24,
  hidden = false,
  title = 'List',
} = {}) => html`
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="${width}"
    height="${height}"
    aria-hidden="${hidden ? 'true' : 'false'}"
    aria-label="${hidden ? undefined : title}"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M24 18.3V20H0V18.3H24ZM24 10.65V12.35H0V10.65H24ZM24 3V4.7H0V3H24Z"
      fill="currentColor"
    />
  </svg>
`;
