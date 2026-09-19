import { createRequire } from "node:module";
import { existsSync, rmSync } from "node:fs";
import path from "node:path";

/*
 * require() нативного next-swc.*.node на Hoster.kz убивает процесс (SIGABRT).
 * lightningcss и прочие optional-пакеты не трогаем.
 */
const require = createRequire(import.meta.url);

const packages = ["@next/swc-linux-x64-gnu", "@next/swc-linux-x64-musl"];
const removed = [];

for (const name of packages) {
  try {
    const pkgJson = require.resolve(`${name}/package.json`);
    rmSync(path.dirname(pkgJson), { recursive: true, force: true });
    removed.push(name);
  } catch {
    /* пакет не установлен */
  }
}

try {
  const nextRoot = path.dirname(require.resolve("next/package.json"));
  const fallback = path.join(nextRoot, "next-swc-fallback");
  if (existsSync(fallback)) {
    rmSync(fallback, { recursive: true, force: true });
    removed.push("next/next-swc-fallback");
  }
} catch {
  /* next ещё не установлен */
}

console.log(
  removed.length
    ? `Removed native SWC: ${removed.join(", ")}`
    : "Native linux SWC packages were not present",
);
