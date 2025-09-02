import summary from 'rollup-plugin-summary';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import copy from '@rollup-extras/plugin-copy';

export default {
  input: {
    'app-root': 'src/app-root.js',
    'generated/locales/tr': 'src/generated/locales/tr.js',
  },
  output: {
    dir: 'dist',
    format: 'esm',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    }),
    resolve(),
    terser({
      ecma: 2021,
      module: true,
      warnings: true,
    }),
    copy([
      'src/index.html',
      'src/styles.css',
      {
        src: 'src/assets/**/*',
        dest: 'assets',
      },
    ]),
    summary(),
  ],
};
