import { existsSync, readdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/*
 * require.resolve('@next/swc-linux-*/package.json') на этих пакетах часто
 * не срабатывает из-за exports — тогда нативный .node остаётся и воркеры
 * падают с SIGABRT. Удаляем каталоги по пути.
 */
const root = fileURLToPath(new URL("..", import.meta.url));
const targets = [
  "@next/swc-linux-x64-gnu",
  "@next/swc-linux-x64-musl",
  "@next/swc-linux-arm64-gnu",
  "@next/swc-linux-arm64-musl",
];

const removed = [];

function removeDir(dir) {
  if (!existsSync(dir)) return false;
  rmSync(dir, { recursive: true, force: true });
  return true;
}

for (const name of targets) {
  const dir = path.join(root, "node_modules", ...name.split("/"));
  if (removeDir(dir)) removed.push(name);
}

const nested = path.join(root, "node_modules", "next", "node_modules");
if (existsSync(nested)) {
  for (const name of targets) {
    const dir = path.join(nested, ...name.split("/"));
    if (removeDir(dir)) removed.push(`next/${name}`);
  }
}

const fallback = path.join(root, "node_modules", "next", "next-swc-fallback");
if (removeDir(fallback)) removed.push("next/next-swc-fallback");

function removeNodeBinaries(dir) {
  if (!existsSync(dir)) return;
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry);
    let stat;
    try {
      stat = statSync(full);
    } catch {
      continue;
    }

    if (stat.isDirectory()) {
      if (entry === ".bin" || entry === ".cache") continue;
      removeNodeBinaries(full);
    } else if (entry.startsWith("next-swc.") && entry.endsWith(".node")) {
      rmSync(full, { force: true });
      removed.push(entry);
    }
  }
}

removeNodeBinaries(path.join(root, "node_modules", "@next"));
removeNodeBinaries(path.join(root, "node_modules", "next"));

console.log(
  removed.length
    ? `Removed native SWC: ${removed.join(", ")}`
    : "Native linux SWC packages were not present",
);
