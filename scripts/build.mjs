import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

/*
 * На хостинге Hoster.kz glibc старше 2.29. Нативный SWC при загрузке
 * падает с SIGABRT, поэтому сборка идёт через Webpack + WASM-биндинги.
 *
 * Переменную ставим только в процессе сборки. В runtime её быть не должно:
 * иначе Next требует WASM-биндинги на каждом запросе и Passenger отдаёт 500.
 */
process.env.NEXT_TEST_WASM = "1";

const nextBin = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const child = spawn(process.execPath, [nextBin, "build", "--webpack"], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
