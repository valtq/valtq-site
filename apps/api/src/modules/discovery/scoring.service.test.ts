import { describe, expect, it } from 'vitest';
import { SCORE_MAX, SCORE_MIN, ScoringService, SCORING_WEIGHTS } from './scoring.service.js';

describe('ScoringService', () => {
  const service = new ScoringService();

  it('scores a high-intent lead near the top of the range', () => {
    const result = service.score({
      budget: 'OVER_15000_USD',
      timeline: 'MONTHS_1_2',
      projectType: 'saas',
      email: 'cto@acme.com',
      website: 'https://acme.com',
      companySize: '201-1000',
      isDecisionMaker: true,
      urgency: 'high',
    });

    expect(result.total).toBeGreaterThanOrEqual(90);
    expect(result.total).toBeLessThanOrEqual(SCORE_MAX);
    expect(result.budget).toBe(SCORING_WEIGHTS.budget['OVER_15000_USD']);
    expect(result.businessEmail).toBe(SCORING_WEIGHTS.businessEmail);
    expect(result.decisionMaker).toBe(SCORING_WEIGHTS.decisionMaker);
  });

  it('scores a low-intent lead lower', () => {
    const result = service.score({
      budget: 'UNDER_1000_USD',
      timeline: 'OVER_6_MONTHS',
      projectType: 'other',
      email: 'person@gmail.com',
    });

    expect(result.total).toBeGreaterThanOrEqual(SCORE_MIN);
    expect(result.total).toBeLessThan(40);
    expect(result.businessEmail).toBe(0);
    expect(result.website).toBe(0);
  });

  it('never exceeds 0–100 bounds', () => {
    const result = service.score({
      budget: 'OVER_15000_USD',
      timeline: 'MONTHS_1_2',
      projectType: 'saas',
      email: 'ceo@company.io',
      website: 'https://company.io',
      companySize: '1000-plus',
      isDecisionMaker: true,
      urgency: 'high',
    });

    expect(result.total).toBeGreaterThanOrEqual(SCORE_MIN);
    expect(result.total).toBeLessThanOrEqual(SCORE_MAX);
  });
});
