import {LitElement, html, css, nothing} from 'lit';
import {DateIcon} from '../../icons/date';
import {ContextConsumer} from '@lit/context';
import {formContext, formErrorContext} from './form/form-context';

export class IngInput extends LitElement {
  static formAssociated = true; // Enable form association
  static properties = {
    type: {type: String},
    value: {type: String},
    placeholder: {type: String},
    disabled: {type: Boolean},
    required: {type: Boolean},
    readonly: {type: Boolean},
    variant: {type: String},
    label: {type: String},
    name: {type: String},
  };

  constructor() {
    super();
    this.type = 'text';
    this.value = '';
    this.placeholder = '';
    this.disabled = false;
    this.required = false;
    this.readonly = false;
    this.variant = 'default';
    this.label = '';
    this.error = '';
    this.name = '';
    this.internals = this.attachInternals();

    this._formContext = new ContextConsumer(this, {
      context: formContext,
      subscribe: true,
    });

    this._formErrorContext = new ContextConsumer(this, {
      context: formErrorContext,
      subscribe: true,
    });
  }

  updated(changedProps) {
    if (changedProps.has('value')) {
      this.internals.setFormValue(this.value);
    }
  }

  static styles = css`
    :host {
      display: block;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text);
      margin-bottom: 2px;
    }

    .input-wrapper {
      position: relative;
      display: inline-block;
    }

    .input {
      width: 100%;
      border: 1px solid rgb(var(--border-color));
      border-radius: 4px;
      background: rgb(var(--panel-background-color));
      color: rgb(var(--body-text-color));
      font-family: inherit;
      font-weight: 400;
      transition: all 0.2s;
      box-sizing: border-box;
      height: 42px;
      padding: 0 12px;
    }

    .input:focus {
      outline: none;
      border-color: rgb(var(--primary-color));
      box-shadow: 0 0 0 2px
        color-mix(in srgb, rgb(var(--primary-color)) 25%, transparent);
    }

    /* Variants */
    .variant-error {
      border-color: rgb(var(--error-text-color));
    }

    .variant-error:focus {
      border-color: rgb(var(--error-text-color));
      box-shadow: 0 0 0 2px
        color-mix(in srgb, rgb(var(--error-text-color)) 25%, transparent);
    }

    /* Date input customization */
    .input[type='date'] {
      padding-right: 40px; /* Space for custom icon */
    }

    .input[type='date']::-webkit-calendar-picker-indicator {
      opacity: 0;
      position: absolute;
      right: 8px;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }

    .input[type='date']::-webkit-inner-spin-button,
    .input[type='date']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    svg {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      pointer-events: none;
      z-index: 1;
      color: rgb(var(--primary-color));
    }

    .error-text {
      font-size: 0.75rem;
      margin-top: 2px;
    }

    .error-text {
      color: rgb(var(--error-text-color));
    }

    /* Hide native date icon in Firefox */
    .input[type='date'] {
      -moz-appearance: textfield;
    }
  `;

  render() {
    const error = this._formErrorContext.value?.[this.name];

    const inputClasses = [
      'input',
      error ? 'variant-error' : `variant-${this.variant}`,
    ].join(' ');

    const showDateIcon = this.type === 'date';

    return html`
      <div class="field">
        ${this.label
          ? html`<label class="label" for="input">${this.label}</label>`
          : ''}

        <div class="input-wrapper">
          <input
            id="input"
            class="${inputClasses}"
            type="${this.type}"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            ?readonly="${this.readonly}"
            name="${this.name}"
            @input="${this._handleInput}"
            @change="${this._handleChange}"
            @focus="${this._handleFocus}"
            @blur="${this._handleBlur}"
          />

          ${showDateIcon ? DateIcon() : ''}
        </div>

        ${error ? html` <div class="error-text">${error}</div> ` : nothing}
      </div>
    `;
  }

  _handleInput(e) {
    this.value = e.target.value;
    if (this._formContext) {
      this._formContext.value.setValue(this.name, this.value);
    }

    this.dispatchEvent(
      new CustomEvent('input', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleChange(e) {
    this.value = e.target.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleFocus() {
    this.dispatchEvent(
      new CustomEvent('focus', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleBlur() {
    this.dispatchEvent(
      new CustomEvent('blur', {
        detail: {value: this.value},
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define('ing-input', IngInput);
