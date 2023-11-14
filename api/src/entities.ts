import { ApiProperty } from '@nestjs/swagger';
import { AppointmentWithCustomer } from './appointment.service';

export class CustomerEntity {
  email: string;
  name: string;
  constructor(customer: { email: string; name: string }) {
    this.email = customer.email;
    this.name = customer.name;
  }
}

export class AppointmentEntity {
  @ApiProperty({
    description: 'Id',
  })
  id: number;

  @ApiProperty({
    description: 'Title',
  })
  title: string;
  @ApiProperty({
    description: 'Start time',
  })
  start: Date;
  @ApiProperty({
    description: 'End time',
  })
  end: Date;
  @ApiProperty({
    description: 'Customer',
  })
  customer?: CustomerEntity;

  constructor(appointment: AppointmentWithCustomer) {
    console.log(appointment);
    this.id = appointment.id;
    this.title = appointment.title;
    this.start = appointment.start;
    this.end = appointment.end;
    this.customer = new CustomerEntity(appointment.customer);
  }
}
