import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { CustomerService } from './customer.service';
import { Customer as CustomerModel } from '@prisma/client';

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

class CustomerResponse implements CustomerModel {
  @ApiProperty({
    description: 'Id',
  })
  id: number;
  @ApiProperty({
    description: 'E-Mail',
  })
  email: string;
  @ApiProperty({
    description: 'Name',
  })
  name: string;
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
  createCustomer(
    @Body() customerData: PostCustomerRequest,
  ): Promise<CustomerResponse> {
    return this.customerService.createCustomer(customerData);
  }

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'List of customers',
    type: [CustomerResponse],
  })
  getCustomers(): Promise<CustomerResponse[]> {
    return this.customerService.customers({});
  }
}
