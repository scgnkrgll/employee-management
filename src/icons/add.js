import {html} from 'lit';

export const AddIcon = ({
  width = 24,
  height = 24,
  hidden = false,
  title = 'Add',
} = {}) => html`<svg
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
    d="M11.3386 4V11.3386H4V12.672H11.3386V20H12.672V12.672H20V11.3386H12.672V4H11.3386Z"
    fill="currentColor"
  />
</svg>`;
