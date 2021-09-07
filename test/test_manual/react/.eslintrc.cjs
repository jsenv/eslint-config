const {
  composeEslintConfig,
  eslintConfigBase,
  eslintConfigForPrettier,
  jsenvEslintRules,
  jsenvEslintRulesForReact,
} = require("@jsenv/eslint-config")

const eslintConfig = composeEslintConfig(
  eslintConfigBase,
  {
    rules: jsenvEslintRules,
  },
  // react
  {
    plugins: ["react"],
    settings: {
      react: {
        version: "17",
      },
    },
    rules: jsenvEslintRulesForReact,
  },
  // jsx
  {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      extensions: [".jsx"],
    },
  },
  eslintConfigForPrettier,
)

module.exports = eslintConfig
