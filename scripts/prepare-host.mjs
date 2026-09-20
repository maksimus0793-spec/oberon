import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
// #region agent log
const debugLog = require("./debug-log.cjs");
debugLog(
  "scripts/prepare-host.mjs",
  "prepare-host start",
  { platform: process.platform, node: process.version, argv: process.argv.slice(1) },
  "B",
);
// #endregion

if (process.platform !== "linux") {
  process.exit(0);
}

const run = (file) => {
  const result = spawnSync(process.execPath, [fileURLToPath(new URL(file, import.meta.url))], {
    stdio: "inherit",
  });
  // #region agent log
  debugLog(
    "scripts/prepare-host.mjs",
    "prepare-host step finished",
    { file, status: result.status, signal: result.signal, error: result.error ? String(result.error) : null },
    "E",
  );
  // #endregion
  if (result.status) process.exit(result.status);
};

run("./strip-native-swc.mjs");
run("./patch-next-swc.mjs");
