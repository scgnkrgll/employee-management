import {LitElement, html, css} from 'lit';
import {AddIcon} from '../../icons/add';
import {EmployeesIcon} from '../../icons/employees';
import {msg, updateWhenLocaleChanges} from '@lit/localize';
import {getLocale, setLocale} from '../../locale';

class NavMenu extends LitElement {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  static styles = css`
    nav {
      display: flex;
      gap: 1rem;
      background: rgb(var(--panel-background-color));
      color: rgb(var(--body-text-color));
      height: 48px;
      align-items: center;
      padding: 0 16px;
    }
    a {
      color: rgb(var(--primary-color));
      text-decoration: none;
      display: flex;
      align-items: center;
      font-size: 0.75rem;
      gap: 0.25rem;
    }
    div {
      margin-left: auto;
      display: flex;
      gap: 1rem;
    }
    b {
      font-family: 'INGMeBold', sans-serif;
    }

    .locale-toggle {
      background: none;
      border: none;
      color: inherit;
      font: inherit;
      cursor: pointer;
    }
  `;

  toggleLocale() {
    const newLocale = getLocale() === 'en' ? 'tr' : 'en';
    setLocale(newLocale);
  }

  render() {
    return html`
      <nav>
        <b>ING</b>
        <div>
          <a href="/employees">${EmployeesIcon()} ${msg('Employees')}</a>
          <a href="/employees/new">${AddIcon()} ${msg('Add New')}</a>
          <button class="locale-toggle" @click=${() => this.toggleLocale()}>
            ${getLocale() === 'en' ? html`🇹🇷` : html`🇬🇧`}
          </button>
        </div>
      </nav>
    `;
  }
}
customElements.define('nav-menu', NavMenu);
