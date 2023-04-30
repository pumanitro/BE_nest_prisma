import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getHello(): Promise<string> {
    return 'Welcome to the API';
  }
}
