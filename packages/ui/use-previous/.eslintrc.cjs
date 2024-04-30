module.exports = {
  root: true,
  extends: ['@d_two/eslint-config/ui-config.cjs'],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
};
