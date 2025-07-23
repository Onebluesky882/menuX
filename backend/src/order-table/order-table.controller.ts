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
import { OrderTableService } from './order-table.service';
import { OrderTableDto } from './order-table.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
@UseGuards(AuthGuard('jwt'))
@Controller('order-table')
export class OrderTableController {
  constructor(private readonly orderTableService: OrderTableService) {}
  // @UseGuards(ShopAccessGuard)
  //create
  @Post('/:shopId/order-table')
  @Roles('customer', 'manager', 'owner', 'staff')
  create(
    @Body() body: OrderTableDto,
    @Req() req: AuthRequest,
    @Query('isSession') isSession: string,
    @Query('shopId') shopId: string,
  ) {
    const userId = req.user.id;
    const isSessionBool = isSession === 'true';
    return this.orderTableService.create(body, shopId, userId, isSessionBool);
  }
  //getAll
  // @UseGuards(ShopAccessGuard)
  @Get()
  getAll(@Query('shopId') shopId: string) {
    return this.orderTableService.getAll(shopId);
  }
  // get by id
  // @UseGuards(ShopAccessGuard)
  @Get(':id')
  getById(@Param('id') id: string, @Query('shopId') shopId: string) {
    return this.orderTableService.getById(id, shopId);
  }

  // update
  // @UseGuards(ShopAccessGuard)
  @Patch(':id')
  @Roles('manager', 'owner')
  update(
    @Param('id') id: string,
    @Body() body: OrderTableDto,
    @Query('shopId') shopId: string,
  ) {
    return this.orderTableService.update(id, body, shopId);
  }

  // delete
  // @UseGuards(ShopAccessGuard)
  @Delete(':id')
  @Roles('manager', 'owner')
  delete(@Param('id') id: string, @Query('shopId') shopId: string) {
    return this.orderTableService.delete(id, shopId);
  }
}
