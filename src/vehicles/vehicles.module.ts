import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';

@Module({
  providers: [VehiclesService, PrismaService],
  exports: [VehiclesService],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
