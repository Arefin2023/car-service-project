import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Appointment, Prisma } from '@prisma/client';

export type AppointmentWithCustomer = Prisma.AppointmentGetPayload<{
  include: { customer: true };
}>;

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async appointment(
    appointmentWhereUniqueInput: Prisma.AppointmentWhereUniqueInput,
  ): Promise<AppointmentWithCustomer | null> {
    return this.prisma.appointment.findUnique({
      where: appointmentWhereUniqueInput,
      include: { customer: true },
    });
  }

  async appointments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AppointmentWhereUniqueInput;
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithRelationInput;
  }): Promise<AppointmentWithCustomer[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.appointment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { customer: true },
    });
  }

  async createAppointment(
    data: Prisma.AppointmentCreateWithoutCustomerInput,
    customerId: number,
  ): Promise<Appointment> {
    return this.prisma.appointment.create({
      data: { ...data, customer: { connect: { id: customerId } } },
    });
  }

  async updateAppointment(params: {
    where: Prisma.AppointmentWhereUniqueInput;
    data: Prisma.AppointmentUpdateInput;
  }): Promise<Appointment> {
    const { data, where } = params;
    return this.prisma.appointment.update({
      data,
      where,
    });
  }

  async deleteAppointment(
    where: Prisma.AppointmentWhereUniqueInput,
  ): Promise<Appointment> {
    return this.prisma.appointment.delete({
      where,
    });
  }
}
