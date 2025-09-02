import {LitElement, html, css} from 'lit';

class IngTableCell extends LitElement {
  static styles = css`
    :host {
      display: table-cell;
      padding: 12px 16px;
      vertical-align: top;
      font-size: 14px;
      line-height: 1.4;
      vertical-align: middle;
      text-align: center;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('ing-table-cell', IngTableCell);
