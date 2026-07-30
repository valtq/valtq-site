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
import discoveryModule from './modules/discovery/index.js';
import bookingModule from './modules/booking/index.js';

declare module 'fastify' {
  interface FastifyRequest {
    /** Raw request body string — required for Cal.com HMAC verification. */
    rawBody?: string;
  }
}

/**
 * Application factory.
 * Builds a fully configured Fastify instance without binding to a port —
 * that responsibility belongs to server.ts (testability + clean separation).
 */
export async function buildApp() {
  const app = Fastify({
    logger: {
      level:
        env.NODE_ENV === 'test'
          ? 'silent'
          : env.NODE_ENV === 'production'
            ? 'info'
            : 'debug',
    },
    genReqId: () => crypto.randomUUID(),
    requestIdHeader: 'x-request-id',
  });

  // Capture raw body for webhook signature verification
  app.addContentTypeParser(
    'application/json',
    { parseAs: 'string' },
    (request, body, done) => {
      const raw = typeof body === 'string' ? body : body.toString('utf8');
      request.rawBody = raw;

      if (raw.length === 0) {
        done(null, {});
        return;
      }

      try {
        done(null, JSON.parse(raw) as unknown);
      } catch (error) {
        done(error as Error, undefined);
      }
    },
  );

  // Infrastructure plugins
  await app.register(corsPlugin);
  await app.register(helmetPlugin);
  await app.register(rateLimitPlugin);
  await app.register(prismaPlugin);

  // Cross-cutting HTTP concerns
  app.setErrorHandler(errorHandler);
  app.setNotFoundHandler(notFoundHandler);

  // Feature modules
  await app.register(healthModule);
  await app.register(discoveryModule, { prefix: '/api' });
  await app.register(bookingModule, { prefix: '/api' });

  return app;
}

export type App = Awaited<ReturnType<typeof buildApp>>;
