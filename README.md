# Employee Directory

An employee directory application built with Lit Element, featuring internationalization, state management, and a responsive design.

## Tech Stack

- **State Management**: Redux Toolkit
- **Routing**: @vaadin/router
- **Internationalization**: @lit/localize
- **Validation**: Zod
- **Search**: Fuse.js

## Setup

Install dependencies:

```bash
npm install
```

## Development

Start the development server with hot reloading:

```bash
npm run serve
```

For production mode development:

```bash
npm run serve:prod
```

## Testing

Run all tests (both development and production modes):

```bash
npm test
```

Development mode testing with watch:

```bash
npm run test:watch
```

Production mode testing:

```bash
npm run test:prod
```

Production mode testing with watch:

```bash
npm run test:prod:watch
```

See the [modern-web.dev testing documentation](https://modern-web.dev/docs/test-runner/overview) for more information.

## Building

Build the application for production:

```bash
npm run build
```

This will:

1. Clean the `dist` directory
2. Build localization assets
3. Bundle and minify the source code using Rollup

Serve the built application:

```bash
npm run serve:dist
```

## Deployment

Automatic deployment handled by **Netlify**.

### Manual Deployment

You can also deploy manually by building locally and uploading the `dist` folder to any static hosting service.

## Internationalization

### Translation Workflow

1. **Extract messages** from your source code:

```bash
npm run extract
```

This command scans your source code for messages and updates the XLIFF files in the `xliff/` directory.

2. **Edit translation files**: After running the extract command, the `xliff/` directory will contain the messages. You can edit the related `.xlf` files to provide translations for different languages:

3. **Generate localized templates** from the XLIFF files:

```bash
npm run build:lit-localize
```

Processes the XLIFF files and generates the localized JavaScript modules in the `src/generated/locales/` directory.

### Adding New Languages

To add support for a new language:

1. Configure the new locale in `lit-localize.json`
2. Run `npm run extract` to generate the XLIFF file
3. Translate the strings in the new `.xlf` file
4. Run `npm run build:lit-localize` to generate the locale modules
