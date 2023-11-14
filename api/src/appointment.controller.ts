import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
// import { Appointment as AppointmentModel } from '@prisma/client';
import { AppointmentEntity } from './entities';
// import { Exclude } from 'class-transformer';

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
    type: [AppointmentEntity],
  })
  async getAppointments(): Promise<AppointmentEntity[]> {
    const appointments = await this.appointmentService.appointments({});
    return appointments.map(
      (appointment) => new AppointmentEntity(appointment),
    );
  }
}
