import {html} from 'lit';

export const DeleteIcon = ({
  width = 24,
  height = 24,
  hidden = false,
  title = 'Delete',
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
      d="M10.66 6C10.84 5.424 11.37 5 12 5C12.63 5 13.16 5.424 13.34 6H10.66ZM15.36 6C15.16 4.315 13.74 3 12 3C10.26 3 8.84004 4.315 8.64004 6H4V8H6V19C6 20.104 6.9 21 8 21H16C17.1 21 18 20.104 18 19V8H20V6H15.36Z"
      fill="currentColor"
    />
  </svg>
`;
