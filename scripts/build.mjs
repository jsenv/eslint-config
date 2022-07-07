/**
 *
 * This file uses "@jsenv/core" to convert source files
 * into commonjs and write them into dist/
 *
 * read more at
 * https://github.com/jsenv/jsenv-core/blob/master/docs/building/readme.md#node-package-build
 *
 */

import { build } from "@jsenv/core"

import { rootDirectoryUrl } from "../jsenv.config.mjs"

await build({
  rootDirectoryUrl,
  buildDirectoryUrl: new URL("./dist/", rootDirectoryUrl),
  entryPointMap: {
    "./src/main.js": "jsenv_eslint_config.cjs",
  },
  runtimeCompat: {
    node: "16.14.0",
  },
  baseUrl: "./",
  minification: false,
  versioning: false,
  assetManifest: false,
})
