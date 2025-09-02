import {html} from 'lit';

export const CloseIcon = ({
  width = 24,
  height = 24,
  hidden = false,
  title = 'Close',
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
      d="M20.6667 2L12.2747 10.3907L3.884 2L2 3.88533L10.3893 12.2773L2 20.6667L3.884 22.552L12.2747 14.1627L20.6667 22.552L22.552 20.6667L14.1613 12.2773L22.552 3.88533L20.6667 2Z"
      fill="currentColor"
    />
  </svg>
`;
