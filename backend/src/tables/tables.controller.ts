import {
  Controller,
  Req,
  UseGuards,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from 'src/common/decorators/roles.decorator';
import { TablesService } from './tables.service';
import { TableDto } from './table.dto';
import { AuthRequest } from 'types/auth';

@UseGuards(AuthGuard('jwt'))
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  // @UseGuards(ShopAccessGuard)
  //create
  @Post()
  @Roles('manager', 'owner')
  create(
    @Body() body: TableDto,
    @Req() req: AuthRequest,
    @Query('shopId') shopId: string,
  ) {
    const userId = req.user.id;

    return this.tablesService.create(body, shopId, userId);
  }
  //getAll
  // @UseGuards(ShopAccessGuard)
  @Get()
  @Roles('manager', 'owner', 'staff', 'customer')
  getAll(@Query('shopId') shopId: string) {
    return this.tablesService.getAll(shopId);
  }
  // get by id
  // @UseGuards(ShopAccessGuard)
  @Get(':id')
  @Roles('manager', 'owner', 'staff', 'customer')
  getById(@Param('id') id: string, @Query('shopId') shopId: string) {
    return this.tablesService.getById(id, shopId);
  }

  // update
  // @UseGuards(ShopAccessGuard)
  @Patch(':id')
  @Roles('manager', 'owner')
  update(
    @Param('id') id: string,
    @Body() body: TableDto,
    @Query('shopId') shopId: string,
  ) {
    return this.tablesService.update(id, body, shopId);
  }

  // delete
  // @UseGuards(ShopAccessGuard)
  @Delete(':id')
  @Roles('manager', 'owner')
  delete(@Param('id') id: string, @Query('shopId') shopId: string) {
    return this.tablesService.delete(id, shopId);
  }
}
