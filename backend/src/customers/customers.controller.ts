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
import { CustomerService } from './customers.service';
import { CustomerDto } from './customers.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  //create
  @UseGuards(AuthGuard('jwt'))
  @Post('')
  create(@Body() body: CustomerDto, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.customerService.create(body, userId);
  }
  //getAll
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.customerService.getAll();
  }
  // get by id
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.customerService.getById(id);
  }

  // update
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: CustomerDto) {
    return this.customerService.update(id, body);
  }

  // delete
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customerService.delete(id);
  }
}
