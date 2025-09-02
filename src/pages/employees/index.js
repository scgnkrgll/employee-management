import {LitElement, html, css, nothing} from 'lit';
import {connect} from 'pwa-helpers';
import {Router} from '@vaadin/router';
import Fuse from 'fuse.js';

import {msg, updateWhenLocaleChanges} from '@lit/localize';
import {store} from '../../app/store';
import {employeesSelectors} from '../../features/employees/employees-slice';

import {ListIcon} from '../../icons/list';
import {GridIcon} from '../../icons/grid';

import '../../features/employees/employees-table';
import '../../features/employees/employees-cards';
import '../../features/employees/delete-employee-dialog';
import '../../components/ui/button';
import '../../components/ui/input';
import '../../components/ui/pagination';

/** @import { Employee } from '../../features/employees/employees-slice' */
/** @import { RootState } from '../../app/store' */

const fuseOptions = {
  threshold: 0.5,
  keys: ['firstName', 'lastName', 'email', 'department', 'position'],
};

const isSmallScreen = (size) => window.innerWidth < 968;

/**
 * @customElement employees-page
 */
export class EmployeesPage extends connect(store)(LitElement) {
  constructor() {
    super();
    updateWhenLocaleChanges(this);

    this.employees = employeesSelectors.selectAll(store.getState());
    this.viewMode = 'list';
    this.currentPage = 1;
    this.itemsPerPage = 9;
    this.handlePopState = this.handlePopState.bind(this);
    this.searchPattern = '';
    this.smallScreen = isSmallScreen(window.innerWidth);
    this._removeEmployee = this._removeEmployee.bind(this);
    this._handleResize = this._handleResize.bind(this);
  }

  static get properties() {
    return {
      /**
       * The number of employees.
       * @type {Employee[]}
       */
      employees: {type: Array},
      id: {type: String},

      /**
       * The current view mode.
       * @type {"grid" | "list"}
       */
      viewMode: {type: String},
      currentPage: {type: Number},
      itemsPerPage: {type: Number},
      searchPattern: {type: String},
      smallScreen: {type: Boolean},
    };
  }

  static get styles() {
    return css`
      .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
        gap: 16px;
        width: 100%;
        padding: 0;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0;
      }

      ing-pagination {
        margin: 16px 0;
      }
      ing-input {
        margin: 16px 0;
        max-width: 300px;
      }
    `;
  }

  /**
   * @param {RootState} state
   */
  stateChanged(state) {
    this.employees = employeesSelectors.selectAll(state);
  }

  /**
   * @param {string} id
   */
  _removeEmployee(id) {
    const deleteDialog = this.shadowRoot.querySelector(
      'delete-employee-dialog'
    );
    deleteDialog.id = id;
    deleteDialog.open();
  }

  get filteredEmployees() {
    if (!this.searchPattern) {
      return this.employees;
    }

    const fuse = new Fuse(this.employees, fuseOptions);
    const results = fuse.search(this.searchPattern);
    return results.map((result) => result.item);
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredEmployees.slice(start, end);
  }

  _renderEmployees() {
    if (this.filteredEmployees.length === 0) {
      return html`<p>${msg('No employees found.')}</p>`;
    }

    if (this.viewMode === 'grid' || this.smallScreen) {
      return html`
        <employee-cards
          .employees=${this.paginatedEmployees}
          .removeEmployee=${this._removeEmployee}
        ></employee-cards>
      `;
    } else {
      return html`
        <employees-table
          .employees=${this.paginatedEmployees}
          .removeEmployee=${this._removeEmployee}
        ></employees-table>
      `;
    }
  }

  /**
   * @param {"grid" | "list"} viewMode
   */
  _setViewMode(viewMode) {
    this._setQueryParam('view', viewMode);
  }

  _renderViewModeToggleButtons() {
    if (this.smallScreen) return nothing;

    return html` <div class="toggle-buttons">
      <ing-button
        icon-only
        treatment="ghost"
        @click=${() => this._setViewMode('list')}
        ?disabled=${this.viewMode === 'list'}
      >
        ${ListIcon()}
      </ing-button>
      <ing-button
        icon-only
        treatment="ghost"
        @click=${() => this._setViewMode('grid')}
        ?disabled=${this.viewMode === 'grid'}
      >
        ${GridIcon()}
      </ing-button>
    </div>`;
  }

  /**
   * @param {string} key
   * @param {string} value
   */
  _setQueryParam(key, value) {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    Router.go(`/employees?${params.toString()}`);
  }

  _handlePageChange(e) {
    this._setQueryParam('page', e.detail.page);
  }

  get _totalPages() {
    return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', this.handlePopState);
    window.addEventListener('resize', this._handleResize.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('popstate', this.handlePopState);
    window.removeEventListener('resize', this._handleResize.bind(this));
  }

  handlePopState() {
    this.observeQueryParams();
  }

  onBeforeEnter() {
    this.observeQueryParams();
  }

  observeQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const currentPage = parseInt(params.get('page'));
    const viewMode = params.get('view');

    if (
      !isNaN(currentPage) &&
      currentPage > 0 &&
      currentPage <= this._totalPages
    ) {
      this.currentPage = currentPage;
    }
    if (['grid', 'list'].includes(viewMode)) {
      this.viewMode = viewMode;
    }
  }

  _handleResize() {
    this.smallScreen = isSmallScreen(window.innerWidth);
  }

  handleSearchInput(e) {
    this.searchPattern = e.target.value;
    this._setQueryParam('page', '1');
  }

  render() {
    return html`<div class="header">
        <h2>${msg('Employee List')}</h2>
        ${this._renderViewModeToggleButtons()}
      </div>

      <ing-input
        type="text"
        .value=${this.searchPattern}
        @input=${this.handleSearchInput.bind(this)}
        placeholder=${msg('Search employees...')}
      >
      </ing-input>

      ${this._renderEmployees()}
      ${this.filteredEmployees.length === 0
        ? nothing
        : html` <ing-pagination
            show-first-last="false"
            max-visible-pages="5"
            .totalPages=${this._totalPages}
            .currentPage=${this.currentPage}
            @page-change="${this._handlePageChange}"
          >
          </ing-pagination>`}

      <delete-employee-dialog></delete-employee-dialog>`;
  }
}

window.customElements.define('employees-page', EmployeesPage);
