import {LitElement, html, css} from 'lit';
import {ChevronLeftIcon} from '../../icons/chevron-left';
import {ChevronRightIcon} from '../../icons/chevron-right';

export class IngPagination extends LitElement {
  static properties = {
    currentPage: {type: Number, attribute: 'current-page'},
    totalPages: {type: Number, attribute: 'total-pages'},
    totalItems: {type: Number, attribute: 'total-items'},
    maxVisiblePages: {type: Number, attribute: 'max-visible-pages'},
  };

  constructor() {
    super();
    this.currentPage = 1;
    this.totalPages = 1;
    this.totalItems = 0;
    this.maxVisiblePages = 7;
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
    }

    .pagination {
      display: flex;
      align-items: center;
      gap: 4px;
      font-family: inherit;
    }

    .pagination-info {
      margin-right: 16px;
      font-size: 0.875rem;
      color: var(--text-muted);
      white-space: nowrap;
    }

    .pagination-list {
      display: flex;
      align-items: center;
      gap: 2px;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    /* Ellipsis */
    .ellipsis {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px 4px;
      color: var(--text-muted);
      font-weight: 500;
      user-select: none;
    }

    /* Responsive */
    @media (max-width: 480px) {
      .pagination-info {
        display: none;
      }

      .hide-mobile {
        display: none;
      }
    }
  `;

  get _calculatedTotalPages() {
    if (this.totalPages > 0) return this.totalPages;
    return 1;
  }

  _getVisiblePages() {
    const total = this._calculatedTotalPages;
    const current = this.currentPage;
    const maxVisible = this.maxVisiblePages;

    if (total <= maxVisible) {
      return Array.from({length: total}, (_, i) => i + 1);
    }

    const sidePages = Math.floor((maxVisible - 3) / 2); // Reserve space for first, last, and ellipsis

    if (current <= sidePages + 2) {
      // Near the beginning
      const pages = Array.from({length: maxVisible - 2}, (_, i) => i + 1);
      return [...pages, '...', total];
    }

    if (current >= total - sidePages - 1) {
      // Near the end
      const pages = Array.from(
        {length: maxVisible - 2},
        (_, i) => total - (maxVisible - 3) + i
      );
      return [1, '...', ...pages];
    }

    // In the middle
    const startPage = current - sidePages;
    const endPage = current + sidePages;
    const pages = Array.from(
      {length: endPage - startPage + 1},
      (_, i) => startPage + i
    );
    return [1, '...', ...pages, '...', total];
  }

  _goToPage(page) {
    if (
      page < 1 ||
      page > this._calculatedTotalPages ||
      page === this.currentPage
    )
      return;

    this.currentPage = page;
    this.dispatchEvent(
      new CustomEvent('page-change', {
        detail: {
          page: this.currentPage,
          totalPages: this._calculatedTotalPages,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  _renderPageButton(page, isActive = false) {
    const isDisabled = page < 1 || page > this._calculatedTotalPages;

    return html`
      <li class="page-item">
        <ing-button
          ?disabled="${isDisabled}"
          @click="${() => this._goToPage(page)}"
          aria-label="Go to page ${page}"
          aria-current="${isActive ? 'page' : 'false'}"
          size="s"
          icon-only
          variant="${isActive ? 'primary' : 'secondary'}"
          treatment="${isActive ? 'filled' : 'ghost'}"
        >
          ${page}
        </ing-button>
      </li>
    `;
  }

  _renderNavButton(page, icon, label) {
    const isDisabled = page < 1 || page > this._calculatedTotalPages;

    return html`
      <li class="page-item">
        <ing-button
          ?disabled="${isDisabled}"
          @click="${() => this._goToPage(page)}"
          aria-label="${label}"
          size="s"
          treatment="ghost"
          icon-only
        >
          ${icon}
        </ing-button>
      </li>
    `;
  }

  render() {
    const visiblePages = this._getVisiblePages();

    return html`
      <nav class="pagination" role="navigation" aria-label="Pagination">
        <ul class="pagination-list">
          ${this._renderNavButton(
            this.currentPage - 1,
            ChevronLeftIcon(),
            'Previous page'
          )}
          ${visiblePages.map((page) =>
            page === '...'
              ? html`<li class="ellipsis">...</li>`
              : this._renderPageButton(page, page === this.currentPage)
          )}
          ${this._renderNavButton(
            this.currentPage + 1,
            ChevronRightIcon(),
            'Next page'
          )}
        </ul>
      </nav>
    `;
  }
}

customElements.define('ing-pagination', IngPagination);
