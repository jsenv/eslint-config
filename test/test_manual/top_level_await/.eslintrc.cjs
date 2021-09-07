const { composeEslintConfig, eslintConfigBase } = require("@jsenv/eslint-config")

const eslintConfig = composeEslintConfig(eslintConfigBase, {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
  },
})

module.exports = eslintConfig
