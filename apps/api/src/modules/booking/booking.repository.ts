import type { Booking, PrismaClient } from '../../generated/prisma/client.js';

export type CreateBookingInput = {
  leadId: string;
  calBookingId: string;
  eventType: string;
  startsAt: Date;
  endsAt: Date;
};

export class BookingRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByCalBookingId(calBookingId: string): Promise<Booking | null> {
    return this.prisma.booking.findUnique({
      where: { calBookingId },
    });
  }

  async create(input: CreateBookingInput): Promise<Booking> {
    return this.prisma.booking.create({
      data: {
        leadId: input.leadId,
        calBookingId: input.calBookingId,
        eventType: input.eventType,
        startsAt: input.startsAt,
        endsAt: input.endsAt,
      },
    });
  }
}
