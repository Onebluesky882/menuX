import {
  Controller,
  Req,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { AuthRequest } from 'types/auth';
import { Roles } from 'src/common/decorators/roles.decorator';
import { EmployersService } from './employers.service';
import { EmployersDto } from './employers.dto';

@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}
  // @UseGuards(ShopAccessGuard)
  //create
  @UseGuards(AuthGuard('jwt'))
  @Post('/employer')
  create(
    @Body() body: EmployersDto,
    @Query('shopId') shopId: string,
    @Req() req: AuthRequest,
  ) {
    const userId = req.user.id;
    return this.employersService.create(body, shopId, userId);
  }
  //getAll
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.employersService.getAll();
  }
  // get by id
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.employersService.getById(id);
  }

  // update
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: EmployersDto) {
    return this.employersService.update(id, body);
  }

  // delete
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.employersService.delete(id);
  }
}
