import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserLineDto } from './line-dto';
import { LineIntegrateService } from './line-integrate.service';
// import { AuthGuard, UserSession } from '@mguay/nestjs-better-auth';

import { SetMetadata } from '@nestjs/common';
export const Public = () => SetMetadata('isPublic', true);

@Controller('line-integrate')
export class LineIntegrateController {
  constructor(private readonly line: LineIntegrateService) {}

  // create user
  @Post('create')
  createUser(@Body() data: CreateUserLineDto) {
    return this.line.create(data);
  }
}
