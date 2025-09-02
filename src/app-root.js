import {LitElement, html, css} from 'lit';
import {Router} from '@vaadin/router';
import './components/common/nav-menu.js';

export class AppRoot extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    main {
      height: 100%;
      background: rgb(var(--body-background-color));
      color: rgb(var(--body-text-color));
      padding: 16px 48px;
      display: flex;
      flex-direction: column;
    }

    @media (max-width: 768px) {
      main {
        padding: 16px;
      }
    }
  `;

  firstUpdated() {
    const outlet = this.renderRoot.querySelector('#outlet');
    const router = new Router(outlet);
    router.setRoutes([
      {
        path: '/',
        component: 'employees-page',
        action: () => Router.go('/employees'),
      },
      {
        path: '/employees',
        component: 'employees-page',
        action: () => import('./pages/employees'),
      },
      {
        path: '/employees/new',
        component: 'new-employee-page',
        action: () => import('./pages/employees/new'),
      },
      {
        path: '/employees/edit/:id',
        component: 'edit-employee-page',
        action: () => import('./pages/employees/edit'),
      },
      {
        path: '(.*)',
        component: 'not-found-page',
        action: () => import('./pages/404'),
      },
    ]);
  }

  render() {
    return html`
      <nav-menu></nav-menu>
      <main id="outlet"></main>
    `;
  }
}
customElements.define('app-root', AppRoot);
