import fastifyAutoload from '@fastify/autoload';
import fastifySwagger from '@fastify/swagger';
import fastifySensible from '@fastify/sensible';
import { ajvTypeBoxPlugin, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify';
import { join } from 'path';
import fastifyCors from '@fastify/cors';
import bcrypt from 'bcrypt'

export const server = fastify({
	logger: true,
	ajv: {
		customOptions: {
			removeAdditional: 'all',
			ownProperties: true,
		},
		plugins: [ajvTypeBoxPlugin],
	},
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(fastifyCors);


server.register(fastifySwagger, {
	routePrefix: '/docs',
	exposeRoute: true,
	mode: 'dynamic',
	openapi: {
		info: {
			title: 'Car Rental API',
			version: '0.0.1',
		},
		security: [
			{
				bearerAuth: [],
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
	},
});

server.register(fastifySensible);

server.register(fastifyAutoload, {
	dir: join(__dirname, 'routes'),
});

const port: any = process.env.PORT ?? process.env.$PORT ?? 3002;

export function listen() {
	server
		.listen({
			port: port,
			host: '0.0.0.0',
		})
		.catch((err) => {
			server.log.error(err);
			process.exit(1);
		});
}
