import {msg, str} from '@lit/localize';
import {connect} from 'pwa-helpers';
import {store} from '../../app/store';
import {html, LitElement} from 'lit';
import {employeeRemoved, employeesSelectors} from './employees-slice';

class DeleteEmployeeDialog extends connect(store)(LitElement) {
  static properties = {
    employee: {type: Object},
  };

  constructor() {
    super();
    this.employee = null;
    this.open = this.open.bind(this);
  }

  set id(id) {
    this.employee = employeesSelectors.selectById(store.getState(), id);
  }

  open() {
    const dialog = this.shadowRoot.querySelector('ing-confirmation-dialog');
    dialog.open();
  }

  removeEmployee() {
    store.dispatch(employeeRemoved(this.employee.id));
  }

  render() {
    const employeeName = this.employee
      ? `${this.employee.firstName} ${this.employee.lastName}`
      : '';

    return html` <ing-confirmation-dialog
      is-alert-dialog
      title=${msg('Are you sure?')}
      confirm-text=${msg('Proceed')}
      cancel-text=${msg('Cancel')}
      confirm-variant="primary"
      cancel-variant="secondary"
      @confirm=${() => this.removeEmployee()}
    >
      <div slot="content">
        ${msg(str`Selected Employee record of ${employeeName} will be deleted`)}
      </div>
    </ing-confirmation-dialog>`;
  }
}

customElements.define('delete-employee-dialog', DeleteEmployeeDialog);
