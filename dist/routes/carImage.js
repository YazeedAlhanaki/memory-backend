"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carImages = void 0;
const typebox_1 = require("@sinclair/typebox");
const carImage_1 = require("../controllers/carImage");
const cars_1 = __importDefault(require("./cars"));
const carImage = typebox_1.Type.Object({
    id: typebox_1.Type.String({ format: 'uuid', $id: 'user' }),
    imageDescription: typebox_1.Type.String(),
    carId: typebox_1.Type.String(cars_1.default),
});
exports.carImages = [];
async function default_1(server) {
    server.route({
        method: 'PUT',
        url: '/image',
        schema: {
            summary: 'Creates new image + all properties are required',
            tags: ['images'],
            body: carImage,
        },
        handler: async (request, reply) => {
            const newCar = request.body;
            return (0, carImage_1.imageController)(exports.carImages, newCar);
        },
    });
    server.route({
        method: 'PATCH',
        url: '/image/:id',
        schema: {
            summary: 'Update an image by id + you dont need to pass all properties',
            tags: ['images'],
            body: typebox_1.Type.Partial(carImage),
            params: typebox_1.Type.Object({
                id: typebox_1.Type.String({ format: 'uuid' }),
            }),
        },
        handler: async (request, reply) => {
            const newImage = request.body;
            return (0, carImage_1.imageController)(exports.carImages, newImage);
        },
    });
    server.route({
        method: 'DELETE',
        url: '/image/:id',
        schema: {
            summary: 'Deletes a image',
            tags: ['images'],
            params: typebox_1.Type.Object({
                id: typebox_1.Type.String({ format: 'uuid' }),
            }),
        },
        handler: async (request, reply) => {
            const id = request.params.id;
            exports.carImages = exports.carImages.filter((c) => c.id !== id);
            return exports.carImages;
        },
    });
}
exports.default = default_1;
