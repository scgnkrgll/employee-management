import {LitElement, html, css} from 'lit';

export class IngButton extends LitElement {
  /**
   * Button component with customizable styles and behaviors.
   * @property {"primary" | "secondary"} variant - The variant of the button (e.g., 'primary', 'secondary').
   * @property {"s" | "m" | "l"} size - The size of the button (e.g., 's', 'm', 'l').
   * @property {"filled" | "outline" | "ghost"} treatment - The treatment style of the button (e.g., 'filled', 'outline', 'ghost').
   * @property {boolean} disabled - Whether the button is disabled.
   * @property {boolean} iconOnly - Whether the button contains only an icon.
   * @property {string} href - The URL the button links to. If set, an anchor tag will be rendered instead of a button.
   */
  static properties = {
    variant: {type: String, reflect: true},
    size: {type: String, reflect: true},
    treatment: {type: String, reflect: true},
    disabled: {type: Boolean, reflect: true},
    iconOnly: {type: Boolean, attribute: 'icon-only', reflect: true},
    type: {type: String, reflect: true},
    href: {type: String, reflect: true},
  };

  constructor() {
    super();
    this.variant = 'primary';
    this.size = 'm';
    this.treatment = 'filled';
    this.disabled = false;
    this.iconOnly = false;
    this.type = 'button';

    this.addEventListener('click', this._handleClick, {
      capture: true,
    });
  }

  static styles = css`
    :host {
      display: inline-flex;
      float: left;
      gap: 8px;
      align-items: center;
      justify-content: center;
      border: 1px solid transparent;
      border-radius: 8px;
      font-family: inherit;
      font-weight: 400;
      cursor: pointer;
      transition: all 0.2s;
      box-sizing: border-box;
      white-space: nowrap;
      user-select: none;
      position: relative;
    }

    :host([disabled]) {
      color: gray !important;
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    }

    :host([variant='primary']) {
      --bg-color: var(--primary-color);
      --text-color: 255, 255, 255;
      --border-color: var(--primary-color);
    }
    :host([variant='secondary']) {
      --bg-color: var(--secondary-color);
      --text-color: 255, 255, 255;
      --border-color: var(--secondary-color);
    }

    :host([treatment='filled']) {
      background: rgb(var(--bg-color));
      color: rgb(var(--text-color));
      border-color: rgb(var(--border-color));
    }
    :host([treatment='filled']:hover) {
      background: rgba(var(--bg-color), 0.9);
      border-color: rgba(var(--border-color), 0.9);
    }
    :host([treatment='filled']:active) {
      background: rgba(var(--bg-color), 0.8);
      border-color: rgba(var(--border-color), 0.8);
    }
    :host([treatment='outline']) {
      background: transparent;
      color: rgb(var(--bg-color));
      border-color: rgb(var(--border-color));
    }
    :host([treatment='outline']:hover) {
      background: rgba(var(--bg-color), 0.1);
    }
    :host([treatment='outline']:active) {
      background: rgba(var(--bg-color), 0.2);
    }
    :host([treatment='ghost']) {
      background: transparent;
      color: rgb(var(--bg-color));
      border-color: transparent;
    }
    :host([treatment='ghost']:hover) {
      background: rgba(var(--bg-color), 0.1);
    }
    :host([treatment='ghost']:active) {
      background: rgba(var(--bg-color), 0.2);
    }

    :host([size='s']) {
      font-size: 14px;
      padding: 0 12px;
      height: 32px;
    }
    :host([size='m']) {
      font-size: 16px;
      padding: 0 16px;
      height: 42px;
    }
    :host([size='l']) {
      font-size: 18px;
      padding: 0 20px;
      height: 48px;
    }

    :host([icon-only]) {
      border-radius: 50%;
      padding: 0;
      aspect-ratio: 1 / 1;
    }

    :focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    :host > a {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  `;

  render() {
    if (this.href) {
      return html`
        <a
          href="${this.disabled ? null : this.href}"
          role="button"
          aria-disabled="${this.disabled ? 'true' : 'false'}"
        >
        </a>
        <slot></slot>
      `;
    }
    return html`<slot></slot>`;
  }

  _handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
      return false;
    }

    if (this.type !== 'button') {
      const proxy = document.createElement('button');
      proxy.type = this.type;
      this.insertAdjacentElement('afterend', proxy);
      proxy.click();
      proxy.remove();
    }
  }
}

customElements.define('ing-button', IngButton);
