import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";

/*
 * На Hoster.kz glibc старше 2.29. Нативный SWC при загрузке воркерами
 * «Collecting page data» роняет процесс (SIGABRT). Перед next build
 * удаляем linux .node и заставляем воркеры взять WASM.
 */
process.env.NEXT_TEST_WASM = "1";

const forceWasm = fileURLToPath(new URL("./force-wasm.cjs", import.meta.url));
process.env.NODE_OPTIONS = `--require ${JSON.stringify(forceWasm)}`;

const strip = spawnSync(process.execPath, [fileURLToPath(new URL("./strip-native-swc.mjs", import.meta.url))], {
  stdio: "inherit",
});

if (strip.status) {
  process.exit(strip.status);
}

const nextBin = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const child = spawn(process.execPath, [nextBin, "build", "--webpack"], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
