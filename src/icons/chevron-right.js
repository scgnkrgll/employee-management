import {html} from 'lit';

export const ChevronRightIcon = ({
  width = 24,
  height = 24,
  hidden = false,
  title = 'Chevron Right',
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
      d="M16.414 12.4141C16.805 12.0231 16.805 11.391 16.414 11L8.41396 2.99996L7 4.41406L14.293 11.707L7 19L8.41396 20.4141L16.414 12.4141Z"
      fill="currentColor"
    />
  </svg>
`;
