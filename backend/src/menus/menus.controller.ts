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
import { MenusService } from './menus.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from '../../types/auth';
import { MenuDto } from './menus.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
@UseGuards(AuthGuard('jwt'))
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  //create
  // @UseGuards(ShopAccessGuard)
  @Post()
  // @Roles('manager', 'owner')
  create(@Body() body: MenuDto, @Req() req: AuthRequest) {
    const userId = req.user.id;

    return this.menusService.create(body, userId);
  }
  //getAll
  // @UseGuards(ShopAccessGuard)
  @Get()
  @Roles('manager', 'owner', 'customer', 'guest', 'staff')
  getAll(@Query('shopId') shopId: string, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.menusService.getAll(shopId);
  }
  // get by id
  // @UseGuards(ShopAccessGuard)
  @Get('name')
  getById(@Query('name') name: string, @Query('shopId') shopId: string) {
    return this.menusService.getByName(name, shopId);
  }

  // update
  // @UseGuards(ShopAccessGuard)
  @Patch(':id')
  @Roles('manager', 'owner')
  update(
    @Param('id') id: string,
    @Body() body: MenuDto,
    @Query('shopId') shopId: string,
  ) {
    return this.menusService.update(id, body, shopId);
  }

  // delete
  // @UseGuards(ShopAccessGuard)
  @Delete(':id')
  @Roles('manager', 'owner')
  delete(@Param('id') id: string, @Query('shopId') shopId: string) {
    return this.menusService.delete(id, shopId);
  }
}

// Search Text sql
// EXPLAIN SELECT * FROM menu WHERE name LIKE '%กะเพรา'
