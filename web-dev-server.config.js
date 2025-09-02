import {legacyPlugin} from '@web/dev-server-legacy';
import rollupReplace from '@rollup/plugin-replace';
import {fromRollup} from '@web/dev-server-rollup';

const replace = fromRollup(rollupReplace);

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

export default {
  rootDir: 'src',
  appIndex: 'src/index.html',
  nodeResolve: {exportConditions: mode === 'dev' ? ['development'] : []},
  preserveSymlinks: true,
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false,
      },
    }),
  ],
};
