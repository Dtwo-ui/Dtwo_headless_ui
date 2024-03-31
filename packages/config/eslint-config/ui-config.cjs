const path = require('path');
const rootDir = __dirname;

const tsconfigPath = path.resolve(rootDir, 'tsconfig.json');
const base = require('./base.cjs');

module.exports = {
  ...base,
  root: true,

  parserOptions: {
    ...base.parserOptions,
    project: tsconfigPath,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
