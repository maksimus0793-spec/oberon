import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";

const nextBin = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));

function runNextBuild() {
  const child = spawn(process.execPath, [nextBin, "build", "--webpack"], {
    stdio: "inherit",
    env: process.env,
  });

  child.on("exit", (code, signal) => {
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
  delete process.env.NEXT_DISABLE_SWC_WASM;

  const forceWasm = fileURLToPath(new URL("./force-wasm.cjs", import.meta.url));
  const requireFlag = `--require ${JSON.stringify(forceWasm)}`;
  process.env.NODE_OPTIONS = process.env.NODE_OPTIONS ? `${process.env.NODE_OPTIONS} ${requireFlag}` : requireFlag;

  console.log("[oberon-build] Forcing SWC WASM and removing linux native binaries");

  const prepare = spawnSync(process.execPath, [fileURLToPath(new URL("./prepare-host.mjs", import.meta.url))], {
    stdio: "inherit",
  });

  if (prepare.status) {
    process.exit(prepare.status);
  }

  runNextBuild();
}
