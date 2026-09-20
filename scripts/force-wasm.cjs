/* Подключается только во время сборки через NODE_OPTIONS --require.
   Иначе воркеры next build на linux/x64 грузят .node и падают с SIGABRT. */
process.env.NEXT_TEST_WASM = "1";
