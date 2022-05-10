import { FastifyPluginAsync } from 'fastify';
import blipp from 'fastify-blipp';
import fastify_cors from '@fastify/cors';
import { main_router } from './routers/main.routers';
import { chores_api } from './chores/chores.api';
import { db_plugin } from './db';

export const main_app: FastifyPluginAsync = async (app) => {
  await app.register(blipp);
  await app.register(fastify_cors);

  await app.register(main_router);
  await app.register(chores_api, { prefix: '/chores' });

  app.register(db_plugin);
  app.blipp();
};
