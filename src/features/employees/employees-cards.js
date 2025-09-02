import {LitElement, html, css} from 'lit';
import '../../features/employees/employees-table';
import '../../components/ui/button';
import '../../components/ui/card';
import '../../components/ui/confirmation-dialog';

import {EditIcon} from '../../icons/edit';
import {DeleteIcon} from '../../icons/delete';
import {msg, updateWhenLocaleChanges} from '@lit/localize';

class InfoText extends LitElement {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  static properties = {
    label: {type: String},
    value: {type: String},
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }

    .muted-text {
      color: rgb(var(--body-muted-text-color));
    }
    .value-text {
      font-weight: bold;
    }
  `;

  render() {
    return html`
      <span class="muted-text">${this.label}</span>
      <span class="value-text">${this.value}</span>
    `;
  }
}

customElements.define('info-text', InfoText);

/**
 * @customElement employee-cards
 */
class EmployeeCards extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 64px;
    }

    .info-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .action-buttons {
      display: flex;
      gap: 8px;
      margin-top: 16px;
    }

    @media (max-width: 600px) {
      :host {
        grid-template-columns: 1fr;
      }
      .info-container {
        grid-template-columns: 1fr;
      }
    }
  `;

  static properties = {
    employees: {type: Array},
  };

  constructor() {
    super();
    /**
     * @type {Employee[]}
     */
    this.employees = [];
  }

  render() {
    return html`
      ${this.employees.map(
        (employee) => html` <ing-card>
          <div class="info-container">
            <info-text
              label=${msg('First Name')}
              .value=${employee.firstName}
            ></info-text>
            <info-text
              label=${msg('Last Name')}
              .value=${employee.lastName}
            ></info-text>
            <info-text
              label=${msg('Date of Employment')}
              .value=${new Date(employee.dateOfEmployment).toLocaleDateString()}
            ></info-text>
            <info-text
              label=${msg('Date of Birth')}
              .value=${new Date(employee.dateOfBirth).toLocaleDateString()}
            ></info-text>
            <info-text
              label=${msg('Phone')}
              .value=${employee.phone}
            ></info-text>
            <info-text
              label=${msg('Email')}
              .value=${employee.email}
            ></info-text>
            <info-text
              label=${msg('Department')}
              .value=${employee.department}
            ></info-text>
            <info-text
              label=${msg('Position')}
              .value=${employee.position}
            ></info-text>
          </div>
          <div class="action-buttons">
            <ing-button
              variant="secondary"
              size="m"
              treatment="filled"
              href=${`employees/edit/${employee.id}`}
            >
              ${EditIcon()} ${msg('Edit')}
            </ing-button>
            <ing-button
              variant="primary"
              size="m"
              treatment="filled"
              @click=${() => this.removeEmployee(employee.id)}
            >
              ${DeleteIcon()} ${msg('Delete')}
            </ing-button>
          </div>
        </ing-card>`
      )}
    `;
  }
}

customElements.define('employee-cards', EmployeeCards);
