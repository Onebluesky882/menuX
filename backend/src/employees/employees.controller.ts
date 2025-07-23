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
import { EmployeesDto } from './employees.dto';
import { EmployeesService } from './employees.service';
import { shops } from 'src/database';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  // @UseGuards(ShopAccessGuard)
  //create
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Body() body: EmployeesDto,
    @Query('shopId') shopId: string,
    @Req() req: AuthRequest,
  ) {
    const userId = req.user.id;
    return this.employeesService.create(body, shopId, userId);
  }
  //getAll
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.employeesService.getAll();
  }
  // get by id
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.employeesService.getById(id);
  }

  // update
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: EmployeesDto) {
    return this.employeesService.update(id, body);
  }

  // delete
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.employeesService.delete(id);
  }
}
