import {html} from 'lit';

export const ArrownDownIcon = ({
  width = 24,
  height = 24,
  hidden = false,
  title = 'Arrow Down',
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
    <path d="M12 19L3.33975 8.5L20.6603 8.5L12 19Z" fill="currentColor" />
  </svg>
`;
