import {msg} from '@lit/localize';
import {LitElement, html} from 'lit';

export class NotFoundPage extends LitElement {
  render() {
    return html`<h2>
      ${msg('Not found', {
        desc: 'Title for the 404 - Not Found page',
      })}
    </h2>`;
  }
}

customElements.define('not-found-page', NotFoundPage);
