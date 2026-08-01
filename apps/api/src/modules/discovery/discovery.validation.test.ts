import { describe, expect, it } from 'vitest';
import { DiscoverySubmissionSchema } from '@valtq/types';

describe('DiscoverySubmissionSchema', () => {
  const validPayload = {
    name: 'Jane Doe',
    email: 'jane@acme.com',
    company: 'Acme',
    projectType: 'saas' as const,
    budget: '30k-50k' as const,
    timeline: '2-4-months' as const,
    description: 'We need a scalable SaaS platform for our customers.',
  };

  it('accepts a valid discovery payload', () => {
    const result = DiscoverySubmissionSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = DiscoverySubmissionSchema.safeParse({
      ...validPayload,
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
  });

  it('rejects short description', () => {
    const result = DiscoverySubmissionSchema.safeParse({
      ...validPayload,
      description: 'too short',
    });
    expect(result.success).toBe(false);
  });

  it('accepts optional scoring fields', () => {
    const result = DiscoverySubmissionSchema.safeParse({
      ...validPayload,
      companySize: '51-200',
      isDecisionMaker: true,
      urgency: 'high',
      website: 'https://acme.com',
      phone: '+10000000000',
      country: 'US',
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid website URL', () => {
    const result = DiscoverySubmissionSchema.safeParse({
      ...validPayload,
      website: 'not-a-url',
    });
    expect(result.success).toBe(false);
  });
});
