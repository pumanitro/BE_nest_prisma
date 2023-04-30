import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreteProjectDto } from './projects.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}
  async createOne({ name }: CreteProjectDto, userId: number): Promise<Project> {
    return this.prisma.project.create({
      data: {
        name,
        userId,
      },
    });
  }
}
