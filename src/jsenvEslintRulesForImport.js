export const jsenvEslintRulesForImport = {
  "import/default": ["error"],
  "import/no-unresolved": [
    "error",
    {
      commonjs: true,
      amd: false,
      caseSensitive: false,
    },
  ],
  "import/named": ["error"],
  "import/namespace": ["error", { allowComputed: true }],
  "import/no-absolute-path": ["off"],
  "import/no-dynamic-require": ["error"],
  "import/export": ["error"],
  "import/no-named-as-default": ["warn"],
  "import/first": ["warn"],
  "import/no-duplicates": ["warn"],
  "import/newline-after-import": ["warn"],
  "import/max-dependencies": ["warn", { max: 10 }],
  "import/no-anonymous-default-export": [
    "off",
    {
      allowArray: true,
      allowArrowFunction: false,
      allowAnonymousClass: false,
      allowAnonymousFunction: false,
      allowLiteral: true,
      allowObject: true,
    },
  ],
}
