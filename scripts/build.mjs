import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";

const require = createRequire(import.meta.url);
// #region agent log
const debugLog = require("./debug-log.cjs");
// #endregion

const nextBin = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));

function runNextBuild() {
  const child = spawn(process.execPath, [nextBin, "build", "--webpack"], {
    stdio: "inherit",
    env: process.env,
  });

  child.on("exit", (code, signal) => {
    // #region agent log
    debugLog(
      "scripts/build.mjs",
      "next build exited",
      { code, signal, platform: process.platform, node: process.version },
      "D",
    );
    // #endregion
    if (signal) process.kill(process.pid, signal);
    process.exit(code ?? 1);
  });
}

if (process.platform !== "linux") {
  runNextBuild();
} else {
  /*
   * На Hoster.kz glibc старше 2.29. Next на linux/x64 игнорирует useWasmBinary
   * и грузит .node — воркеры Collecting page data падают с SIGABRT.
   */
  process.env.NEXT_TEST_WASM = "1";
  process.env.OBERON_DEBUG_RUN = "post-fix";
  delete process.env.NEXT_DISABLE_SWC_WASM;

  const forceWasm = fileURLToPath(new URL("./force-wasm.cjs", import.meta.url));
  const requireFlag = `--require ${JSON.stringify(forceWasm)}`;
  process.env.NODE_OPTIONS = process.env.NODE_OPTIONS ? `${process.env.NODE_OPTIONS} ${requireFlag}` : requireFlag;

  console.log("[oberon-build] Forcing SWC WASM and removing linux native binaries");
  // #region agent log
  debugLog(
    "scripts/build.mjs",
    "linux build prepare",
    {
      node: process.version,
      nextTestWasm: process.env.NEXT_TEST_WASM || null,
      hasRequireHook: String(process.env.NODE_OPTIONS || "").includes("force-wasm"),
    },
    "D",
  );
  // #endregion

  const prepare = spawnSync(process.execPath, [fileURLToPath(new URL("./prepare-host.mjs", import.meta.url))], {
    stdio: "inherit",
  });

  if (prepare.status) {
    process.exit(prepare.status);
  }

  runNextBuild();
}
