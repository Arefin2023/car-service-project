import {
  Body,
  ConflictException,
  Controller,
  Delete,
  ExecutionContext,
  Get,
  HttpCode,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  Post,
  Req,
  createParamDecorator,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiParam,
  ApiProperty,
  ApiPropertyOptional,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { AppService } from './app.service';
import {
  CustomerService,
  CustomerWithAppointmentsAndCars,
} from './customer.service';
import { AppointmentEntity, CarEntity, CustomerEntity } from './entities';

export const ReqAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.auth;
  },
);

export class PostCustomerRequest {
  @ApiProperty({
    description: 'E-Mail',
    example: 'john@doe.com',
  })
  @Transform(({ value }) => {
    return value.toLowerCase().trim();
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'Name',
    example: 'John Doe',
  })
  name: string;

  @ApiPropertyOptional({
    example: [{ model: 'Volvo V70', vehicleId: '12345' }],
    description: 'Cars',
  })
  cars?: CarEntity[];
}

class CustomerResponse extends CustomerEntity {
  @ApiProperty({
    description: 'Appointments',
    type: [AppointmentEntity],
  })
  appointments: AppointmentEntity[];
  @ApiProperty({
    description: 'Cars',
    type: [CarEntity],
  })
  cars: CarEntity[];
  constructor(customer: CustomerWithAppointmentsAndCars) {
    super(customer);
    this.appointments = customer.appointments || [];
    this.cars = customer.cars || [];
  }
}

@ApiBearerAuth()
@ApiTags('Customers')
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
  @ApiResponse({
    status: 400,
    description: 'Invalid request body',
  })
  @ApiResponse({
    status: 409,
    description: 'Customer email or vehicleId already exists',
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error',
  })
  async createCustomer(
    @Body() customerData: PostCustomerRequest,
  ): Promise<CustomerResponse> {
    try {
      const customer = await this.customerService.createCustomer(customerData);
      return new CustomerResponse({ ...customer, appointments: [], cars: [] });
    } catch (err) {
      console.log(err);
      switch (err.code) {
        case 'P2002':
          const messages = [];
          for (const value of Object.values(err.meta.target)) {
            messages.push(`Conflict: ${value} already exists`);
          }
          throw new ConflictException(messages.join(', '));
        default:
          throw new InternalServerErrorException('Unexpected error');
      }
    }
  }

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'List of customers',
    type: [CustomerResponse],
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error',
  })
  async getCustomers(): Promise<CustomerResponse[]> {
    const customers = await this.customerService.customers({});
    return customers.map((customer) => new CustomerResponse(customer));
  }
  @Get('/profile')
  @ApiResponse({
    status: 200,
    description: 'Customer profile',
    type: CustomerResponse,
  })
  async getCustomerProfile(@Req() req): Promise<void> {
    // const customer = await this.customerService.customer({
    //   id: this.appService.customerId,
    // });
    this.logger.debug('auth', req.auth);
  }
  @Get('/:id')
  @ApiParam({
    name: 'id',
    description: 'Customer Id',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Customer',
    type: CustomerResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Customer not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error',
  })
  async getCustomer(@Param('id') id: string): Promise<CustomerResponse> {
    console.log('id', id);
    try {
      const customer = await this.customerService.customer({ id: Number(id) });
      if (!customer) throw { message: 'customer not found', code: '404' };
      return new CustomerResponse(customer);
    } catch (error) {
      this.logger.error(error);
      switch (error.code) {
        case '404':
          throw new NotFoundException('Customer not found');
        default:
          throw new InternalServerErrorException('Unexpected error');
      }
    }
  }
  @Delete('/:id')
  @ApiResponse({
    status: 204,
    description: 'Customer deleted',
  })
  @ApiResponse({
    status: 404,
    description: "Customer doesn't exist",
  })
  @ApiResponse({
    status: 500,
    description: 'Unexpected error',
  })
  @ApiParam({
    name: 'id',
    description: 'Customer Id',
    type: Number,
    example: 1,
  })
  @HttpCode(204)
  async deleteCustomer(@Param('id') id: number): Promise<void> {
    try {
      await this.customerService.deleteCustomer({ id });
    } catch (err) {
      this.logger.error(err);
      switch (err.code) {
        case 'P2025':
          throw new NotFoundException("Customer doesn't exist");
        default:
          throw new InternalServerErrorException('Unexpected error');
      }
    }
  }
}
