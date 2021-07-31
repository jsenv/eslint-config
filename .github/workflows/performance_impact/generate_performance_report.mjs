import { measureImport } from "./measure_import/measure_import.mjs"
import { measureNpmTarball } from "./measure_npm_tarball/measure_npm_tarball.mjs"

export const generatePerformanceReport = async () => {
  const importMetrics = await measureImport()
  const npmTarballMetrics = await measureNpmTarball()

  return {
    groups: {
      "@jsenv/template-node-package package": {
        ...importMetrics,
        ...npmTarballMetrics,
      },
    },
  }
}

const executeAndLog = process.argv.includes("--log")
if (executeAndLog) {
  const performanceReport = await generatePerformanceReport()
  console.log(JSON.stringify(performanceReport, null, "  "))
}
