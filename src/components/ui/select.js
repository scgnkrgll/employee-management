import {LitElement, html, css, nothing} from 'lit';
import {ContextConsumer} from '@lit/context';
import {formContext, formErrorContext} from './form/form-context';
import {ArrownDownIcon} from '../../icons/arrow-down';

export class IngSelect extends LitElement {
  static formAssociated = true;
  static properties = {
    value: {type: String},
    placeholder: {type: String},
    disabled: {type: Boolean},
    required: {type: Boolean},
    readonly: {type: Boolean},
    variant: {type: String},
    label: {type: String},
    name: {type: String},
    options: {type: Array}, // Array of {value, label}
  };

  constructor() {
    super();
    this.value = '';
    this.placeholder = '';
    this.disabled = false;
    this.required = false;
    this.readonly = false;
    this.variant = 'default';
    this.label = '';
    this.name = '';
    this.options = [];
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
    .select-wrapper {
      position: relative;
      display: inline-block;
    }
    .select {
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
      appearance: none;
    }
    .select:focus {
      outline: none;
      border-color: rgb(var(--primary-color));
      box-shadow: 0 0 0 2px
        color-mix(in srgb, rgb(var(--primary-color)) 25%, transparent);
    }
    .variant-error {
      border-color: rgb(var(--error-text-color));
    }
    .variant-error:focus {
      border-color: rgb(var(--error-text-color));
      box-shadow: 0 0 0 2px
        color-mix(in srgb, rgb(var(--error-text-color)) 25%, transparent);
    }
    .error-text {
      font-size: 0.75rem;
      margin-top: 2px;
      color: rgb(var(--error-text-color));
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
      color: rgb(var(--border-color));
    }
  `;

  render() {
    const error = this._formErrorContext.value?.[this.name];
    const selectClasses = [
      'select',
      error ? 'variant-error' : `variant-${this.variant}`,
    ].join(' ');

    return html`
      <div class="field">
        ${this.label
          ? html`<label class="label" for="select">${this.label}</label>`
          : ''}
        <div class="select-wrapper">
          <select
            id="select"
            class="${selectClasses}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            ?readonly="${this.readonly}"
            name="${this.name}"
            @input="${this._handleInput}"
            @change="${this._handleChange}"
            @focus="${this._handleFocus}"
            @blur="${this._handleBlur}"
          >
            ${this.placeholder
              ? html`<option value="" disabled ?selected=${!this.value}>
                  ${this.placeholder}
                </option>`
              : nothing}
            ${this.options.map(
              (opt) => html`<option
                value="${opt.value}"
                ?selected=${this.value === opt.value}
              >
                ${opt.label}
              </option>`
            )}
          </select>

          ${ArrownDownIcon()}
        </div>
        ${error ? html`<div class="error-text">${error}</div>` : nothing}
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

customElements.define('ing-select', IngSelect);
