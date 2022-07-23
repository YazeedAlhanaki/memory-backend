"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payments = void 0;
const typebox_1 = require("@sinclair/typebox");
const payment_1 = require("../controllers/payment");
const Payment = typebox_1.Type.Object({
    id: typebox_1.Type.String({ format: 'uuid', $id: 'car' }),
    paymentId: typebox_1.Type.String(),
    paymentDate: typebox_1.Type.String(Date),
    rentalId: typebox_1.Type.String(),
    paymentAmount: typebox_1.Type.Number()
});
exports.payments = [];
async function default_1(server) {
    server.route({
        method: 'PUT',
        url: '/payment',
        schema: {
            summary: 'Creates new payment + all properties are required',
            tags: ['payment'],
            body: Payment,
        },
        handler: async (request, reply) => {
            const newPayment = request.body;
            return (0, payment_1.paymentController)(exports.payments, newPayment);
        },
    });
    server.route({
        method: 'PATCH',
        url: '/payment/:id',
        schema: {
            summary: 'Update a payment by id + you dont need to pass all properties',
            tags: ['cars'],
            body: typebox_1.Type.Partial(Payment),
            params: typebox_1.Type.Object({
                id: typebox_1.Type.String({ format: 'uuid' }),
            }),
        },
        handler: async (request, reply) => {
            const newPayment = request.body;
            return (0, payment_1.paymentController)(exports.payments, newPayment);
        },
    });
    server.route({
        method: 'DELETE',
        url: '/payment/:id',
        schema: {
            summary: 'Deletes a payment',
            tags: ['payments'],
            params: typebox_1.Type.Object({
                id: typebox_1.Type.String({ format: 'uuid' }),
            }),
        },
        handler: async (request, reply) => {
            const id = request.params.id;
            exports.payments = exports.payments.filter((c) => c.id !== id);
            return exports.payments;
        },
    });
    server.route({
        method: 'GET',
        url: '/payment/:id',
        schema: {
            summary: 'Returns one payment or null',
            tags: ['payment'],
            params: typebox_1.Type.Object({
                id: typebox_1.Type.String({ format: 'uuid' }),
            }),
            response: {
                '2xx': typebox_1.Type.Union([Payment, typebox_1.Type.Null()]),
            },
        },
        handler: async (request, reply) => {
            const id = request.params.id;
            return exports.payments.find((c) => c.id === id) ?? null;
        },
    });
}
exports.default = default_1;
