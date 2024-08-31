import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('find-by-user')
  async findHomesByUser(
    @Query('userId') userId: number,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 50,
  ) {
    return this.homeService.findHomesByUser(userId, page, pageSize);
  }

  @Post('update-users')
  async updateUsersForHome(
    @Body('homeId') homeId: number,
    @Body('userIds') userIds: number[],
  ) {
    await this.homeService.updateUsersForHome(homeId, userIds);
    return { success: true };
  }
}
