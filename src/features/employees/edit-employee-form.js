import {LitElement, css, html} from 'lit';

import '../../components/ui/input';
import '../../components/ui/button';
import '../../components/ui/select';
import '../../components/ui/form/ing-form';

import {z} from 'zod';
import {Router} from '@vaadin/router';
import {msg, updateWhenLocaleChanges} from '@lit/localize';

export class EditEmployeeForm extends LitElement {
  static properties = {
    employee: {type: Object},
  };

  constructor() {
    super();
    this.employee = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: '',
      position: '',
    };

    updateWhenLocaleChanges(this);
  }

  get schema() {
    return z.object({
      firstName: z.string().min(1, msg('First name is required')),
      lastName: z.string().min(1, msg('Last name is required')),
      dateOfEmployment: z
        .string()
        .min(1, msg('Date of employment is required')),
      dateOfBirth: z.string().min(1, msg('Date of birth is required')),
      phone: z.string().min(1, msg('Phone number is required')),
      email: z.email(msg('Invalid email address')),
      department: z.string().min(1, msg('Department is required')),
      position: z.string().min(1, msg('Position is required')),
    });
  }

  static styles = css`
    .action-bar > ing-button {
      width: 280px;
    }

    form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      row-gap: 48px;
      column-gap: 150px;
    }

    .action-bar {
      display: flex;
      justify-content: center;
      gap: 12px 64px;
      margin-top: 16px;
      grid-column: 1 / -1;
    }

    @media (max-width: 1200px) {
      .action-bar {
        gap: 12px;
      }

      .action-bar > ing-button {
        width: 100%;
      }
    }

    @media (max-width: 768px) {
      form {
        row-gap: 24px;
        column-gap: 24px;
      }

      .action-bar {
        flex-direction: column;
      }
    }
  `;

  handleSubmit(event) {
    this.dispatchEvent(
      new CustomEvent('employee-saved', {
        detail: event.detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  goBack() {
    Router.go('/employees');
  }

  render() {
    return html`
      <ing-form @form-submit=${this.handleSubmit} .schema=${this.schema}>
        <form>
          <ing-input
            label=${msg('First Name')}
            name="firstName"
            value=${this.employee?.firstName}
          ></ing-input>
          <ing-input
            label=${msg('Last Name')}
            name="lastName"
            value=${this.employee?.lastName}
          ></ing-input>
          <ing-input
            label=${msg('Date of Employment')}
            name="dateOfEmployment"
            type="date"
            value=${this.employee?.dateOfEmployment}
          ></ing-input>
          <ing-input
            label=${msg('Date of Birth')}
            name="dateOfBirth"
            type="date"
            value=${this.employee?.dateOfBirth}
          ></ing-input>
          <ing-input
            label=${msg('Phone')}
            name="phone"
            type="tel"
            value=${this.employee?.phone}
          ></ing-input>
          <ing-input
            label=${msg('Email')}
            name="email"
            type="email"
            value=${this.employee?.email}
          ></ing-input>

          <ing-select
            label=${msg('Department')}
            name="department"
            value=${this.employee?.department}
            placeholder=${msg('Please Select')}
            .options=${[
              {value: 'Analytics', label: msg('Analytics')},
              {value: 'Tech', label: msg('Tech')},
            ]}
          ></ing-select>
          <ing-select
            label=${msg('Position')}
            name="position"
            value=${this.employee?.position}
            placeholder=${msg('Please Select')}
            .options=${[
              {value: 'Junior', label: msg('Junior')},
              {value: 'Medior', label: msg('Medior')},
              {value: 'Senior', label: msg('Senior')},
            ]}
          ></ing-select>

          <div class="action-bar">
            <ing-button type="submit">${msg('Save')}</ing-button>
            <ing-button
              treatment="outline"
              variant="secondary"
              @click=${this.goBack}
              >${msg('Cancel')}</ing-button
            >
          </div>
        </form>
      </ing-form>
    `;
  }
}

customElements.define('edit-employee-form', EditEmployeeForm);
