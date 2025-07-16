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
import { InsertOrders } from './orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() cartItems: InsertOrders[]) {
    const ordersToInsert = cartItems.map((item) => ({
      ...item,
    }));
    console.log('📦 ordersToInsert:', ordersToInsert);
    return this.ordersService.create(ordersToInsert);
  }

  //getAll
  //@UseGuards(ShopAccessGuard)
  @Get()
  getAll(@Query('shopId') shopId: string) {
    return this.ordersService.getAll(shopId);
  }
  // get by id
  //@UseGuards(ShopAccessGuard)
  @Roles()
  @Get(':id')
  getById(@Param('id') id: string, @Query('shopId') shopId: string) {
    return this.ordersService.getById(id, shopId);
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
