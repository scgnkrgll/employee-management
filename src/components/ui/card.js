import {LitElement, html, css} from 'lit';

export class IngCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
      background: rgb(var(--panel-background-color));
      padding: 1rem;
      transition: box-shadow 0.2s;
      width: 100%;
      box-sizing: border-box;
    }
  `;

  render() {
    return html` <slot></slot> `;
  }
}

customElements.define('ing-card', IngCard);
