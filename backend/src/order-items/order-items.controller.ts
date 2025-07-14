import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Req,
  Param,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { AuthRequest } from 'types/auth';
import { Roles } from 'src/common/decorators/roles.decorator';
import { OrderItemsService } from './order-items.service';
import { OrderDtoItems } from './order-items.dto';
@UseGuards(AuthGuard('jwt'))
@Controller('shops/:shopId')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  // @UseGuards(ShopAccessGuard)
  @Post()
  @Roles('manager', 'staff', 'owner', 'customer')
  create(@Body() body: OrderDtoItems, @Req() req: AuthRequest) {
    const userId = req.user.id;

    return this.orderItemsService.create(body);
  }
  //getAll
  // @UseGuards(ShopAccessGuard)
  @Get()
  @Roles('customer', 'manager', 'owner')
  getAll() {
    return this.orderItemsService.getAll();
  }
  // get by id
  // @UseGuards(ShopAccessGuard)
  @Roles()
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.orderItemsService.getById(id);
  }

  // update
  // @UseGuards(ShopAccessGuard)
  @Patch(':id')
  @Roles('manager', 'staff', 'owner')
  update(@Param('id') id: string, @Body() body: OrderDtoItems) {
    return this.orderItemsService.update(id, body);
  }

  // delete
  // @UseGuards(ShopAccessGuard)
  @Delete(':id')
  @Roles('manager', 'owner')
  delete(@Param('id') id: string) {
    return this.orderItemsService.delete(id);
  }
}
