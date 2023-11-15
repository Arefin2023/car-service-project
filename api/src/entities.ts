import { ApiProperty } from '@nestjs/swagger';
import { Appointment, Customer } from '@prisma/client';

export class CustomerEntity {
  @ApiProperty({
    description: 'Id',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'E-Mail',
    example: 'john@doe.com',
  })
  email: string;
  @ApiProperty({
    description: 'Name',
    example: 'John Doe',
  })
  name: string;
  constructor(customer: Customer) {
    this.id = customer.id;
    this.email = customer.email;
    this.name = customer.name;
  }
}

export class AppointmentEntity {
  @ApiProperty({
    description: 'Id',
    example: 1,
  })
  id: number;
  @ApiProperty({
    example: 'oil change',
    description: 'Service',
  })
  service: string;
  @ApiProperty({
    description: 'Start time',
  })
  start: Date;
  @ApiProperty({
    description: 'End time',
  })
  end: Date;

  constructor(appointment: Appointment) {
    this.id = appointment.id;
    this.service = appointment.service;
    this.start = appointment.start;
    this.end = appointment.end;
  }
}
