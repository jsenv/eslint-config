/*
 * This file uses "@jsenv/core" to execute all test files.
 */

import { executeTestPlan, nodeProcess } from "@jsenv/core"

import { rootDirectoryUrl } from "../jsenv.config.mjs"

await executeTestPlan({
  rootDirectoryUrl,
  testPlan: {
    "tests/**/*.test.mjs": {
      node: {
        launch: nodeProcess,
      },
    },
  },
})
