import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

if (process.platform !== "linux") {
  process.exit(0);
}

const run = (file) => {
  const result = spawnSync(process.execPath, [fileURLToPath(new URL(file, import.meta.url))], {
    stdio: "inherit",
  });
  if (result.status) process.exit(result.status);
};

run("./strip-native-swc.mjs");
run("./patch-next-swc.mjs");
