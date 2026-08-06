import type { ContactInquiry, PrismaClient } from '../../generated/prisma/client.js';

export type CreateContactInquiryInput = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  preferredChannel?: string;
  serviceArea?: string;
  productStage?: string;
  productUrl?: string;
  timing?: string;
  budget?: string;
  summary: string;
  message: string;
  status?: string;
};

export class ContactInquiryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(input: CreateContactInquiryInput): Promise<ContactInquiry> {
    return this.prisma.contactInquiry.create({
      data: {
        name: input.name,
        email: input.email.toLowerCase(),
        company: input.company,
        phone: input.phone,
        preferredChannel: input.preferredChannel,
        serviceArea: input.serviceArea,
        productStage: input.productStage,
        productUrl: input.productUrl,
        timing: input.timing,
        budget: input.budget,
        summary: input.summary,
        message: input.message,
        status: input.status ?? 'new',
      },
    });
  }
}
