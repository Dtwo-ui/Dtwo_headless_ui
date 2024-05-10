import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import rollupPluginPeerDepsExternalModule from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';

import { readFileSync } from 'fs';
import path, { resolve } from 'path';
import process from 'process';

function readWorkspacePackageJson() {
  const workspacePackageJsonPath = resolve(process.cwd(), 'package.json');
  try {
    const workspacePackageJsonContent = readFileSync(workspacePackageJsonPath, 'utf8');
    return JSON.parse(workspacePackageJsonContent);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to read workspace package.json:', error);
    return null;
  }
}

// 사용 예시
const workspacePackageJson = readWorkspacePackageJson();
const tsconfigPath = path.resolve(process.cwd(), 'tsconfig.json');
const extensions = ['.ts', '.tsx', '.js', '.jsx'];

export default [
  {
    input: workspacePackageJson['index'],
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
      del({ targets: 'dist/*' }),
    ],
  },
];
