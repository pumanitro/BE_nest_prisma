import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreteVehicleDto } from './vehicles.dto';
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
  async addUserToProject(
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
}
