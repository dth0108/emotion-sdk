import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {})
];

const plugins = [
  nodeResolve({
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    declaration: true,
    declarationDir: 'dist',
    exclude: ['**/*.test.ts', '**/*.test.tsx', 'src/demo/**']
  })
];

export default [
  // CommonJS (for Node.js)
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    external,
    plugins
  },
  // ES Module (for bundlers)
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    },
    external,
    plugins
  },
  // UMD (for browsers)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'HealsideEmotionSDK',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'framer-motion': 'FramerMotion'
      }
    },
    external,
    plugins: [...plugins, terser()]
  }
];

