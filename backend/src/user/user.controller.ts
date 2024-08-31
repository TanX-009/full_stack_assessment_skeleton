import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('find-all')
  async findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get('find-by-home')
  async findUsersByHome(@Query('homeId') homeId: number) {
    return this.userService.findUsersByHome(homeId);
  }
}
