import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard, UserSession } from '@mguay/nestjs-better-auth';
import { InsertShop, ReceiveBank } from './shops.dto';
import { ShopsService } from './shops.service';

@Controller('shops')
export class ShopsController {
  constructor(private readonly ShopsService: ShopsService) {}

  @Get()
  getAllShopCLient() {
    return this.ShopsService.getAllShopNoJWT();
  }

  @UseGuards(AuthGuard)
  //todo change Get('customer')
  @Get()
  getAll(@Req() req: UserSession) {
    const userId = req.user.id;
    return this.ShopsService.getAll(userId);
  }

  @UseGuards(AuthGuard)
  @Get(':shopId/menu')
  getMenuPage(@Req() req: UserSession) {
    const userId = req.user.id;
    return this.ShopsService.getAll(userId);
  }

  @UseGuards(AuthGuard)
  @Post()
  // @Roles('owner')
  create(@Body() body: InsertShop, @Req() req: UserSession) {
    const userId = req.user.id;
    return this.ShopsService.create(body, userId);
  }

  @UseGuards(AuthGuard)
  @Get('getOwnerShop')
  getOwner(@Req() req: UserSession) {
    const userId = req.user.id;
    return this.ShopsService.getOwnerShop(userId);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.ShopsService.getById(id);
  }

  // update
  @UseGuards(AuthGuard)
  @Patch(':shopId')
  async patch(
    @Param('shopId') shopId: string,
    @Body() data: ReceiveBank,
    @Req() req: UserSession,
  ) {
    const userId = req.user.id;
    return this.ShopsService.patch(shopId, data, userId);
  }
}
