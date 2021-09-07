# eslint-config &middot; [![npm package](https://img.shields.io/npm/v/@jsenv/eslint-config.svg?logo=npm&label=package)](https://www.npmjs.com/package/@jsenv/eslint-config) [![github main](https://github.com/jsenv/eslint-config/workflows/main/badge.svg)](https://github.com/jsenv/eslint-config/actions?workflow=main) [![codecov coverage](https://codecov.io/gh/jsenv/eslint-config/branch/master/graph/badge.svg)](https://codecov.io/gh/eslint-config)

ESLint config file consists into a single big object.
This package helps to split this big object into smaller objects.
This is possible thanks to a function capable to compose objects together to obtain a final object needed to configure ESLint.

# composeEslintConfig

_composeEslintConfig_ is a function returning an eslint config object being the composition of eslint config objects passed in arguments.

```js
const { composeEslintConfig, eslintConfigBase } = require("@jsenv/eslint-config")

const eslintConfig = composeEslintConfig(
  eslintConfigBase,
  // first "group": enable html plugin
  {
    plugins: ["html"],
    settings: {
      extensions: [".html"],
    },
  },
  // second "group": enable react plugin
  {
    plugins: ["react"],
    settings: {
      extensions: [".jsx"],
    },
  },
)

module.exports = eslintConfig
```

# Composable eslint configs

| ESLint config                                                                       | Description                                                     |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [eslintConfigBase](./src/eslintConfigBase.js)                                       | Enable latest js features                                       |
| [eslintConfigForPrettier](./src/eslintConfigForPrettier.js)                         | Disable eslint rules already handled by prettier                |
| [eslintConfigToPreferExplicitGlobals](./src/eslintConfigToPreferExplicitGlobals.js) | Force explicit code to use global variables like `window.event` |

# Advanced configuration example

The following code is meant to be put into an _.eslintrc.cjs_ file and does the following:

1. Reuse jsenv configuration for ESLint rules
2. Disable ESLint rules already handled by prettier
3. Use ESLint import plugin with a custom resolver
4. Use html plugin to enable linting of html files
5. Consider files as written for browsers by default
6. Consider a subset of files as written for Node.js

```cjs
const {
  composeEslintConfig,
  eslintConfigBase,
  eslintConfigForPrettier,
  jsenvEslintRules,
  jsenvEslintRulesForImport,
} = require("@jsenv/eslint-config")

const eslintConfig = composeEslintConfig(
  eslintConfigBase,
  {
    rules: {
      ...jsenvEslintRules,
      "operator-assignment": ["error", "always"], // override jsenv rules
    },
  },
  eslintConfigForPrettier,
  // import plugin
  {
    plugins: ["import"],
    settings: {
      "import/resolver": {
        ["@jsenv/importmap-eslint-resolver"]: {
          projectDirectoryUrl: __dirname,
          importMapFileRelativeUrl: "./import-map.importmap",
        },
      },
    },
    rules: jsenvEslintRulesForImport,
  },
  // html plugin
  {
    plugins: ["html"],
    settings: {
      extensions: [".html"],
    },
  },
  // files are written for browsers by default
  {
    env: {
      browser: true,
    },
  },
  // some files are written for node in ESM
  {
    overrides: [
      {
        files: ["**/*.mjs"],
        env: {
          browser: false,
          node: true,
        },
        globals: {
          __filename: "off",
          __dirname: "off",
          require: "off",
        },
        settings: {
          "import/resolver": {
            [importResolverPath]: {
              node: true,
            },
          },
        },
      },
    ],
  },
  // some files are written for node in CommonJS
  {
    overrides: [
      {
        files: ["**/*.cjs"],
        env: {
          browser: false,
          node: true,
        },
        globals: {
          __filename: true,
          __dirname: true,
          require: true,
        },
        settings: {
          "import/resolver": {
            [importResolverPath]: {
              node: true,
            },
          },
        },
      },
    ],
  },
)

module.exports = eslintConfig
```

## Composable ESLint rules

| Rules                                                           | Description                                                                                                     |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [jsenvEslintRules](./src/jsenvEslintRules.js)                   | jsenv rules for ESLint                                                                                          |
| [jsenvEslintRulesForImport](./src/jsenvEslintRulesForImport.js) | jsenv rules for [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)                       |
| [jsenvEslintRulesForReact](./src/jsenvEslintRulesForReact.js)   | jsenv rules for project using react and [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) |

# More

## Top level await

```js
const { composeEslintConfig, eslintConfigBase } = require("@jsenv/eslint-config")

const eslintConfig = composeEslintConfig(
  eslintConfigBase,
  // use "@babel/eslint-parser" until top level await is supported by ESLint default parser
  {
    parser: "@babel/eslint-parser",
    parserOptions: {
      requireConfigFile: false,
    },
  },
)

module.exports = eslintConfig
```

## React

```js
const {
  composeEslintConfig,
  eslintConfigBase,
  jsenvEslintRulesForReact,
} = require("@jsenv/eslint-config")

const eslintConfig = composeEslintConfig(
  eslintConfigBase,
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
)

module.exports = eslintConfig
```

If you use jsx, configure it as shown below.

```diff
    rules: jsenvEslintRulesForReact,
  },
+ // jsx
+ {
+   parserOptions: {
+     ecmaFeatures: {
+       jsx: true,
+     },
+   },
+   settings: {
+     extensions: [".jsx"],
+   },
+ },
```

## HTML in VSCode

In `".vscode/settings.json"` file, add

```json
"eslint.validate": ["javascript", "html"]
```
