import { createRequire } from "node:module";
import { existsSync, rmSync } from "node:fs";
import path from "node:path";

/*
 * require() нативного next-swc.*.node на Hoster.kz убивает процесс (SIGABRT),
 * catch это не ловит. Пакеты нужно убрать с диска до запуска сборки.
 */
const require = createRequire(import.meta.url);

const packages = ["@next/swc-linux-x64-gnu", "@next/swc-linux-x64-musl"];

for (const name of packages) {
  try {
    const pkgJson = require.resolve(`${name}/package.json`);
    rmSync(path.dirname(pkgJson), { recursive: true, force: true });
    console.log(`Removed ${name} (native SWC, glibc on this host is too old)`);
  } catch {
    /* пакет не установлен — ничего делать не нужно */
  }
}

try {
  const nextRoot = path.dirname(require.resolve("next/package.json"));
  const fallback = path.join(nextRoot, "next-swc-fallback");
  if (existsSync(fallback)) {
    rmSync(fallback, { recursive: true, force: true });
    console.log("Removed next/next-swc-fallback");
  }
} catch {
  /* next ещё не установлен */
}
