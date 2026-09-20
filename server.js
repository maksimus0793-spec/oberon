/*
 * Точка входа для хостинга с Node.js (Plesk/Passenger и подобные панели).
 * Панель запускает этот файл, а не команду `next start`, поэтому сервер
 * поднимается вручную. Сайт должен быть предварительно собран: `npm run build`.
 */

const { createServer } = require("node:http");
const next = require("next");

/* WASM-флаг только для сборки. В runtime он мешает Passenger. */
delete process.env.NEXT_TEST_WASM;

/* Passenger подставляет порт сам, значение ниже нужно для обычного запуска. */
const port = Number(process.env.PORT) || 3000;

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => handle(req, res)).listen(port);
  })
  .catch((error) => {
    console.error("Не удалось запустить сайт:", error);
    process.exit(1);
  });
