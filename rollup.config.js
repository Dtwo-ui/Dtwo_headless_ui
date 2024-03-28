import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import rollupPluginPeerDepsExternalModule from 'rollup-plugin-peer-deps-external';
import process from 'process';
import path from 'path';

const tsconfigPath = path.resolve(process.cwd(), 'tsconfig.json');
const extensions = ['.ts', '.tsx', '.js', '.jsx'];

export default [
  {
    input: './index.tsx',
    output: [
      {
        dir: './dist',
        format: 'cjs',
        entryFileNames: 'index.cjs',
      },
      {
        dir: './dist',
        format: 'es',
        entryFileNames: 'index.js',
      },
    ],
    plugins: [
      rollupPluginPeerDepsExternalModule(),
      nodeResolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: tsconfigPath }),
    ],
  },
];
