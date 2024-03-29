import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { PrismaModule } from '../../infra/prisma.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';

@Module({
  imports: [PrismaModule],
  controllers: [AppointmentController, UserController],
  providers: [AppointmentService, AuthService, JwtService, UserService],
})
export class AppointmentModule {}