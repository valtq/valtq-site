import Fastify from 'fastify';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './common/middleware/index.js';
import {
  corsPlugin,
  helmetPlugin,
  prismaPlugin,
  rateLimitPlugin,
} from './plugins/index.js';
import healthModule from './modules/health/index.js';

/**
 * Application factory.
 * Builds a fully configured Fastify instance without binding to a port —
 * that responsibility belongs to server.ts (testability + clean separation).
 */
export async function buildApp() {
  const app = Fastify({
    logger: {
      level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
    genReqId: () => crypto.randomUUID(),
    requestIdHeader: 'x-request-id',
  });

  // Infrastructure plugins
  await app.register(corsPlugin);
  await app.register(helmetPlugin);
  await app.register(rateLimitPlugin);
  await app.register(prismaPlugin);

  // Cross-cutting HTTP concerns
  app.setErrorHandler(errorHandler);
  app.setNotFoundHandler(notFoundHandler);

  // Feature modules (foundation: health only)
  await app.register(healthModule);

  return app;
}

export type App = Awaited<ReturnType<typeof buildApp>>;
