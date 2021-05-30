import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import sourceMaps from 'rollup-plugin-sourcemaps';

import pkg from './package.json';

const config = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  // Rollup has treeshaking by default, but we can optimize it further...
  treeshake: {
    // We assume reading a property of an object never has side-effects.
    // This means tsdx WILL remove getters and setters defined directly on objects.
    // Any getters or setters defined on classes will not be effected.
    //
    // @example
    //
    // const foo = {
    //  get bar() {
    //    console.log('effect');
    //    return 'bar';
    //  }
    // }
    //
    // const result = foo.bar;
    // const illegalAccess = foo.quux.tooDeep;
    //
    // Punchline....Don't use getters and setters
    propertyReadSideEffects: false,
  },
  plugins: [
    resolve(),
    typescript({
      tsconfig: 'tsconfig.prod.json',
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    commonjs(),
    sourceMaps(),
    terser({
      output: { comments: false },
      compress: {
        keep_infinity: true,
        pure_getters: true,
        passes: 10,
      },
      ecma: 5,
    }),
    sizeSnapshot(),
  ],
  external: Object.keys(pkg.devDependencies),
};

export default config;
