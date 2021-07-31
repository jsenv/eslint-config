import { formatWithPrettier, jsenvProjectFilesConfig } from "@jsenv/prettier-check-project"
import * as jsenvConfig from "../../jsenv.config.mjs"

formatWithPrettier({
  ...jsenvConfig,
  projectFilesConfig: {
    ...jsenvProjectFilesConfig,
    "./**/coverage/": false,
    "./**/.jsenv/": false,
    "./**/dist/": false,
  },
})
