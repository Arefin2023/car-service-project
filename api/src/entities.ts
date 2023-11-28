import { ApiProperty } from '@nestjs/swagger';
import { Appointment, Customer } from '@prisma/client';

export class CustomerEntity {
  @ApiProperty({
    description: 'Id',
    example: 1,
  })
  id: number;
  @ApiProperty({
    description: 'userId',
    example: 'user_id_from_clerk',
  })
  userId: string;
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
    this.userId = customer.userId;
    this.email = customer.email;
    this.name = customer.name;
  }
}

export class CarEntity {
  @ApiProperty({
    description: 'Model',
    example: 'Volvo V70',
  })
  model: string;
  @ApiProperty({
    description: 'Vehicle Id',
    example: '12345',
  })
  vehicleId: string;
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
