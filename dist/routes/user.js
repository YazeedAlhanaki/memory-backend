"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const typebox_1 = require("@sinclair/typebox");
const user_1 = require("../controllers/user");
const user = typebox_1.Type.Object({
    id: typebox_1.Type.String({ format: 'uuid', $id: 'user' }),
    name: typebox_1.Type.String(),
    password: typebox_1.Type.String(),
});
exports.users = [];
async function default_1(server) {
    server.route({
        method: 'PUT',
        url: '/user',
        schema: {
            summary: 'Creates new user + all properties are required',
            tags: ['user'],
            body: user,
        },
        handler: async (request, reply) => {
            const newuser = request.body;
            return (0, user_1.userController)(exports.users, newuser);
        },
    });
    server.route({
        method: 'PATCH',
        url: '/user/:id',
        schema: {
            summary: 'Update a user by id + you dont need to pass all properties',
            tags: ['users'],
            body: typebox_1.Type.Partial(user),
            params: typebox_1.Type.Object({
                id: typebox_1.Type.String({ format: 'uuid' }),
            }),
        },
        handler: async (request, reply) => {
            const newuser = request.body;
            return (0, user_1.userController)(exports.users, newuser);
        },
    });
    server.route({
        method: 'GET',
        url: '/users/:id',
        schema: {
            summary: 'Returns one users or null',
            tags: ['users'],
            params: typebox_1.Type.Object({
                id: typebox_1.Type.String({ format: 'uuid' }),
            }),
            response: {
                '2xx': typebox_1.Type.Union([user, typebox_1.Type.Null()]),
            },
        },
        handler: async (request, reply) => {
            const id = request.params.id;
            return exports.users.find((c) => c.id === id) ?? null;
        },
    });
}
exports.default = default_1;
