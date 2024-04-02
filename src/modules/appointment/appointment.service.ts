import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { PrismaService } from '../../infra/prisma.service';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAppointmentDto) {
    const doctor = await this.prisma.doctor.findUnique({
      where: {
        id: data.doctorId,
      },
    });
    if (!doctor) {
      throw new NotFoundException('Médico não encontrado');
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.prisma.appointment.create({ data });
  }

  findAll() {
    return this.prisma.appointment.findMany();
  }


  

  async remove(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });
    if (!appointment) {
      throw new NotFoundException('Consulta não encontrada');
    }
    await this.prisma.appointment.delete({
      where: { id },
    });

    return { message: 'Consulta removida com sucesso' };
  }
}
