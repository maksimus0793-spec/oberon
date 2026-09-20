/* Подключается в сборке через NODE_OPTIONS --require, в том числе во воркерах.
   На linux/x64 Next игнорирует useWasmBinary и грузит .node — dlopen там
   вызывает abort() из-за glibc < 2.29, исключение поймать нельзя. */
process.env.NEXT_TEST_WASM = "1";
delete process.env.NEXT_DISABLE_SWC_WASM;

const Module = require("module");
const nativeSwc = /next-swc|@next[/\\]swc-linux/;
const originalLoad = Module._load;
const originalDlopen = process.dlopen;

Module._load = function loadWithoutNativeSwc(request, parent, isMain) {
  if (typeof request === "string" && nativeSwc.test(request)) {
    const error = new Error(`Failed to load SWC native binding ${request}: it was not installed`);
    error.code = "MODULE_NOT_FOUND";
    throw error;
  }

  return originalLoad.call(this, request, parent, isMain);
};

process.dlopen = function dlopenBlocked(mod, filename, flags) {
  if (typeof filename === "string" && nativeSwc.test(filename)) {
    const error = new Error(`Failed to load SWC native binding ${filename}: it was not installed`);
    error.code = "MODULE_NOT_FOUND";
    throw error;
  }

  return flags === undefined ? originalDlopen.call(process, mod, filename) : originalDlopen.call(process, mod, filename, flags);
};
