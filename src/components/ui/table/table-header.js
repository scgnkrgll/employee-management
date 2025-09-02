import {LitElement, html, css} from 'lit';

class IngTableHeader extends LitElement {
  static styles = css`
    :host {
      display: table-cell;
      padding: 24px 16px;
      font-weight: 600;
      text-align: center;
      color: rgb(var(--primary-color));
      font-size: 14px;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('ing-table-header', IngTableHeader);
