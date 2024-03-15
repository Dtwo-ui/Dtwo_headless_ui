import typescript from 'rollup-plugin-typescript2';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
const extensions = ['.ts', '.tsx', '.js', '.jsx'];
// const tsconfigOverride = { compilerOptions: { module: 'ESNext', moduleResolution: 'node' } };

export default [
  {
    input: './index.tsx',
    output: [
      {
        dir: './dist',
        format: 'cjs',
        entryFileNames: 'exampleCJS.cjs',
      },
      {
        dir: './dist',
        format: 'es',
        entryFileNames: 'exampleES.js',
      },
    ],
    external: ['react', 'react-dom'],
    plugins: [
      // alias({}),
      nodeResolve(),

      commonjs(),
      typescript({ tsconfig: '../../tsconfig.json' }),
    ],
  },
];
