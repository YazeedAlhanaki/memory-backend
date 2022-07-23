"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentals = void 0;
const typebox_1 = require("@sinclair/typebox");
const rental_1 = require("../controllers/rental");
const cars_1 = __importDefault(require("./cars"));
const Rental = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    id: typebox_1.Type.String({ format: 'uuid' }),
    rentalDate: typebox_1.Type.Number(Date),
    returnDate: typebox_1.Type.Number(Date),
    carId: typebox_1.Type.String(cars_1.default),
});
const GetRentalQuery = typebox_1.Type.Object({
    name: typebox_1.Type.Optional(typebox_1.Type.String()),
});
exports.rentals = [];
async function default_1(server) {
    server.route({
        method: 'PUT',
        url: '/rentl',
        schema: {
            summary: 'Creates new rental + all properties are required',
            tags: ['rentals'],
            body: Rental,
        },
        handler: async (request, reply) => {
            const newRental = request.body;
            return (0, rental_1.rentalController)(exports.rentals, newRental);
        },
    });
    server.route({
        method: 'PATCH',
        url: '/rental/:id',
        schema: {
            summary: 'Update a rental by id + you dont need to pass all properties',
            tags: ['rentals'],
            body: typebox_1.Type.Partial(Rental),
            params: typebox_1.Type.Object({
                id: typebox_1.Type.String({ format: 'uuid' }),
            }),
        },
        handler: async (request, reply) => {
            const newRental = request.body;
            return (0, rental_1.rentalController)(exports.rentals, newRental);
        },
    });
    server.route({
        method: 'DELETE',
        url: '/rental/:id',
        schema: {
            summary: 'Deletes a rental',
            tags: ['rentals'],
            params: typebox_1.Type.Object({
                id: typebox_1.Type.String({ format: 'uuid' }),
            }),
        },
        handler: async (request, reply) => {
            const id = request.params.id;
            exports.rentals = exports.rentals.filter((c) => c.id !== id);
            return exports.rentals;
        },
    });
    server.route({
        method: 'GET',
        url: '/rental/:id',
        schema: {
            summary: 'Returns one rental or null',
            tags: ['cars'],
            params: typebox_1.Type.Object({
                id: typebox_1.Type.String({ format: 'uuid' }),
            }),
            response: {
                '2xx': typebox_1.Type.Union([Rental, typebox_1.Type.Null()]),
            },
        },
        handler: async (request, reply) => {
            const id = request.params.id;
            return exports.rentals.find((c) => c.id === id) ?? null;
        },
    });
    server.route({
        method: 'GET',
        url: '/rental',
        schema: {
            summary: 'Gets all rentals',
            tags: ['rentals'],
            querystring: GetRentalQuery,
            response: {
                '2xx': typebox_1.Type.Array(Rental),
            },
        },
        handler: async (request, reply) => {
            const query = request.query;
            if (query.name) {
                return exports.rentals.filter((c) => c.name.includes(query.name ?? ''));
            }
            else {
                return exports.rentals;
            }
        },
    });
}
exports.default = default_1;
