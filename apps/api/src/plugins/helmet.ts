import helmet from '@fastify/helmet';
import fp from 'fastify-plugin';
import type { FastifyPluginAsync } from 'fastify';

/**
 * Security headers (CSP, HSTS-ready defaults, XSS protections, etc.).
 */
const helmetPlugin: FastifyPluginAsync = async (app) => {
  await app.register(helmet, {
    // API-only service — CSP is less relevant than for HTML apps.
    contentSecurityPolicy: false,
  });
};

export default fp(helmetPlugin, {
  name: 'helmet',
});
