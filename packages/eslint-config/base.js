const path = require('path');
const tsconfigPath = path.resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
    'plugin:storybook/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: tsconfigPath,
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'import',
    'jsx-a11y',
    'testing-library',
    'jest-dom',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-console': 'error',
  },
  ignorePatterns: ['.eslintrc.cjs', '**/*.d.ts', 'dist/*'],
};
