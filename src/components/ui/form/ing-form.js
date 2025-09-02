import {LitElement, html} from 'lit';
import {ContextProvider} from '@lit/context';
import {z} from 'zod';
import {formContext, formErrorContext} from './form-context';

export class IngForm extends LitElement {
  static get properties() {
    return {
      schema: {type: Object},
    };
  }

  constructor() {
    super();
    this.schema = z.object({});
    this._values = {};
    this._errors = {};

    /** @protected */
    this._submit = this._submit.bind(this);

    this._contextProvider = new ContextProvider(this, {
      context: formContext,
    });

    this._formErrorContextProvider = new ContextProvider(this, {
      context: formErrorContext,
    });

    this._formErrorContextProvider.setValue(this._errors);

    this._contextProvider.setValue({
      setValue: this._setValue.bind(this),
      getValue: (name) => this._values[name],
    });
  }

  get _formNode() {
    return /** @type {HTMLFormElement} */ (this.querySelector('form'));
  }

  _setValue(name, value) {
    this._values[name] = value;
    this._validateField(name);
  }

  _validateField(name) {
    const result = this.schema.safeParse(this._values);
    if (result.success) {
      delete this._errors[name];
    } else {
      const issue = result.error.issues.find((i) => i.path[0] === name);
      this._errors[name] = issue?.message || null;
    }
    this._formErrorContextProvider.setValue({...this._errors});
  }

  _validateAll(e) {
    const formData = new FormData(e.target);

    for (const [name, value] of formData.entries()) {
      this._values[name] = value;
    }

    const result = this.schema.safeParse(this._values);
    this._errors = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const name = issue.path[0];
        this._errors[name] = issue.message;
      }
    }
    this._formErrorContextProvider.setValue({...this._errors});
    return result.success;
  }

  /**
   * @param {Event} ev
   * @protected
   */
  _submit(e) {
    e.preventDefault();
    e.stopPropagation();

    const valid = this._validateAll(e);

    if (!valid) return;

    this.dispatchEvent(
      new CustomEvent('form-submit', {
        detail: this._values,
        bubbles: true,
        composed: true,
      })
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this._formNode.addEventListener('submit', this._submit);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._formNode.removeEventListener('submit', this._submit);
  }

  render() {
    return html` <slot></slot> `;
  }
}

customElements.define('ing-form', IngForm);
