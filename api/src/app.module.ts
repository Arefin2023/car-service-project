import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { CustomerService } from './customer.service';
import { AppointmentService } from './appointment.service';
import { CustomerController } from './customer.controller';
import { AppointmentController } from './appointment.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, CustomerController, AppointmentController],
  providers: [
    AppService,
    PrismaService,
    CustomerService,
    AppointmentService,
    Logger,
  ],
})
export class AppModule {}
