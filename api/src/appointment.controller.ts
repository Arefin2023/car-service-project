import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiParam, ApiProperty, ApiResponse } from '@nestjs/swagger';
import {
  AppointmentService,
  AppointmentWithCustomer,
} from './appointment.service';
import { AppointmentEntity, CustomerEntity } from './entities';

class PostAppointmentRequest {
  @ApiProperty({
    example: 1,
    description: 'Customer Id',
  })
  customerId: number;
  @ApiProperty({
    example: 'oil change',
    description: 'Service',
  })
  service: string;
  @ApiProperty({
    description: 'Start date & time',
  })
  start: Date;
  @ApiProperty({
    description: 'End date & time',
  })
  end: Date;
}

export class AppointmentResponse extends AppointmentEntity {
  @ApiProperty({
    example: {
      id: 1,
      email: 'john@doe.com',
      name: 'John Doe',
    },
    description: 'Customer',
    type: CustomerEntity,
  })
  customer: CustomerEntity;
  constructor(appointment: AppointmentWithCustomer) {
    super(appointment);
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
    type: AppointmentEntity,
  })
  createAppointment(
    @Body() appointmentData: PostAppointmentRequest,
  ): Promise<AppointmentEntity> {
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
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Appointment',
    type: AppointmentResponse,
  })
  @ApiParam({
    name: 'id',
    description: 'Appointment Id',
    type: Number,
    example: 1,
  })
  async getAppointment(@Param('id') id: number): Promise<AppointmentResponse> {
    console.log('id', id);
    const appointment = await this.appointmentService.appointment({ id });
    return new AppointmentResponse(appointment);
  }
  @Delete('/:id')
  @ApiResponse({
    status: 204,
    description: 'Appointment deleted',
  })
  @ApiParam({
    name: 'id',
    description: 'Appointment Id',
    type: Number,
    example: 1,
  })
  async deleteAppointment(@Param('id') id: number): Promise<void> {
    await this.appointmentService.deleteAppointment({ id });
  }
}
