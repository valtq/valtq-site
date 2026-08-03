import type {
  CompanySize,
  ProjectBudget,
  ProjectTimeline,
  ProjectType,
  Urgency,
} from '@valtq/types';

/**
 * Configurable scoring weights — no magic numbers in scoring logic.
 * Max theoretical sum is 100.
 */
export const SCORING_WEIGHTS = {
  budget: {
    UNDER_1000_USD: 3,
    USD_1000_3000: 8,
    USD_3000_7500: 12,
    USD_7500_15000: 16,
    OVER_15000_USD: 20,
    NOT_SURE: 5,
  } satisfies Record<ProjectBudget, number>,
  timeline: {
    UNDER_1_MONTH: 15,
    MONTHS_1_2: 13,
    MONTHS_2_4: 10,
    MONTHS_4_6: 7,
    OVER_6_MONTHS: 5,
    NOT_SURE: 5,
  } satisfies Record<ProjectTimeline, number>,
  companySize: {
    '1-10': 4,
    '11-50': 6,
    '51-200': 8,
    '201-1000': 10,
    '1000-plus': 10,
  } satisfies Record<CompanySize, number>,
  businessEmail: 10,
  projectType: {
    website: 6,
    'web-app': 8,
    'mobile-app': 8,
    saas: 10,
    ecommerce: 9,
    other: 5,
  } satisfies Record<ProjectType, number>,
  decisionMaker: 10,
  websiteExists: 10,
  urgency: {
    low: 3,
    medium: 6,
    high: 10,
  } satisfies Record<Urgency, number>,
} as const;

export const SCORE_MIN = 0;
export const SCORE_MAX = 100;

const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'aol.com',
  'protonmail.com',
  'mail.com',
  'live.com',
  'msn.com',
  'yandex.com',
  'gmx.com',
]);

export type ScoringInput = {
  budget: ProjectBudget;
  timeline: ProjectTimeline;
  projectType: ProjectType;
  email: string;
  website?: string;
  companySize?: CompanySize;
  isDecisionMaker?: boolean;
  urgency?: Urgency;
};

export type ScoringBreakdown = {
  budget: number;
  timeline: number;
  companySize: number;
  businessEmail: number;
  projectType: number;
  decisionMaker: number;
  website: number;
  urgency: number;
  total: number;
};

function isBusinessEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) {
    return false;
  }

  return !FREE_EMAIL_DOMAINS.has(domain);
}

function clampScore(value: number): number {
  return Math.max(SCORE_MIN, Math.min(SCORE_MAX, Math.round(value)));
}

/**
 * Rules-based lead scoring engine (0–100).
 */
export class ScoringService {
  score(input: ScoringInput): ScoringBreakdown {
    const budget = SCORING_WEIGHTS.budget[input.budget];
    const timeline = SCORING_WEIGHTS.timeline[input.timeline];
    const projectType = SCORING_WEIGHTS.projectType[input.projectType];
    const companySize = input.companySize ? SCORING_WEIGHTS.companySize[input.companySize] : 0;
    const businessEmail = isBusinessEmail(input.email) ? SCORING_WEIGHTS.businessEmail : 0;
    const decisionMaker = input.isDecisionMaker ? SCORING_WEIGHTS.decisionMaker : 0;
    const website = input.website && input.website.length > 0 ? SCORING_WEIGHTS.websiteExists : 0;
    const urgency = input.urgency ? SCORING_WEIGHTS.urgency[input.urgency] : 0;

    const total = clampScore(
      budget +
        timeline +
        companySize +
        businessEmail +
        projectType +
        decisionMaker +
        website +
        urgency,
    );

    return {
      budget,
      timeline,
      companySize,
      businessEmail,
      projectType,
      decisionMaker,
      website,
      urgency,
      total,
    };
  }
}
