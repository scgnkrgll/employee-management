import {html} from 'lit';

export const ChevronLeftIcon = ({
  width = 24,
  height = 24,
  hidden = false,
  title = 'Chevron Left',
} = {}) => html` <svg
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  width="${width}"
  height="${height}"
  aria-hidden="${hidden ? 'true' : 'false'}"
  aria-label="${hidden ? undefined : title}"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M7.29325 11C6.90225 11.391 6.90225 12.023 7.29325 12.4141L15.2933 20.4141L16.7073 19L9.41425 11.707L16.7073 4.41406L15.2933 2.99996L7.29325 11Z"
    fill="currentColor"
  />
</svg>`;
