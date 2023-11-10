import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';

class PostLoginRequest {
  @ApiProperty({
    description: 'E-Mail',
  })
  @Transform(({ value }) => {
    return value.toLowerCase().trim();
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'Password',
  })
  @MinLength(8)
  password: string;
}

class PostLoginResponse {
  userId: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/login')
  @ApiResponse({
    status: 201,
    description: 'Login successful',
    type: PostLoginResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  postLogin(@Body() credentials: PostLoginRequest): PostLoginResponse {
    this.logger.debug({ credentials });
    return { userId: '123' };
  }
}
