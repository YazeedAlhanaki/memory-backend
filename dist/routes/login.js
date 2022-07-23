"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function default_1(server) {
    server.get('/login', async (request, reply) => {
        return 'hi';
    });
    server.get('/verify', async (request, reply) => {
        return 'hi';
    });
}
exports.default = default_1;
