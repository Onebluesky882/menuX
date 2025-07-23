import { Controller, Get, Req } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getRoot(@Req() res: Response) {
    return { message: 'Welcome MenuX' };
  }

  @Get('protected')
  getProtected(@Req() req) {
    return {
      message: 'Access granted',
      user: req.user,
    };
  }
}
