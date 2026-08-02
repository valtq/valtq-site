import Fastify from 'fastify';
import type { IncomingMessage, ServerResponse } from 'node:http';
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

function createApp() {
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
  app.register(corsPlugin);
  app.register(helmetPlugin);
  app.register(rateLimitPlugin);
  app.register(prismaPlugin);

  // Cross-cutting HTTP concerns
  app.setErrorHandler(errorHandler);
  app.setNotFoundHandler(notFoundHandler);

  // Feature modules
  app.register(healthModule);
  app.register(discoveryModule, { prefix: '/api' });
  app.register(bookingModule, { prefix: '/api' });

  return app;
}

/**
 * Application factory.
 * Builds a fully configured Fastify instance without binding to a port —
 * that responsibility belongs to server.ts (testability + clean separation).
 */
export async function buildApp() {
  return createApp();
}

export type App = Awaited<ReturnType<typeof buildApp>>;

/**
 * Vercel Function entrypoint.
 * Vercel's Fastify launcher requires a default export that is a function or
 * server. This handler bridges the raw Node request/response into Fastify.
 */
const app = createApp();

export default async function handler(
  req: IncomingMessage,
  reply: ServerResponse,
) {
  await app.ready();
  app.server.emit('request', req, reply);
}

