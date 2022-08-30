import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/listUser')
  async getListUser(@Res() res) {
    const listData = await fetch(
      'https://medex-backend-staging.up.railway.app/api/v1/user/all',
    );
    const { data } = await listData.json();

    return res.json(data);
  }
}
