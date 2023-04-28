import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from './services/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getHello(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
