import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  providers: [ProjectsService, PrismaService],
  exports: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
