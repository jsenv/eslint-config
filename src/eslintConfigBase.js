/**
 * This ESLint config make ESLint capable to parse ES features such as
 * top level await, spread operator, rest params etc
 * One day all this will be supported by ESLint default parser and this won't not be needed anymore.
 */

import { resolveUrl, urlToFileSystemPath } from "@jsenv/util"

let jsenvEslintConfigDirectoryUrl

// eslint-disable-next-line no-undef
if (typeof require === "function") {
  // we are being executed from dist/jsenv_eslint_config.cjs
  jsenvEslintConfigDirectoryUrl = resolveUrl(
    // remove dist/
    "../",
    import.meta.url,
  )
} else {
  jsenvEslintConfigDirectoryUrl = resolveUrl(
    // remove src/
    "../",
    import.meta.url,
  )
}
const babelConfigFileUrl = resolveUrl("babel.config.cjs", jsenvEslintConfigDirectoryUrl)
const babelConfigFilePath = urlToFileSystemPath(babelConfigFileUrl)

export const eslintConfigBase = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      spread: true,
      restParams: true,
      defaultParams: true,
      destructuring: true,
      objectLiteralShorthandMethods: true,
    },
    requireConfigFile: false,
    // https://babeljs.io/docs/en/options#parseropts
    allowAwaitOutsideFunction: true,
    babelOptions: {
      configFile: babelConfigFilePath,
    },
  },
  env: {
    es6: true,
  },
  settings: {
    extensions: [".js"],
  },
}
