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
import { CreteProjectDto } from './projects.dto';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '../auth/auth.guard';
import { CommonRequest } from '../utils';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('')
  @UsePipes(new ValidationPipe())
  create(@Body() createProjectDto: CreteProjectDto, @Req() req: CommonRequest) {
    return this.projectsService.createOne(createProjectDto, req.userId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post(':projectId/users/:userId')
  async addUserToProject(
    @Param('projectId') projectId: string,
    @Param('userId') userId: string,
  ) {
    Logger.log(`Adding user ${userId} to project ${projectId}`);
    return this.projectsService.addUserToProject(+projectId, +userId);
  }
}
