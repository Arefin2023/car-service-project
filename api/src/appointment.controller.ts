import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
// import { Appointment as AppointmentModel } from '@prisma/client';
import { AppointmentWithCustomer } from './appointment.service';
// import { Exclude } from 'class-transformer';

class CustomerEntity {
  email: string;
  name: string;
  constructor(customer: { email: string; name: string }) {
    this.email = customer.email;
    this.name = customer.name;
  }
}

class PostAppointmentRequest {
  @ApiProperty({
    description: 'Customer Id',
  })
  customerId: number;
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
}

class AppointmentResponse {
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

@Controller('/appointments')
export class AppointmentController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
    private readonly appointmentService: AppointmentService,
  ) {}
  @Post('/')
  @ApiResponse({
    status: 201,
    description: 'Appointment created',
    type: AppointmentResponse,
  })
  createAppointment(
    @Body() appointmentData: PostAppointmentRequest,
  ): Promise<AppointmentResponse> {
    const { customerId, ...rest } = appointmentData;
    return this.appointmentService.createAppointment(rest, customerId);
  }
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Appointment list',
    type: [AppointmentResponse],
  })
  async getAppointments(): Promise<AppointmentResponse[]> {
    const appointments = await this.appointmentService.appointments({});
    return appointments.map(
      (appointment) => new AppointmentResponse(appointment),
    );
  }
}
