const path = require('path');
const rootDir = __dirname;

const tsconfigPath = path.resolve(rootDir, 'tsconfig.json');

module.exports = {
  root: true,
  extends: ['@d_two/eslint-config/base.cjs'],
  ignorePatterns: ['vitest.workspace.ts', 'setupTest.ts'],
};
