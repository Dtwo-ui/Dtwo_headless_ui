import typescript from 'rollup-plugin-typescript2';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import rollupPluginPeerDepsExternalModule from 'rollup-plugin-peer-deps-external';

import path from 'path';
import { fileURLToPath } from 'url';
import { dts } from 'rollup-plugin-dts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');

const extensions = ['.ts', '.tsx', '.js', '.jsx'];
// const tsconfigOverride = { compilerOptions: { module: 'esnext', moduleResolution: 'node' } };
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
    plugins: [
      rollupPluginPeerDepsExternalModule(),
      // alias({}),
      nodeResolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: tsconfigPath }),
      dts(),
    ],
  },
];
