import { PrismaClient } from '@prisma/client';
import fp from 'fastify-plugin';
import type { FastifyPluginAsync } from 'fastify';
import { env } from '../config/env.js';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

/**
 * Prisma client lifecycle plugin.
 * Decorates `app.prisma` and disconnects cleanly on shutdown.
 * SQLite is configured via DATABASE_URL in prisma/schema.prisma.
 */
const prismaPlugin: FastifyPluginAsync = async (app) => {
  const prisma = new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

  await prisma.$connect();

  app.decorate('prisma', prisma);

  app.addHook('onClose', async (instance) => {
    await instance.prisma.$disconnect();
  });
};

export default fp(prismaPlugin, {
  name: 'prisma',
});
