/*
 * Точка входа для хостинга с Node.js (Plesk/Passenger и подобные панели).
 * Панель запускает этот файл, а не команду `next start`, поэтому сервер
 * поднимается вручную. Сайт должен быть предварительно собран: `npm run build`.
 */

const { createServer } = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

function debugLog(hypothesisId, location, message, data) {
  const payload = {
    sessionId: "fd0969",
    runId: "post-rollback",
    hypothesisId,
    location,
    message,
    data,
    timestamp: Date.now(),
  };
  const line = `${JSON.stringify(payload)}\n`;
  // #region agent log
  fetch("http://127.0.0.1:7406/ingest/cbc648cf-0771-40b7-b18b-4d45ebcc462f", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "fd0969" },
    body: JSON.stringify(payload),
  }).catch(() => {});
  try {
    fs.appendFileSync(path.join(__dirname, "debug-fd0969.log"), line);
    fs.appendFileSync(path.join(__dirname, "public", "debug-fd0969.log"), line);
  } catch {
    /* public может быть недоступен */
  }
  console.log("[debug-fd0969]", line.trim());
  // #endregion
}

function pathExists(rel) {
  try {
    return fs.existsSync(path.join(__dirname, rel));
  } catch {
    return false;
  }
}

const port = Number(process.env.PORT) || 3000;

debugLog("F", "server.js:boot", "startup snapshot after rollback", {
  cwd: process.cwd(),
  dirname: __dirname,
  node: process.version,
  nodeEnv: process.env.NODE_ENV ?? null,
  port,
  nextTestWasm: process.env.NEXT_TEST_WASM ?? null,
  hasNextDir: pathExists(".next"),
  hasBuildId: pathExists(".next/BUILD_ID"),
  hasPrerender: pathExists(".next/prerender-manifest.json"),
  hasLinuxSwc: pathExists("node_modules/@next/swc-linux-x64-gnu"),
  hasWasmSwc: pathExists("node_modules/@next/swc-wasm-nodejs"),
});

if (process.env.NEXT_TEST_WASM) {
  debugLog("J", "server.js:boot", "NEXT_TEST_WASM is set in runtime env", {
    value: String(process.env.NEXT_TEST_WASM),
  });
} else {
  debugLog("J", "server.js:boot", "NEXT_TEST_WASM is not set", {});
}

let next;
try {
  next = require("next");
  debugLog("H", "server.js:require", "require(next) succeeded", {});
} catch (error) {
  debugLog("H", "server.js:require", "require(next) failed", {
    name: error?.name,
    message: error?.message,
    stack: error?.stack?.split("\n").slice(0, 8),
  });
  throw error;
}

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

debugLog("G", "server.js:prepare", "calling app.prepare()", {
  hasBuildId: pathExists(".next/BUILD_ID"),
});

app
  .prepare()
  .then(() => {
    debugLog("F", "server.js:prepare", "app.prepare() succeeded", {
      hasBuildId: pathExists(".next/BUILD_ID"),
    });
    createServer((req, res) => handle(req, res)).listen(port, () => {
      debugLog("I", "server.js:listen", "http server listening", { port });
    });
  })
  .catch((error) => {
    debugLog("G", "server.js:prepare", "app.prepare() failed", {
      name: error?.name,
      message: error?.message,
      stack: error?.stack?.split("\n").slice(0, 12),
    });
    console.error("Не удалось запустить сайт:", error);
    process.exit(1);
  });
