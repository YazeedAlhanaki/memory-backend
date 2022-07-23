"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const port = process.env.PORT ?? process.env.$PORT ?? 3002;
server_1.server
    .listen({
    port: port,
    host: '0.0.0.0',
})
    .catch((err) => {
    server_1.server.log.error(err);
    process.exit(1);
});
