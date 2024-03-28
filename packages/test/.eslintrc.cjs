const path = require('path');

module.exports = {
  root: true,
  extends: ['@repo/eslint-config/ui-config.cjs'],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
};
