import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Vehicle } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreteVehicleDto } from './vehicles.dto';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}
  async createOne({ name }: CreteVehicleDto): Promise<Vehicle> {
    return this.prisma.vehicle.create({
      data: {
        name,
      },
    });
  }

  async addVehicleToProject(
    vehicleId: number,
    projectId: number,
    userId: number,
  ) {
    // Check if the user exists
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the project exists
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const isUserAssignedToProject =
      await this.prisma.projectAssigment.findFirst({
        where: {
          userId,
          projectId,
        },
      });

    if (!isUserAssignedToProject) {
      throw new ForbiddenException('User is not assigned to the project');
    }

    return this.prisma.vehicleAssigment.create({
      data: {
        vehicle: {
          connect: {
            id: vehicleId,
          },
        },
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });
  }

  async findVehicleForUser(userId: number, vehicleId: number) {
    const vehicleAssigment = await this.prisma.vehicleAssigment.findFirst({
      where: {
        vehicleId: vehicleId,
        project: {
          projectAssigments: {
            some: {
              userId: userId,
            },
          },
        },
      },
      include: {
        vehicle: true,
      },
    });

    if (!vehicleAssigment) {
      throw new ForbiddenException(
        'User is not assigned to any project with this vehicle or vehicle does not exist',
      );
    }

    return vehicleAssigment.vehicle;
  }

  async updateVehicle(
    userId: number,
    vehicleId: number,
    updateData: Partial<Vehicle>,
  ) {
    await this.findVehicleForUser(userId, vehicleId);
    return this.prisma.vehicle.update({
      where: {
        id: vehicleId,
      },
      data: updateData,
    });
  }

  async deleteVehicle(userId: number, vehicleId: number) {
    await this.findVehicleForUser(userId, vehicleId);
    return this.prisma.vehicle.delete({
      where: {
        id: vehicleId,
      },
    });
  }
}
