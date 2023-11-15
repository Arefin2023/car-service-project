import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiParam, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AppointmentService,
  AppointmentWithCustomerAndCar,
} from './appointment.service';
import { AppointmentEntity, CustomerEntity } from './entities';

class PostAppointmentRequest {
  @ApiProperty({
    example: 1,
    description: 'Customer Id',
  })
  customerId: number;
  @ApiProperty({
    example: '12345',
    description: 'Vehicle Id',
  })
  vehicleId: string;
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
  constructor(appointment: AppointmentWithCustomerAndCar) {
    super(appointment);
    this.customer = new CustomerEntity(appointment.customer);
  }
}

@ApiTags('Appoinments')
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
  @HttpCode(201)
  async createAppointment(
    @Body() appointmentData: PostAppointmentRequest,
  ): Promise<AppointmentEntity> {
    try {
      return await this.appointmentService.createAppointment(appointmentData);
    } catch (err) {
      console.log(err);
      console.log(err.code);
      // this.logger.error(err);
      switch (err.code) {
        case 'P2025':
          throw new NotFoundException(err.meta.cause);
        default:
          throw new InternalServerErrorException('Unexpected error');
      }
    }
  }
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Appointment list',
    type: [AppointmentResponse],
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error',
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
  @ApiResponse({
    status: 404,
    description: 'Appointment not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error',
  })
  @ApiParam({
    name: 'id',
    description: 'Appointment Id',
    type: Number,
    example: 1,
  })
  async getAppointment(@Param('id') id: number): Promise<AppointmentResponse> {
    console.log('id', id);
    try {
      const appointment = await this.appointmentService.appointment({ id });
      if (!appointment) throw { message: 'appointment not found', code: '404' };
      return new AppointmentResponse(appointment);
    } catch (error) {
      switch (error.code) {
        case '404':
          throw new NotFoundException('Appointment not found');
        default:
          throw new InternalServerErrorException('Unexpected error');
      }
    }
  }
  @Delete('/:id')
  @ApiResponse({
    status: 204,
    description: 'Appointment deleted',
  })
  @ApiResponse({
    status: 404,
    description: "Appointment doesn't exist",
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error',
  })
  @ApiParam({
    name: 'id',
    description: 'Appointment Id',
    type: Number,
    example: 1,
  })
  async deleteAppointment(@Param('id') id: number): Promise<void> {
    try {
      await this.appointmentService.deleteAppointment({ id });
    } catch (err) {
      console.log(err);
      switch (err.code) {
        case 'P2025':
          throw new NotFoundException("Appointment doesn't exist");
        default:
          throw new InternalServerErrorException('Unexpected error');
      }
    }
  }
}
