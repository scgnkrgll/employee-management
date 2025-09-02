import {LitElement, html, css} from 'lit';
import {connect} from 'pwa-helpers';
import {store} from '../../app/store';
import {
  employeesSelectors,
  employeeUpdated,
} from '../../features/employees/employees-slice';
import {Router} from '@vaadin/router';
import '../../features/employees/edit-employee-form';
import {msg, str, updateWhenLocaleChanges} from '@lit/localize';

/** @import { RouterLocation } from '@vaadin/router' */
/** @import { Employee } from '../../features/employees/employees-slice' */

export class EditEmployeePage extends connect(store)(LitElement) {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

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
      padding: 16px 48px;
    }

    :host h4 {
      margin-bottom: 48px;
    }

    @media (max-width: 768px) {
      :host > div {
        padding: 16px;
      }
      :host h4 {
        margin-bottom: 24px;
      }
    }
  `;

  static properties = {
    /**
     * @type {string}
     */
    id: {type: String},
    /**
     * @type {Employee}
     */
    employee: {type: Object},
  };

  /**
   * @param {RouterLocation} location
   */
  onBeforeEnter(location) {
    this.id = location.params.id;
    this.employee = employeesSelectors.selectById(store.getState(), this.id);
  }

  handleSubmit(event) {
    const newEmployee = event.detail;
    store.dispatch(employeeUpdated({id: this.id, changes: newEmployee}));

    Router.go('/employees');
  }

  render() {
    return html`<h2>${msg('Edit Employee')}</h2>
      <div>
        <h4>
          ${msg(
            str`You are editing ${this.employee.firstName} ${this.employee.lastName}`
          )}
        </h4>
        <edit-employee-form
          @employee-saved=${this.handleSubmit}
          .employee=${this.employee}
        ></edit-employee-form>
      </div> `;
  }
}

customElements.define('edit-employee-page', EditEmployeePage);
