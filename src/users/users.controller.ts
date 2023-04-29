import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignUpDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @UsePipes(new ValidationPipe())
  signIn(@Body() signUpDto: SignUpDto) {
    return this.usersService.create(signUpDto.email, signUpDto.password);
  }
}
