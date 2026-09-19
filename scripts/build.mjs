import { fileURLToPath } from "node:url";
import { appendFileSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import path from "node:path";

/*
 * Доказательство из лога Hoster.kz: main-процесс идёт через WASM
 * («Skipping creating a lockfile… using WASM bindings»), а воркеры
 * Collecting page data игнорируют useWasmBinary и падают с SIGABRT.
 * NEXT_TEST_WASM из process.env до воркеров не доходит — поэтому
 * и preload, и удаление linux .node до запуска next.
 */
process.env.NEXT_TEST_WASM = "1";

const root = fileURLToPath(new URL("..", import.meta.url));
const forceWasm = fileURLToPath(new URL("./force-wasm.cjs", import.meta.url));
process.env.NODE_OPTIONS = `--require ${JSON.stringify(forceWasm)}`;

function buildLog(message, data) {
  const payload = {
    sessionId: "fd0969",
    runId: "post-fix",
    hypothesisId: "C",
    location: "scripts/build.mjs",
    message,
    data,
    timestamp: Date.now(),
  };
  // #region agent log
  fetch("http://127.0.0.1:7406/ingest/cbc648cf-0771-40b7-b18b-4d45ebcc462f", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "fd0969" },
    body: JSON.stringify(payload),
  }).catch(() => {});
  try {
    const line = `${JSON.stringify(payload)}\n`;
    appendFileSync(path.join(root, "debug-fd0969.log"), line);
    appendFileSync(path.join(root, "public", "debug-fd0969.log"), line);
  } catch {
    /* ignore */
  }
  console.log("[debug-fd0969]", JSON.stringify(payload));
  // #endregion
}

const strip = spawnSync(process.execPath, [fileURLToPath(new URL("./strip-native-swc.mjs", import.meta.url))], {
  stdio: "inherit",
});
buildLog("stripped native swc before next build", {
  stripStatus: strip.status,
  nextTestWasm: process.env.NEXT_TEST_WASM,
  nodeOptions: process.env.NODE_OPTIONS,
});

const nextBin = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const child = spawn(process.execPath, [nextBin, "build", "--webpack"], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  buildLog("next build exited", { code, signal });
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
