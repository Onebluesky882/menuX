import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { RolesDto } from './roles.dto';
import { RolesService } from './roles.service';

@UseGuards(AuthGuard('jwt'))
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // create
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: RolesDto) {
    return this.rolesService.create(body);
  }
  //getAll
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll(@Query('shopId') shopId: string) {
    return this.rolesService.getAll(shopId);
  }
  // get by id
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.rolesService.getById(id);
  }

  // update
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: RolesDto) {
    return this.rolesService.update(id, body);
  }

  // delete
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.rolesService.delete(id);
  }
}
