"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviews = void 0;
const typebox_1 = require("@sinclair/typebox");
const carReview_1 = require("../controllers/carReview");
const user_1 = __importDefault(require("./user"));
const cars_1 = __importDefault(require("./cars"));
const CarReview = typebox_1.Type.Object({
    id: typebox_1.Type.String({ format: 'uuid' }),
    review: typebox_1.Type.String(),
    ReviewScore: typebox_1.Type.Number(),
    date: typebox_1.Type.Integer(Date),
    customerId: typebox_1.Type.String(user_1.default),
    carId: typebox_1.Type.String(cars_1.default)
});
const GetreviewQuery = typebox_1.Type.Object({
    name: typebox_1.Type.Optional(typebox_1.Type.String()),
});
exports.reviews = [];
async function default_1(server) {
    server.route({
        method: 'PUT',
        url: '/review',
        schema: {
            summary: 'Creates new review + all properties are required',
            tags: ['reviews'],
            body: CarReview,
        },
        handler: async (request, reply) => {
            const newReview = request.body;
            return (0, carReview_1.reviewController)(exports.reviews, newReview);
        },
    });
    server.route({
        method: 'PATCH',
        url: '/review/:id',
        schema: {
            summary: 'Update a review by id + you dont need to pass all properties',
            tags: ['reviews'],
            body: typebox_1.Type.Partial(CarReview),
            params: typebox_1.Type.Object({
                id: typebox_1.Type.String({ format: 'uuid' }),
            }),
        },
        handler: async (request, reply) => {
            const newReview = request.body;
            return (0, carReview_1.reviewController)(exports.reviews, newReview);
        },
    });
    server.route({
        method: 'GET',
        url: '/reviews/:id',
        schema: {
            summary: 'Returns one review or null',
            tags: ['reviews'],
            params: typebox_1.Type.Object({
                id: typebox_1.Type.String({ format: 'uuid' }),
            }),
            response: {
                '2xx': typebox_1.Type.Union([CarReview, typebox_1.Type.Null()]),
            },
        },
        handler: async (request, reply) => {
            const id = request.params.id;
            return exports.reviews.find((c) => c.id === id) ?? null;
        },
    });
    server.route({
        method: 'DELETE',
        url: '/review/:id',
        schema: {
            summary: 'Deletes a review',
            tags: ['reviews'],
            params: typebox_1.Type.Object({
                id: typebox_1.Type.String({ format: 'uuid' }),
            }),
        },
        handler: async (request, reply) => {
            const id = request.params.id;
            exports.reviews = exports.reviews.filter((c) => c.id !== id);
            return exports.reviews;
        },
    });
    server.route({
        method: 'GET',
        url: '/reviews',
        schema: {
            summary: 'Gets all reviews',
            tags: ['reviews'],
            querystring: GetreviewQuery,
            response: {
                '2xx': typebox_1.Type.Array(CarReview),
            },
        },
        handler: async (request, reply) => {
            const query = request.query;
            if (query.name) {
                return exports.reviews.filter((c) => c.review.includes(query.name ?? ''));
            }
            else {
                return exports.reviews;
            }
        },
    });
}
exports.default = default_1;
