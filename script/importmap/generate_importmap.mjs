/**

Two things happens here:

The script generates ./importmap.dev.importmap file that will be used by ESLint
to resolve imports.

The script also update "paths" in ./jsconfig.json that will be used by VSCode
to resolve imports.

*/

import { writeImportMapFiles } from "@jsenv/importmap-node-module"

import { projectDirectoryUrl } from "../../jsenv.config.mjs"

await writeImportMapFiles({
  projectDirectoryUrl,
  importMapFiles: {
    "./node_resolution.importmap": {
      mappingsForNodeResolution: true,
      mappingsForDevDependencies: true,
      useForJsConfigJSON: true,
    },
  },
})
