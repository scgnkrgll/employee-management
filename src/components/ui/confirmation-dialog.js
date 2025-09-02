import {LitElement, html, css} from 'lit';
import './button.js';
import {CloseIcon} from '../../icons/close.js';

export class IngConfirmationDialog extends LitElement {
  static properties = {
    isAlertDialog: {type: Boolean, attribute: 'is-alert-dialog', reflect: true},
    opened: {type: Boolean, reflect: true},
    title: {type: String},
    confirmText: {type: String, attribute: 'confirm-text'},
    cancelText: {type: String, attribute: 'cancel-text'},
  };

  constructor() {
    super();
    this.isAlertDialog = false;
    this.opened = false;
    this.title = '';
    this.confirmText = 'Yes';
    this.cancelText = 'No';

    this._handleKeydown = this._handleKeydown.bind(this);
    this._handleBackdropClick = this._handleBackdropClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('close-overlay', this._handleCloseOverlay);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('close-overlay', this._handleCloseOverlay);
    document.removeEventListener('keydown', this._handleKeydown);
  }

  static styles = css`
    :host {
      position: relative;
      display: inline-block;
    }

    :host([opened]) .backdrop {
      display: flex;
    }

    .backdrop {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 1000;
      align-items: center;
      justify-content: center;
    }

    .dialog {
      background: rgb(var(--panel-background-color));
      border-radius: 4px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      max-height: 90vh;
      min-width: 320px;
      animation: dialogSlideIn 0.2s ease-out;
      padding: 16px;
      margin: 16px;
    }

    @keyframes dialogSlideIn {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .dialog-title {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      color: rgb(var(--primary-color));
    }

    .dialog-content {
      line-height: 1.5;
      margin: 16px 0;
    }

    .dialog-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    :host([opened]) {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    :host([opened]) .backdrop {
      pointer-events: all;
    }
  `;

  render() {
    return html`
      <div class="backdrop" @click="${this._handleBackdropClick}">
        <div class="dialog" @click="${this._stopPropagation}">
          <div class="dialog-header">
            <h2 class="dialog-title">${this.title}</h2>
            <ing-button treatment="ghost" icon-only @click="${this.close}">
              ${CloseIcon()}
            </ing-button>
          </div>

          <div class="dialog-content">
            <slot name="content"></slot>
          </div>

          <div class="dialog-actions">
            <ing-button variant="primary" @click="${this._handleConfirm}">
              ${this.confirmText}
            </ing-button>
            <ing-button
              variant="secondary"
              treatment="outline"
              @click="${this._handleCancel}"
            >
              ${this.cancelText}
            </ing-button>
          </div>
        </div>
      </div>
    `;
  }

  open() {
    this.opened = true;
    document.addEventListener('keydown', this._handleKeydown);
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.opened = false;
    document.removeEventListener('keydown', this._handleKeydown);
    document.body.style.overflow = '';
  }

  _handleConfirm() {
    this.dispatchEvent(
      new CustomEvent('confirm', {
        bubbles: true,
        composed: true,
      })
    );
    this.close();
  }

  _handleCancel() {
    this.close();
  }

  _handleCloseOverlay() {
    this.close();
  }

  _handleKeydown(event) {
    if (event.key === 'Escape') {
      this._handleCancel();
    }
  }

  _handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      this._handleCancel();
    }
  }

  _stopPropagation(event) {
    event.stopPropagation();
  }
}

customElements.define('ing-confirmation-dialog', IngConfirmationDialog);
