import type { FastifyPluginAsync } from 'fastify';
import { createNotificationService } from '../notifications/index.js';
import { createDiscoveryController } from './discovery.controller.js';
import { LeadRepository } from './discovery.repository.js';
import { createDiscoveryRoutes } from './discovery.routes.js';
import { DiscoveryService } from './discovery.service.js';
import { ScoringService } from './scoring.service.js';

/**
 * Discovery module entry — register from app.ts under /api.
 */
const discoveryModule: FastifyPluginAsync = async (app) => {
  const leadRepository = new LeadRepository(app.prisma);
  const scoringService = new ScoringService();
  const notificationService = createNotificationService(app);

  const discoveryService = new DiscoveryService({
    leadRepository,
    scoringService,
    notificationService,
    logger: app.log,
  });

  const controller = createDiscoveryController({ discoveryService });
  await app.register(createDiscoveryRoutes({ controller }));
};

export default discoveryModule;

export { DiscoveryService } from './discovery.service.js';
export { LeadRepository } from './discovery.repository.js';
export { ScoringService } from './scoring.service.js';
export {
  SCORING_WEIGHTS,
  SCORE_MIN,
  SCORE_MAX,
} from './scoring.service.js';
export type { ScoringInput, ScoringBreakdown } from './scoring.service.js';
