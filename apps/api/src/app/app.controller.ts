import { Controller, Get, HttpStatus, Res } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('demo')
  getDemoData(@Res() res) {
    const data = this.appService.getDemoData();
    return res.status(HttpStatus.OK).json(data);
  }
}
