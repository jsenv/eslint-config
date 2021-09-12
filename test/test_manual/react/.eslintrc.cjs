const { resolve } = require("path")
const {
  composeEslintConfig,
  eslintConfigBase,
  eslintConfigForPrettier,
  jsenvEslintRules,
  jsenvEslintRulesForReact,
} = require("@jsenv/eslint-config")

const babelConfigFilePath = resolve(__dirname, "./babel.config.cjs")

const eslintConfig = composeEslintConfig(
  eslintConfigBase,
  {
    rules: jsenvEslintRules,
  },

  {
    parser: "@babel/eslint-parser",
    parserOptions: {
      babelOptions: {
        configFile: babelConfigFilePath,
      },
    },
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
