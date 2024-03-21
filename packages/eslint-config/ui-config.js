const path = require('path');
const rootDir = __dirname;

const tsconfigPath = path.resolve(rootDir, 'tsconfig.json');
const base = require('./base.js');

module.exports = {
  ...base,
  root: true,

  parserOptions: {
    ...base.parserOptions,
    project: tsconfigPath,
  },
};
