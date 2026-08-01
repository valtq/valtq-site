import type { DiscoverySubmission } from '@valtq/types';
import type { FastifyBaseLogger } from 'fastify';
import {
  sanitizeOptionalString,
  sanitizeString,
  sanitizeStringArray,
} from '../../common/utils/index.js';
import type { NotificationService } from '../notifications/index.js';
import type { LeadRepository } from './discovery.repository.js';
import type { ScoringService } from './scoring.service.js';

export type DiscoverySubmitResult = {
  leadId: string;
  score: number;
  status: string;
};

type DiscoveryServiceDeps = {
  leadRepository: LeadRepository;
  scoringService: ScoringService;
  notificationService: NotificationService;
  logger: FastifyBaseLogger;
};

export class DiscoveryService {
  private readonly leadRepository: LeadRepository;
  private readonly scoringService: ScoringService;
  private readonly notificationService: NotificationService;
  private readonly logger: FastifyBaseLogger;

  constructor(deps: DiscoveryServiceDeps) {
    this.leadRepository = deps.leadRepository;
    this.scoringService = deps.scoringService;
    this.notificationService = deps.notificationService;
    this.logger = deps.logger;
  }

  async submit(payload: DiscoverySubmission): Promise<DiscoverySubmitResult> {
    const sanitized = this.sanitizePayload(payload);
    const breakdown = this.scoringService.score({
      budget: sanitized.budget,
      timeline: sanitized.timeline,
      projectType: sanitized.projectType,
      email: sanitized.email,
      website: sanitized.website,
      companySize: sanitized.companySize,
      isDecisionMaker: sanitized.isDecisionMaker,
      urgency: sanitized.urgency,
    });

    const answers = {
      companySize: sanitized.companySize ?? null,
      isDecisionMaker: sanitized.isDecisionMaker ?? null,
      urgency: sanitized.urgency ?? null,
    };

    const lead = await this.leadRepository.create({
      name: sanitized.name,
      email: sanitized.email,
      company: sanitized.company,
      phone: sanitized.phone,
      country: sanitized.country,
      website: sanitized.website,
      projectType: sanitized.projectType,
      budget: sanitized.budget,
      timeline: sanitized.timeline,
      description: sanitized.description,
      features: sanitized.features,
      answers,
      score: breakdown.total,
    });

    this.logger.info(
      { leadId: lead.id, score: lead.score },
      'Discovery submitted',
    );

    // Notifications must not fail the HTTP response after the lead is persisted.
    try {
      await this.notificationService.notifyDiscoverySubmitted({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        company: lead.company,
        phone: lead.phone,
        country: lead.country,
        website: lead.website,
        projectType: lead.projectType,
        budget: lead.budget,
        timeline: lead.timeline,
        description: lead.description,
        features: sanitized.features ?? null,
        score: lead.score,
        companySize: sanitized.companySize ?? null,
        isDecisionMaker: sanitized.isDecisionMaker ?? null,
        urgency: sanitized.urgency ?? null,
      });
    } catch (error) {
      this.logger.error(
        { err: error, leadId: lead.id },
        'Discovery notification pipeline failed',
      );
    }

    return {
      leadId: lead.id,
      score: lead.score,
      status: lead.status,
    };
  }

  private sanitizePayload(payload: DiscoverySubmission): DiscoverySubmission {
    return {
      ...payload,
      name: sanitizeString(payload.name),
      email: sanitizeString(payload.email).toLowerCase(),
      company: sanitizeOptionalString(payload.company),
      phone: sanitizeOptionalString(payload.phone),
      country: sanitizeOptionalString(payload.country),
      website: sanitizeOptionalString(payload.website),
      description: sanitizeString(payload.description),
      features: sanitizeStringArray(payload.features),
    };
  }
}
