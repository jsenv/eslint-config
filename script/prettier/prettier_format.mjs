import {
  formatWithPrettier,
  jsenvProjectFilesConfig,
} from "@jsenv/prettier-check-project"

import { projectDirectoryUrl } from "../../jsenv.config.mjs"

await formatWithPrettier({
  projectDirectoryUrl,
  projectFilesConfig: {
    ...jsenvProjectFilesConfig,
    "./**/coverage/": false,
    "./**/.jsenv/": false,
    "./**/dist/": false,
  },
})
