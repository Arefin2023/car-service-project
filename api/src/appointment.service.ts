import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Appointment, Prisma } from '@prisma/client';

export type AppointmentWithCustomerAndCar = Prisma.AppointmentGetPayload<{
  include: { customer: true; car: true };
}>;

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async appointment(
    appointmentWhereUniqueInput: Prisma.AppointmentWhereUniqueInput,
  ): Promise<AppointmentWithCustomerAndCar | null> {
    return this.prisma.appointment.findUnique({
      where: appointmentWhereUniqueInput,
      include: { customer: true, car: true },
    });
  }

  async appointments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AppointmentWhereUniqueInput;
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithRelationInput;
  }): Promise<AppointmentWithCustomerAndCar[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.appointment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { customer: true, car: true },
    });
  }

  async createAppointment(data: {
    service: string;
    start: Date;
    end: Date;
    customerId: number;
    vehicleId: string;
  }): Promise<Appointment> {
    const { vehicleId, customerId, ...rest } = data;
    return this.prisma.appointment.create({
      data: {
        ...rest,
        customer: { connect: { id: customerId } },
        car: { connect: { vehicleId: vehicleId } },
      },
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
