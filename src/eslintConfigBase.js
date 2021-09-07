/**
 * This ESLint config make ESLint capable to parse ES features such as
 * top level await, spread operator, rest params etc
 */

export const eslintConfigBase = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  env: {
    es6: true,
  },
  settings: {
    extensions: [".js"],
  },
}
