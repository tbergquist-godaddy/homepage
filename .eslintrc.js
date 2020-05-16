// @flow

const OFF = 0;

module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    node: true,
  },
  extends: ['@adeira/eslint-config/strict'],
  rules: {
    'import/no-unresolved': OFF,
    'flowtype/require-inexact-type': OFF,
  },
};
