import {LitElement, html, css} from 'lit';

class IngTable extends LitElement {
  static styles = css`
    :host {
      display: table;
      border-collapse: collapse;
      width: 100%;
      background-color: rgb(var(--panel-background-color));
      border-radius: 4px;
    }
  `;

  render() {
    return html` <slot></slot> `;
  }
}

customElements.define('ing-table', IngTable);
