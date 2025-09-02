import {LitElement, css, html} from 'lit';
import {store} from '../../app/store';
import {employeeAdded} from '../../features/employees/employees-slice';
import {Router} from '@vaadin/router';

import '../../features/employees/edit-employee-form';

export class NewEmployeePage extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
    }

    :host > div {
      height: 100%;
      background: rgb(var(--panel-background-color));
      border-radius: 4px;
      padding: 64px 48px;
    }

    @media (max-width: 768px) {
      :host > div {
        padding: 16px;
      }
    }
  `;

  handleSubmit(event) {
    const newEmployee = event.detail;
    store.dispatch(employeeAdded(newEmployee));

    Router.go('/employees');
  }

  render() {
    return html`<h2>Add Employee</h2>

      <div>
        <edit-employee-form
          @employee-saved=${this.handleSubmit}
        ></edit-employee-form>
      </div> `;
  }
}

customElements.define('new-employee-page', NewEmployeePage);
