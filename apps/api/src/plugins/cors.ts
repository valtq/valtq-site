import cors from '@fastify/cors';
import fp from 'fastify-plugin';
import type { FastifyPluginAsync } from 'fastify';
import { env } from '../config/env.js';

/**
 * Cross-origin access for the Next.js web app (and future clients).
 * Origins are driven by CORS_ORIGIN (comma-separated allowed).
 */
const corsPlugin: FastifyPluginAsync = async (app) => {
  const origins = env.CORS_ORIGIN.split(',').map((origin) => origin.trim());

  await app.register(cors, {
    origin: origins.length === 1 ? origins[0] : origins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
};

export default fp(corsPlugin, {
  name: 'cors',
});
