const path = require('path');
const rootDir = __dirname;

const tsconfigPath = path.resolve(rootDir, 'tsconfig.json');

module.exports = {
  root: true,
  extends: ['@repo/eslint-config/ui-config.cjs'],
  parserOptions: {
    project: tsconfigPath,
  },
};
