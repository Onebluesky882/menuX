import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';

import { OrdersService } from './orders.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateOrderDto, InsertOrders } from './orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() cartItems: CreateOrderDto) {
    console.log('Received createOrderDto:', cartItems);
    return this.ordersService.create(cartItems);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    console.log('id ', id);
    return this.ordersService.getOrderById(id);
  }

  // update
  //@UseGuards(ShopAccessGuard)
  @Patch(':id')
  @Roles('manager', 'staff', 'owner')
  update(
    @Param('id') id: string,
    @Body() body: InsertOrders,
    @Query('shopId') shopId: string,
  ) {
    return this.ordersService.update(id, body, shopId);
  }

  // delete
  //@UseGuards(ShopAccessGuard)
  @Delete(':id')
  @Roles('manager', 'owner')
  delete(@Param('id') id: string, @Query('shopId') shopId: string) {
    return this.ordersService.delete(id, shopId);
  }
}
