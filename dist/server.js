"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const autoload_1 = __importDefault(require("@fastify/autoload"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
const fastify_1 = __importDefault(require("fastify"));
const path_1 = require("path");
exports.server = (0, fastify_1.default)({
    logger: true,
    ajv: {
        customOptions: {
            removeAdditional: 'all',
            ownProperties: true,
        },
        plugins: [type_provider_typebox_1.ajvTypeBoxPlugin],
    },
}).withTypeProvider();
exports.server.register(swagger_1.default, {
    routePrefix: '/docs',
    exposeRoute: true,
    mode: 'dynamic',
    openapi: {
        info: {
            title: 'carRental API',
            version: '0.0.1',
        },
    },
});
exports.server.register(autoload_1.default, {
    dir: (0, path_1.join)(__dirname, 'routes'),
});
