import {LitElement, html, css} from 'lit';
import '../../components/ui/button';
import '../../components/ui/table/table';
import '../../components/ui/table/table-cell';
import '../../components/ui/table/table-header';
import '../../components/ui/table/table-row';

import {EditIcon} from '../../icons/edit';
import {DeleteIcon} from '../../icons/delete';
import {msg, updateWhenLocaleChanges} from '@lit/localize';

/**
 * @customElement employees-table
 */
class EmployeesTable extends LitElement {
  static properties = {
    employees: {type: Array},
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    /**
     * @type {Employee[]}
     */
    this.employees = [];
  }

  static styles = css`
    :host {
      display: block;
      overflow-x: auto;
    }
  `;

  render() {
    return html`
      <ing-table>
        <ing-table-row>
          <ing-table-header>${msg('First Name')}</ing-table-header>
          <ing-table-header>${msg('Last Name')}</ing-table-header>
          <ing-table-header>${msg('Date of Employment')}</ing-table-header>
          <ing-table-header>${msg('Date of Birth')}</ing-table-header>
          <ing-table-header>${msg('Phone')}</ing-table-header>
          <ing-table-header>${msg('Email')}</ing-table-header>
          <ing-table-header>${msg('Department')}</ing-table-header>
          <ing-table-header>${msg('Position')}</ing-table-header>
          <ing-table-header style="width: 84px;"
            >${msg('Actions')}</ing-table-header
          >
        </ing-table-row>
        ${this.employees.map(
          (employee) => html`
            <ing-table-row>
              <ing-table-cell>${employee.firstName}</ing-table-cell>
              <ing-table-cell>${employee.lastName}</ing-table-cell>
              <ing-table-cell
                >${new Date(
                  employee.dateOfEmployment
                ).toLocaleDateString()}</ing-table-cell
              >
              <ing-table-cell
                >${new Date(
                  employee.dateOfBirth
                ).toLocaleDateString()}</ing-table-cell
              >
              <ing-table-cell>${employee.phone}</ing-table-cell>
              <ing-table-cell>${employee.email}</ing-table-cell>
              <ing-table-cell>${employee.department}</ing-table-cell>
              <ing-table-cell>${employee.position}</ing-table-cell>
              <ing-table-cell
                style="display: flex; justify-content: flex-end; width: 84px;"
              >
                <ing-button
                  icon-only
                  treatment="ghost"
                  href=${`employees/edit/${employee.id}`}
                >
                  ${EditIcon()}
                </ing-button>
                <ing-button
                  @click=${() => this.removeEmployee(employee.id)}
                  icon-only
                  treatment="ghost"
                >
                  ${DeleteIcon()}</ing-button
                >
              </ing-table-cell>
            </ing-table-row>
          `
        )}
      </ing-table>
    `;
  }
}

customElements.define('employees-table', EmployeesTable);
