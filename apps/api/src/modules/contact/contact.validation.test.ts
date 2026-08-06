import { describe, expect, it } from 'vitest';
import { ContactSubmissionSchema } from '@valtq/types';

describe('ContactSubmissionSchema', () => {
  const validPayload = {
    name: 'Jane Doe',
    email: 'jane@acme.com',
    company: 'Acme',
    phone: '+10000000000',
    preferredChannel: 'WhatsApp',
    serviceArea: 'Web application',
    productStage: 'Initial idea',
    productUrl: 'https://acme.com',
    timing: 'As soon as possible',
    budget: '$10k – $25k',
    summary: 'We want a new web application.',
    message: 'We need a team to help design and build our next product from scratch.',
  };

  it('accepts a valid contact payload', () => {
    const result = ContactSubmissionSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('accepts a minimal payload with empty optional fields', () => {
    const result = ContactSubmissionSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@acme.com',
      company: '',
      phone: '',
      preferredChannel: '',
      serviceArea: '',
      productStage: '',
      productUrl: '',
      timing: '',
      budget: '',
      summary: 'We want a new web application.',
      message: 'We need help building our next product from scratch.',
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = ContactSubmissionSchema.safeParse({
      ...validPayload,
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid URL', () => {
    const result = ContactSubmissionSchema.safeParse({
      ...validPayload,
      productUrl: 'not-a-url',
    });
    expect(result.success).toBe(false);
  });

  it('rejects short message', () => {
    const result = ContactSubmissionSchema.safeParse({
      ...validPayload,
      message: 'too short',
    });
    expect(result.success).toBe(false);
  });
});
