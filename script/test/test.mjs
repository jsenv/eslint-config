/*
 *
 * This file uses "@jsenv/core" to execute all test files.
 * https://github.com/jsenv/jsenv-core/blob/master/docs/testing/readme.md#table-of-contents
 *
 */

import { executeTestPlan, launchNode } from "@jsenv/core"
import * as jsenvConfig from "../../jsenv.config.mjs"

executeTestPlan({
  ...jsenvConfig,
  testPlan: {
    "test/**/*.test.mjs": {
      "node": {
        launch: launchNode,
      },
      "node-prod": {
        launch: launchNode,
        launchParams: {
          commandLineOptions: ["--conditions=production"],
        },
      },
    },
  },
})
