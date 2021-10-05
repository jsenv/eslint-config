/**
 *
 * This file uses "@jsenv/core" to convert source files
 * into commonjs and write them into dist/
 *
 * read more at
 * https://github.com/jsenv/jsenv-core/blob/master/docs/building/readme.md#node-package-build
 *
 */

import { buildProject } from "@jsenv/core"

import { projectDirectoryUrl } from "../../jsenv.config.mjs"

await buildProject({
  projectDirectoryUrl,
  buildDirectoryRelativeUrl: "./dist/",
  format: "commonjs",
  entryPointMap: {
    "./main.js": "./jsenv_eslint_config.cjs",
  },
  runtimeSupport: {
    node: "14.7.0",
  },
  buildDirectoryClean: true,
})
