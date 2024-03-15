import typescript from 'rollup-plugin-typescript2';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const extensions = ['.ts', 'tsx', '.js', 'jsx'];
const tsconfigOverride = { compilerOptions: { module: 'ESNext', moduleResolution: 'node' } };

export default [
  {
    input: './index.ts',
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
    external: ['/node_modules/'],
    plugins: [
      typescript({ tsconfig: '../../tsconfig.json', tsconfigOverride }),
      alias({}),
      commonjs(),
      nodeResolve({ extensions }),
    ],
  },
];
