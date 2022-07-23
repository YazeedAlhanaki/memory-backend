"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cars = void 0;
const typebox_1 = require("@sinclair/typebox");
const cars_1 = require("../controllers/cars");
const Car = typebox_1.Type.Object({
    id: typebox_1.Type.String({ format: 'uuid', $id: 'car' }),
    name: typebox_1.Type.String(),
    carBrand: typebox_1.Type.String(),
    color: typebox_1.Type.String(),
    capacity: typebox_1.Type.Number(),
    model: typebox_1.Type.Number(),
});
const GetcarQuery = typebox_1.Type.Object({
    name: typebox_1.Type.Optional(typebox_1.Type.String()),
});
exports.cars = [];
async function default_1(server) {
    server.route({
        method: 'PUT',
        url: '/cars',
        schema: {
            summary: 'Creates new car + all properties are required',
            tags: ['cars'],
            body: Car,
        },
        handler: async (request, reply) => {
            const newCar = request.body;
            return (0, cars_1.carsController)(exports.cars, newCar);
        },
    });
    server.route({
        method: 'PATCH',
        url: '/cars/:id',
        schema: {
            summary: 'Update a car by id + you dont need to pass all properties',
            tags: ['cars'],
            body: typebox_1.Type.Partial(Car),
            params: typebox_1.Type.Object({
                id: typebox_1.Type.String({ format: 'uuid' }),
            }),
        },
        handler: async (request, reply) => {
            const newCar = request.body;
            return (0, cars_1.carsController)(exports.cars, newCar);
        },
    });
    server.route({
        method: 'DELETE',
        url: '/cars/:id',
        schema: {
            summary: 'Deletes a car',
            tags: ['cars'],
            params: typebox_1.Type.Object({
                id: typebox_1.Type.String({ format: 'uuid' }),
            }),
        },
        handler: async (request, reply) => {
            const id = request.params.id;
            exports.cars = exports.cars.filter((c) => c.id !== id);
            return exports.cars;
        },
    });
    server.route({
        method: 'GET',
        url: '/cars/:id',
        schema: {
            summary: 'Returns one car or null',
            tags: ['cars'],
            params: typebox_1.Type.Object({
                id: typebox_1.Type.String({ format: 'uuid' }),
            }),
            response: {
                '2xx': typebox_1.Type.Union([Car, typebox_1.Type.Null()]),
            },
        },
        handler: async (request, reply) => {
            const id = request.params.id;
            return exports.cars.find((c) => c.id === id) ?? null;
        },
    });
    server.route({
        method: 'GET',
        url: '/cars',
        schema: {
            summary: 'Gets all cars',
            tags: ['Cars'],
            querystring: GetcarQuery,
            response: {
                '2xx': typebox_1.Type.Array(Car),
            },
        },
        handler: async (request, reply) => {
            const query = request.query;
            if (query.name) {
                return exports.cars.filter((c) => c.name.includes(query.name ?? ''));
            }
            else {
                return exports.cars;
            }
        },
    });
}
exports.default = default_1;
