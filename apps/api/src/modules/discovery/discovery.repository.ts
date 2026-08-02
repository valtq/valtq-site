import type { Lead, PrismaClient } from '../../generated/prisma/client.js';

export type CreateLeadInput = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  country?: string;
  website?: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  features?: string[];
  answers?: Record<string, unknown>;
  score: number;
  status?: string;
};

export class LeadRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: CreateLeadInput): Promise<Lead> {
    return this.prisma.lead.create({
      data: {
        name: input.name,
        email: input.email.toLowerCase(),
        company: input.company,
        phone: input.phone,
        country: input.country,
        website: input.website,
        projectType: input.projectType,
        budget: input.budget,
        timeline: input.timeline,
        description: input.description,
        features: input.features ? JSON.stringify(input.features) : null,
        answers: input.answers ? JSON.stringify(input.answers) : null,
        score: input.score,
        status: input.status ?? 'new',
      },
    });
  }

  async findById(id: string): Promise<Lead | null> {
    return this.prisma.lead.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<Lead | null> {
    return this.prisma.lead.findFirst({
      where: { email: email.toLowerCase() },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markBooked(leadId: string, bookingId: string): Promise<Lead> {
    return this.prisma.lead.update({
      where: { id: leadId },
      data: {
        booked: true,
        bookingId,
        status: 'booked',
      },
    });
  }
}
