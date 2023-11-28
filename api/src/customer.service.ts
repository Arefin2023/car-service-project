import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Customer, Prisma } from '@prisma/client';

import { PostCustomerRequest } from './customer.controller';

export type CustomerWithAppointmentsAndCars = Prisma.CustomerGetPayload<{
  include: { appointments: true; cars: true };
}>;
@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async customer(
    customerWhereUniqueInput: Prisma.CustomerWhereUniqueInput,
  ): Promise<CustomerWithAppointmentsAndCars | null> {
    return this.prisma.customer.findUnique({
      where: customerWhereUniqueInput,
      include: { appointments: true, cars: true },
    });
  }

  async customers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CustomerWhereUniqueInput;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput;
  }): Promise<CustomerWithAppointmentsAndCars[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { appointments: true, cars: true },
    });
  }

  async createCustomer(
    data: PostCustomerRequest & { userId: string },
  ): Promise<CustomerWithAppointmentsAndCars> {
    const { cars = [], ...rest } = data;
    return this.prisma.customer.create({
      data: {
        ...rest,
        cars: {
          create: cars,
        },
      },
      include: { appointments: true, cars: true },
    });
  }

  async updateCustomer(params: {
    where: Prisma.CustomerWhereUniqueInput;
    data: Prisma.CustomerUpdateInput;
  }): Promise<Customer> {
    const { where, data } = params;
    const { userId, ...rest } = data;
    return this.prisma.customer.upsert({
      create: {
        email: data.email as string,
        name: data.name as string,
        userId: userId as string,
      },
      update: rest,
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
