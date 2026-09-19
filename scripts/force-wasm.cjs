/* Подключается в каждый процесс Node, включая воркеры next build.
   Иначе на linux/x64 Next грузит нативный SWC и падает с SIGABRT на старой glibc. */
process.env.NEXT_TEST_WASM = "1";
