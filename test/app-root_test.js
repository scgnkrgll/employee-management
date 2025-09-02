import {AppRoot} from '../src/app-root';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('app-root', () => {
  test('is defined', () => {
    const el = document.createElement('app-root');
    assert.instanceOf(el, AppRoot);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<app-root></app-root>`);
    assert.shadowDom.equal(
      el,
      `
      <nav-menu></nav-menu>
      <main id="outlet"></main>
    `
    );
  });

  test('outlet element has correct attributes', async () => {
    const el = await fixture(html`<app-root></app-root>`);
    const outlet = el.shadowRoot.querySelector('#outlet');

    assert.exists(outlet);
    assert.equal(outlet.tagName.toLowerCase(), 'main');
    assert.equal(outlet.id, 'outlet');
  });

  test('has correct semantic structure', async () => {
    const el = await fixture(html`<app-root></app-root>`);

    const nav = el.shadowRoot.querySelector('nav-menu');
    const main = el.shadowRoot.querySelector('main');

    assert.exists(nav);
    assert.exists(main);

    // Verify order - nav should come before main
    const children = Array.from(el.shadowRoot.children);
    const navIndex = children.findIndex(
      (child) => child.tagName?.toLowerCase() === 'nav-menu'
    );
    const mainIndex = children.findIndex(
      (child) => child.tagName?.toLowerCase() === 'main'
    );

    assert.isTrue(
      navIndex < mainIndex,
      'nav-menu should come before main element'
    );
  });
});
