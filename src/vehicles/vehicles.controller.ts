import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreteVehicleDto, UpdateVehicleDto } from './vehicles.dto';
import { VehiclesService } from './vehicles.service';
import { AuthGuard } from '../auth/auth.guard';
import { CommonRequest } from '../utils';

@Controller('vehicles')
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('')
  @UsePipes(new ValidationPipe())
  create(@Body() createProjectDto: CreteVehicleDto) {
    return this.vehiclesService.createOne(createProjectDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post(':vehicleId/projects/:projectId')
  async addVehicleToProject(
    @Param('projectId') projectId: string,
    @Param('vehicleId') vehicleId: string,
    @Req() req: CommonRequest,
  ) {
    Logger.log(`Adding vehicle ${vehicleId} to project ${projectId}`);
    return this.vehiclesService.addVehicleToProject(
      +vehicleId,
      +projectId,
      req.userId,
    );
  }

  @Get(':vehicleId')
  @UseGuards(AuthGuard)
  async getVehicle(
    @Param('vehicleId') vehicleId: string,
    @Req() req: CommonRequest,
  ) {
    return this.vehiclesService.findVehicleForUser(req.userId, +vehicleId);
  }

  @Patch(':vehicleId')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateVehicle(
    @Param('vehicleId') vehicleId: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
    @Req() req: CommonRequest,
  ) {
    return this.vehiclesService.updateVehicle(
      req.userId,
      +vehicleId,
      updateVehicleDto,
    );
  }

  @Delete(':vehicleId')
  @UseGuards(AuthGuard)
  async deleteVehicle(
    @Param('vehicleId') vehicleId: string,
    @Req() req: CommonRequest,
  ) {
    return this.vehiclesService.deleteVehicle(req.userId, +vehicleId);
  }
}
