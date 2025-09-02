import {IngButton} from '../src/components/ui/button.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('ing-button', () => {
  test('is defined', () => {
    const el = document.createElement('ing-button');
    assert.instanceOf(el, IngButton);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<ing-button>Test Button</ing-button>`);

    assert.equal(el.variant, 'primary');
    assert.equal(el.size, 'm');
    assert.equal(el.treatment, 'filled');
    assert.equal(el.disabled, false);
    assert.equal(el.iconOnly, false);
    assert.equal(el.type, 'button');
    assert.equal(el.href, undefined);
  });

  test('renders slot content', async () => {
    const el = await fixture(html`<ing-button>Click me</ing-button>`);
    const slot = el.shadowRoot.querySelector('slot');
    assert.exists(slot);
  });

  suite('Properties', () => {
    test('variant property sets correctly', async () => {
      const el = await fixture(
        html`<ing-button variant="secondary">Button</ing-button>`
      );
      assert.equal(el.variant, 'secondary');
      assert.isTrue(el.hasAttribute('variant'));
      assert.equal(el.getAttribute('variant'), 'secondary');
    });

    test('size property sets correctly', async () => {
      const el = await fixture(html`<ing-button size="l">Button</ing-button>`);
      assert.equal(el.size, 'l');
      assert.isTrue(el.hasAttribute('size'));
      assert.equal(el.getAttribute('size'), 'l');
    });

    test('treatment property sets correctly', async () => {
      const el = await fixture(
        html`<ing-button treatment="outline">Button</ing-button>`
      );
      assert.equal(el.treatment, 'outline');
      assert.isTrue(el.hasAttribute('treatment'));
      assert.equal(el.getAttribute('treatment'), 'outline');
    });

    test('disabled property sets correctly', async () => {
      const el = await fixture(html`<ing-button disabled>Button</ing-button>`);
      assert.equal(el.disabled, true);
      assert.isTrue(el.hasAttribute('disabled'));
    });

    test('iconOnly property sets correctly', async () => {
      const el = await fixture(html`<ing-button icon-only>+</ing-button>`);
      assert.equal(el.iconOnly, true);
      assert.isTrue(el.hasAttribute('icon-only'));
    });

    test('type property sets correctly', async () => {
      const el = await fixture(
        html`<ing-button type="submit">Button</ing-button>`
      );
      assert.equal(el.type, 'submit');
      assert.isTrue(el.hasAttribute('type'));
      assert.equal(el.getAttribute('type'), 'submit');
    });

    test('href property sets correctly', async () => {
      const el = await fixture(
        html`<ing-button href="/test">Link Button</ing-button>`
      );
      assert.equal(el.href, '/test');
      assert.isTrue(el.hasAttribute('href'));
      assert.equal(el.getAttribute('href'), '/test');
    });
  });

  suite('Rendering modes', () => {
    test('renders as button by default', async () => {
      const el = await fixture(html`<ing-button>Button</ing-button>`);
      const anchor = el.shadowRoot.querySelector('a');
      assert.isNull(anchor);
    });

    test('renders as anchor when href is provided', async () => {
      const el = await fixture(
        html`<ing-button href="/test">Link</ing-button>`
      );
      const anchor = el.shadowRoot.querySelector('a');
      assert.exists(anchor);
      assert.equal(anchor.getAttribute('href'), '/test');
      assert.equal(anchor.getAttribute('role'), 'button');
      assert.equal(anchor.getAttribute('aria-disabled'), 'false');
    });
  });

  suite('Click handling', () => {
    test('click event fires for enabled button', async () => {
      const el = await fixture(html`<ing-button>Button</ing-button>`);
      let clicked = false;

      el.addEventListener('click', () => {
        clicked = true;
      });

      el.click();
      assert.isTrue(clicked);
    });

    test('click event is prevented for disabled button', async () => {
      const el = await fixture(html`<ing-button disabled>Button</ing-button>`);
      let clicked = false;

      el.addEventListener('click', () => {
        clicked = true;
      });

      el.click();
      assert.isFalse(clicked);
    });

    test('submit type creates proxy button', async () => {
      const el = await fixture(
        html`<ing-button type="submit">Submit</ing-button>`
      );

      // Mock form submission
      let formSubmitted = false;
      const form = document.createElement('form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        formSubmitted = true;
      });

      form.appendChild(el);
      document.body.appendChild(form);

      el.click();

      // Clean up
      document.body.removeChild(form);

      assert.isTrue(formSubmitted);
    });
  });

  suite('CSS Classes and Styles', () => {
    test('applies variant styles', async () => {
      const primaryEl = await fixture(
        html`<ing-button variant="primary">Primary</ing-button>`
      );
      const secondaryEl = await fixture(
        html`<ing-button variant="secondary">Secondary</ing-button>`
      );

      assert.equal(primaryEl.getAttribute('variant'), 'primary');
      assert.equal(secondaryEl.getAttribute('variant'), 'secondary');
    });

    test('applies size styles', async () => {
      const smallEl = await fixture(
        html`<ing-button size="s">Small</ing-button>`
      );
      const mediumEl = await fixture(
        html`<ing-button size="m">Medium</ing-button>`
      );
      const largeEl = await fixture(
        html`<ing-button size="l">Large</ing-button>`
      );

      assert.equal(smallEl.getAttribute('size'), 's');
      assert.equal(mediumEl.getAttribute('size'), 'm');
      assert.equal(largeEl.getAttribute('size'), 'l');
    });

    test('applies treatment styles', async () => {
      const filledEl = await fixture(
        html`<ing-button treatment="filled">Filled</ing-button>`
      );
      const outlineEl = await fixture(
        html`<ing-button treatment="outline">Outline</ing-button>`
      );
      const ghostEl = await fixture(
        html`<ing-button treatment="ghost">Ghost</ing-button>`
      );

      assert.equal(filledEl.getAttribute('treatment'), 'filled');
      assert.equal(outlineEl.getAttribute('treatment'), 'outline');
      assert.equal(ghostEl.getAttribute('treatment'), 'ghost');
    });

    test('applies disabled styles', async () => {
      const el = await fixture(
        html`<ing-button disabled>Disabled</ing-button>`
      );
      assert.isTrue(el.hasAttribute('disabled'));
    });

    test('applies icon-only styles', async () => {
      const el = await fixture(html`<ing-button icon-only>+</ing-button>`);
      assert.isTrue(el.hasAttribute('icon-only'));
    });
  });

  suite('Complex scenarios', () => {
    test('all properties can be combined', async () => {
      const el = await fixture(html`
        <ing-button
          variant="secondary"
          size="l"
          treatment="outline"
          type="submit"
          icon-only
        >
          🔍
        </ing-button>
      `);

      assert.equal(el.variant, 'secondary');
      assert.equal(el.size, 'l');
      assert.equal(el.treatment, 'outline');
      assert.equal(el.type, 'submit');
      assert.isTrue(el.iconOnly);
    });
  });
});
