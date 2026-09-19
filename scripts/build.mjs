import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";

/*
 * На хостинге Hoster.kz glibc старше 2.29. Нативный SWC при загрузке
 * падает с SIGABRT, поэтому сборка идёт через Webpack + WASM-биндинги.
 *
 * NEXT_TEST_WASM должен быть и в воркерах «Collecting page data»:
 * они вызывают installBindings() без флага и иначе снова тянут .node.
 */
process.env.NEXT_TEST_WASM = "1";

const forceWasm = fileURLToPath(new URL("./force-wasm.cjs", import.meta.url));
const previousNodeOptions = process.env.NODE_OPTIONS ?? "";
process.env.NODE_OPTIONS = previousNodeOptions.includes(forceWasm)
  ? previousNodeOptions
  : `${previousNodeOptions} --require ${JSON.stringify(forceWasm)}`.trim();

spawnSync(process.execPath, [fileURLToPath(new URL("./strip-native-swc.mjs", import.meta.url))], {
  stdio: "inherit",
});

const nextBin = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const child = spawn(process.execPath, [nextBin, "build", "--webpack"], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
