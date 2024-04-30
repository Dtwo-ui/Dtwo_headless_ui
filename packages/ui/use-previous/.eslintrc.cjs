module.exports = {
  root: true,
  extends: ['@dtwo/eslint-config/ui-config.cjs'],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
};
