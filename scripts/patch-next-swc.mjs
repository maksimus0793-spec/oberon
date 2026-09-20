import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
// #region agent log
const debugLog = require("./debug-log.cjs");
// #endregion
const swcIndex = require.resolve("next/dist/build/swc/index.js");
let source = readFileSync(swcIndex, "utf8");

if (source.includes("OBERON_HOST_PATCH")) {
  console.log("Next.js SWC host patch already applied");
  // #region agent log
  debugLog("scripts/patch-next-swc.mjs", "SWC patch already present", { swcIndex }, "E");
  // #endregion
} else {
  const wasmImport = "const importedRawBindings = await import((0, _url.pathToFileURL)(pkgPath).toString());";
  const wasmImportFixed =
    'const importedRawBindings = await import((0, _url.pathToFileURL)(require.resolve(pkgPath.endsWith(".js") ? pkgPath : pkg)).href); /*OBERON_HOST_PATCH*/';

  if (!source.includes(wasmImport)) {
    throw new Error("Could not patch Next.js WASM import: expected source was not found");
  }

  source = source.replace(wasmImport, wasmImportFixed);

  const loadNative = "if (process.env.NEXT_TEST_WASM) {\n        throw Object.defineProperty(new Error('cannot run loadNative when `NEXT_TEST_WASM` is set')";
  const loadNativeBlocked =
    'if (process.platform === "linux" || process.env.NEXT_TEST_WASM) { /*OBERON_HOST_PATCH*/\n        throw Object.defineProperty(new Error(\'cannot run loadNative when `NEXT_TEST_WASM` is set\')';

  if (!source.includes(loadNative)) {
    throw new Error("Could not patch Next.js loadNative: expected source was not found");
  }

  source = source.replace(loadNative, loadNativeBlocked);
  writeFileSync(swcIndex, source);
  console.log("Patched Next.js SWC loader for linux WASM");
  // #region agent log
  debugLog(
    "scripts/patch-next-swc.mjs",
    "SWC patch applied",
    { swcIndex, hasWasmFix: source.includes("OBERON_HOST_PATCH") },
    "E",
  );
  // #endregion
}
