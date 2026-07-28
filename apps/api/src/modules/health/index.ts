import type { FastifyPluginAsync } from 'fastify';
import { healthRoutes } from './health.routes.js';

/**
 * Health module entry — register this from app.ts.
 */
const healthModule: FastifyPluginAsync = async (app) => {
  await app.register(healthRoutes);
};

export default healthModule;
