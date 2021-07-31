const syntaxDynamicImport = require("@babel/plugin-syntax-dynamic-import")
const syntaxImportMeta = require("@babel/plugin-syntax-import-meta")
const syntaxNumericSeparator = require("@babel/plugin-syntax-numeric-separator")
const syntaxJSX = require("@babel/plugin-syntax-jsx")

module.exports = {
  parserOpts: {
    allowAwaitOutsideFunction: true,
  },
  plugins: [syntaxDynamicImport, syntaxImportMeta, syntaxJSX, syntaxNumericSeparator],
}
