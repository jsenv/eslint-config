const {
  composeEslintConfig,
  eslintConfigBase,
  eslintConfigForPrettier,
  jsenvEslintRules,
  jsenvEslintRulesForReact,
} = require("@jsenv/eslint-config")

const eslintConfig = composeEslintConfig(
  eslintConfigBase,
  eslintConfigForPrettier,
  {
    rules: jsenvEslintRules,
  },
  // react
  {
    plugins: ["react"],
    settings: {
      react: {
        version: "detect",
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
)

module.exports = eslintConfig
