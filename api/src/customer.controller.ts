import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiParam, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { CustomerService, CustomerWithAppointments } from './customer.service';
import { CustomerEntity, AppointmentEntity } from './entities';

class PostCustomerRequest {
  @ApiProperty({
    description: 'E-Mail',
  })
  @Transform(({ value }) => {
    return value.toLowerCase().trim();
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'Name',
  })
  name: string;
}

class CustomerResponse extends CustomerEntity {
  @ApiProperty({
    description: 'Appointments',
    type: [AppointmentEntity],
  })
  appointments: AppointmentEntity[];
  constructor(customer: CustomerWithAppointments) {
    super(customer);
    this.appointments = customer.appointments || [];
  }
}

@Controller('/customers')
export class CustomerController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
    private readonly customerService: CustomerService,
  ) {}
  @Post('/')
  @ApiResponse({
    status: 201,
    description: 'Customer created',
    type: CustomerResponse,
  })
  async createCustomer(
    @Body() customerData: PostCustomerRequest,
  ): Promise<CustomerResponse> {
    const customer = await this.customerService.createCustomer(customerData);
    return new CustomerResponse({ ...customer, appointments: [] });
  }

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'List of customers',
    type: [CustomerResponse],
  })
  async getCustomers(): Promise<CustomerResponse[]> {
    const customers = await this.customerService.customers({});
    return customers.map((customer) => new CustomerResponse(customer));
  }
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Customer',
    type: CustomerResponse,
  })
  @ApiParam({
    name: 'id',
    description: 'Appointment Id',
    type: Number,
    example: 1,
  })
  async getCustomer(@Param('id') id: string): Promise<CustomerResponse> {
    const customer = await this.customerService.customer({ id: Number(id) });
    return new CustomerResponse(customer);
  }
}
