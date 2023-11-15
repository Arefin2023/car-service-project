import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Customer, Prisma } from '@prisma/client';

export type CustomerWithAppointments = Prisma.CustomerGetPayload<{
  include: { appointments: true };
}>;
@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async customer(
    customerWhereUniqueInput: Prisma.CustomerWhereUniqueInput,
  ): Promise<CustomerWithAppointments | null> {
    return this.prisma.customer.findUnique({
      where: customerWhereUniqueInput,
      include: { appointments: true },
    });
  }

  async customers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CustomerWhereUniqueInput;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput;
  }): Promise<CustomerWithAppointments[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { appointments: true },
    });
  }

  async createCustomer(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this.prisma.customer.create({
      data,
    });
  }

  async updateCustomer(params: {
    where: Prisma.CustomerWhereUniqueInput;
    data: Prisma.CustomerUpdateInput;
  }): Promise<Customer> {
    const { where, data } = params;
    return this.prisma.customer.update({
      data,
      where,
    });
  }

  async deleteCustomer(
    where: Prisma.CustomerWhereUniqueInput,
  ): Promise<Customer> {
    return this.prisma.customer.delete({
      where,
    });
  }
}
