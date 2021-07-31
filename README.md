# eslint-config

Create ESLint configuration for any project.

[![npm package](https://img.shields.io/npm/v/@jsenv/eslint-config.svg?logo=npm&label=package)](https://www.npmjs.com/package/@jsenv/eslint-config)
[![github main](https://github.com/jsenv/eslint-config/workflows/main/badge.svg)](https://github.com/jsenv/eslint-config/actions?workflow=main)
[![codecov coverage](https://codecov.io/gh/jsenv/eslint-config/branch/master/graph/badge.svg)](https://codecov.io/gh/eslint-config)

# Presentation

Provides ESLint config chunks that can be composed together to obtain the eslint config you need. It is used by jsenv repositories to configure ESLint.

# composeEslintConfig

`composeEslintConfig` is a function returning an eslint config object being the composition of eslint config objects passed in arguments.

This function helps to create groups while configuring ESLint.

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

## Composable eslint configs

| ESLint config                       | Description                                          | Source                                                                                        |
| ----------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| eslintConfigBase                    | enable es6 features like top level await             | [src/eslintConfigBase.js](./src/eslintConfigBase.js#L22)                                      |
| eslintConfigForPrettier             | disable all eslint rules already handled by prettier | [src/eslintConfigForPrettier.js](./src/eslintConfigForPrettier.js#L3)                         |
| eslintConfigToPreferExplicitGlobals | toto                                                 | [src/eslintConfigToPreferExplicitGlobals.js](./src/eslintConfigToPreferExplicitGlobals.js#L3) |

## eslintConfigForPrettier

**Important**: This object is forcing a list of eslint rules to `"off"` so it must be used after eslint rules are configured. In other words, keep it low, ideally last, in the eslint config composition.

```js
const {
  composeEslintConfig,
  eslintConfigBase,
  eslintConfigForPrettier,
} = require("@jsenv/eslint-config")

const eslintConfig = composeEslintConfig(
  eslintConfigBase,
  {
    rules: {
      semi: ["error", "never"],
    },
  },
  eslintConfigForPrettier, // will disable "semi" rule because prettier is handling semi colon during formatting
)

module.exports = eslintConfig
```

## eslintConfigToPreferExplicitGlobals

`eslintConfigToPreferExplicitGlobals` is an eslint config object declared in .

If your code uses a variable named `close`, eslint consider it as defined because there is a `window.close` function. This behaviour prevents you to catch bugs because most of the time you don't mean `window.close`. Using `eslintConfigToPreferExplicitGlobals` means `close` can be reported as not defined and forces to write explicitely `window.close` when that's what you actually want to use.

```js
const {
  composeEslintConfig,
  eslintConfigBase,
  eslintConfigToPreferExplicitGlobals,
} = require("@jsenv/eslint-config")

const eslintConfig = composeEslintConfig(eslintConfigBase, eslintConfigToPreferExplicitGlobals)

module.exports = eslintConfig
```

</details>

<details>
  <summary>jsenvEslintRules</summary>

`jsenvEslintRules` is a list of eslint rules declared in [src/jsenvEslintRules.js](./src/jsenvEslintRules.js).

Use `jsenvEslintRules` to reuse the eslint configuration used in jsenv codebase. You can still modify some rules to you convenience as shown below:

```js
const { composeEslintConfig, jsenvEslintRules } = require("@jsenv/eslint-config")

const eslintConfig = composeEslintConfig(eslintConfigBase, {
  rules: {
    ...jsenvEslintRules,
    semi: ["error", "always"],
  },
})

module.exports = eslintConfig
```

</details>

<details>
  <summary>jsenvEslintRulesForImport</summary>

`jsenvEslintRulesForImport` is a list of eslint rules declared in [src/jsenvEslintRulesForImport.js](./src/jsenvEslintRulesForImport.js).

It can be used to configure [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) with jsenv rules.

```console
npm install --save-dev eslint-plugin-import
```

```js
const { composeEslintConfig, jsenvEslintRulesForImport } = require("@jsenv/eslint-config")

const eslintConfig = composeEslintConfig(eslintConfigBase, {
  plugins: ["import"],
  settings: {
    "import/resolver": {
      node: {},
    },
  },
  rules: jsenvEslintRulesForImport,
})

module.exports = eslintConfig
```

</details>

<details>
  <summary>jsenvEslintRulesForReact</summary>

`jsenvEslintRulesForReact` is a list of eslint rules declared in [src/jsenvEslintRulesForReact.js](./src/jsenvEslintRulesForReact.js).

It can be used to configure [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) with jsenv rules.

```console
npm install --save-dev eslint-plugin-react
```

```js
const { composeEslintConfig, jsenvEslintRulesForReact } = require("@jsenv/eslint-config")

const eslintConfig = composeEslintConfig(eslintConfigBase, {
  plugins: ["react"],
  rules: jsenvEslintRulesForReact,
})

module.exports = eslintConfig
```

</details>

# Advanced configuration example

The following code is meant to be put `.eslintrc.cjs` and does the following:

1. Reuse jsenv configuration for eslint
2. Disable eslint rules already handled by prettier
3. Use eslint import plugin with a custom resolver
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
    rules: jsenvEslintRules,
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
  // and some files are written for node as es modules
  {
    overrides: [
      {
        files: [".github/**/*.js", "script/**/*.js", "jsenv.config.js"],
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
  // and some are written for node as commonjs modules
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

# More

## Enable ESLint for html files in VsCode

Add

```json
"eslint.validate": ["javascript", "html"]
```

In `.vscode/settings.json`
