import { Records } from '@prisma/client';
import { Type } from '@sinclair/typebox';
import { ObjectId } from 'bson';
import { FastifyInstance } from 'fastify';
import _ from 'lodash';
import { prismaClient } from '../prisma';

const Records = Type.Object({
	record_id: Type.String(),
	leastMovesEverEasy: Type.Number(),
});

export default async function (server: FastifyInstance) {
	
	server.route({
		method: 'GET',
		url: '/records',
		schema: {
			summary: 'Gets all recores',
			tags: ['Records'],

			response: {
				'2xx': Type.Array(Records),
			},
		},
		handler: async (request, reply) => {
			return await prismaClient.records.findMany();
		},
	});
}
