/* Подключается в сборке через NODE_OPTIONS --require, в том числе во воркерах.
   На linux/x64 Next игнорирует useWasmBinary и грузит .node — dlopen там
   вызывает abort() из-за glibc < 2.29, исключение поймать нельзя. */
process.env.NEXT_TEST_WASM = "1";
delete process.env.NEXT_DISABLE_SWC_WASM;

const Module = require("module");
const originalLoad = Module._load;
const originalDlopen = process.dlopen;
// #region agent log
const debugLog = require("./debug-log.cjs");
let loggedNativeBlock = false;
let loggedLoaderAllow = false;
// #endregion

function isNativeSwc(request) {
  if (typeof request !== "string") return false;
  if (request.includes("next-swc-loader")) return false;
  return (
    /@next[/\\]swc-linux/.test(request) ||
    /next-swc\.[^/\\]+\.node(?:$|\?)/.test(request) ||
    request.includes("next-swc-fallback")
  );
}

function blockNative(request) {
  // #region agent log
  if (!loggedNativeBlock) {
    loggedNativeBlock = true;
    debugLog("scripts/force-wasm.cjs", "blocked native SWC load", { request, pid: process.pid }, "D");
  }
  // #endregion
  const error = new Error(`Failed to load SWC native binding ${request}: it was not installed`);
  error.code = "MODULE_NOT_FOUND";
  throw error;
}

Module._load = function loadWithoutNativeSwc(request, parent, isMain) {
  if (isNativeSwc(request)) {
    blockNative(request);
  }

  // #region agent log
  if (typeof request === "string" && request.includes("next-swc-loader") && !loggedLoaderAllow) {
    loggedLoaderAllow = true;
    debugLog("scripts/force-wasm.cjs", "allowed next-swc-loader", { request, pid: process.pid }, "F");
  }
  // #endregion

  return originalLoad.call(this, request, parent, isMain);
};

process.dlopen = function dlopenBlocked(mod, filename, flags) {
  if (isNativeSwc(filename)) {
    blockNative(filename);
  }

  return flags === undefined ? originalDlopen.call(process, mod, filename) : originalDlopen.call(process, mod, filename, flags);
};
