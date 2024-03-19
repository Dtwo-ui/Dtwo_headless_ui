const path = require('path');
const rootDir = __dirname;

const tsconfigPath = path.resolve(rootDir, 'tsconfig.json');

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
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
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
  ignorePatterns: ['.eslintrc.cjs', '**/*.d.ts'],
};
