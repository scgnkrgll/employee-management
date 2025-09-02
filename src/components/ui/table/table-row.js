import {LitElement, html, css} from 'lit';

class IngTableRow extends LitElement {
  static styles = css`
    :host {
      display: table-row;
      border-bottom: 1px solid rgb(var(--table-border-color));
    }

    :host(:last-child) {
      border-bottom: none;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('ing-table-row', IngTableRow);
