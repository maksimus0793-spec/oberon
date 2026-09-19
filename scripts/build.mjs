import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";

/*
 * На хостинге Hoster.kz glibc старше 2.29. Нативный SWC при загрузке
 * падает с SIGABRT, поэтому сборка идёт через Webpack + WASM-биндинги.
 *
 * Нельзя прокидывать --require в NODE_OPTIONS: Next склеивает флаги
 * воркеров в один путь и падает с MODULE_NOT_FOUND.
 * WASM включается переменной NEXT_TEST_WASM (её же ставит next.config.mjs).
 */
process.env.NEXT_TEST_WASM = "1";

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
