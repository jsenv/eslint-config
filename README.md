# eslint-config [![npm package](https://img.shields.io/npm/v/@jsenv/eslint-config.svg?logo=npm&label=package)](https://www.npmjs.com/package/@jsenv/eslint-config)

ESLint config file consists into a single **big** object. This package allows to split and subset of ESLint configuration to compose and reuse them.

- :+1: Part of configuration that belongs together can be regrouped
- :+1: ESLint configuration is easier to read

This is done thanks to a function capable to compose objects into a final ESLint configuration.

# composeEslintConfig

_composeEslintConfig_ is a function returning an eslint config object being the composition of eslint config objects passed in arguments.

```js
const {
  composeEslintConfig,
  eslintConfigBase,
} = require("@jsenv/eslint-config")

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
          exports: "off",
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
          exports: true,
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

# Common use cases

## Top level await

It will be supported by default in ESLint 8. Until then you need:

1. `"@babel/eslint-parser"` and `"@babel/core"` in your devDependencies
2. Configure ESLint parser to `"@babel/eslint-parser"`

```console
npm install --save-dev @babel/eslint-parser
npm install --save-dev @babel/core
```

_.eslintrc.cjs:_

```js
const {
  composeEslintConfig,
  eslintConfigBase,
} = require("@jsenv/eslint-config")

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

## JSX

1. `"@babel/eslint-parser"` and `"@babel/plugin-syntax-jsx"` in your devDependencies
2. Enable `@babel/plugin-syntax-jsx` in babel config file
3. Configure ESLint parser to `"@babel/eslint-parser"`

```console
npm install --save-dev @babel/eslint-parser
npm install --save-dev @babel/plugin-syntax-jsx
```

_babel.config.cjs:_

```js
const babelPluginSyntaxJSX = require("@babel/plugin-syntax-jsx")

module.exports = {
  plugins: [
    [
      babelPluginSyntaxJSX,
      {
        pragma: "React.createElement",
        pragmaFrag: "React.Fragment",
      },
    ],
  ],
}
```

_.eslintrc.cjs:_

```js
const {
  composeEslintConfig,
  eslintConfigBase,
  jsenvEslintRulesForReact,
} = require("@jsenv/eslint-config")

const eslintConfig = composeEslintConfig(
  eslintConfigBase,
  // jsx
  {
    parser: "@babel/eslint-parser",
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
```

## HTML in VSCode

In `".vscode/settings.json"` file, add

```json
"eslint.validate": ["javascript", "html"]
```
