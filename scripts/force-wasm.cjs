/* Подключается только в процессе сборки через NODE_OPTIONS --require.
   Воркеры next build на linux/x64 иначе грузят .node и падают с SIGABRT. */
process.env.NEXT_TEST_WASM = "1";
