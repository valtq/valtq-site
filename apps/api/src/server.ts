import { buildApp } from './app.js';
import { env } from './config/env.js';

/**
 * Process entrypoint.
 * Validates env (via import side-effect), boots the app, listens,
 * and handles graceful shutdown.
 */
async function start() {
  const app = await buildApp();

  const shutdown = async (signal: string) => {
    app.log.info(`Received ${signal} — shutting down gracefully`);
    try {
      await app.close();
      process.exit(0);
    } catch (err) {
      app.log.error(err, 'Error during shutdown');
      process.exit(1);
    }
  };

  process.on('SIGINT', () => {
    void shutdown('SIGINT');
  });
  process.on('SIGTERM', () => {
    void shutdown('SIGTERM');
  });

  try {
    await app.listen({ port: env.PORT, host: env.HOST });
    app.log.info(`🚀 API listening on http://${env.HOST}:${env.PORT}`);
  } catch (err) {
    app.log.error(err, 'Failed to start server');
    process.exit(1);
  }
}

void start();
