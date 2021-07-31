const {
  composeEslintConfig,
  eslintConfigForPrettier,
  jsenvEslintRules,
  eslintConfigBase,
} = require("@jsenv/eslint-config")

const eslintConfig = composeEslintConfig(
  eslintConfigBase,
  eslintConfigForPrettier,
  {
    rules: jsenvEslintRules,
  },
  {
    plugins: ["html"],
    settings: {
      extensions: [".html"],
    },
  },
)

module.exports = eslintConfig
