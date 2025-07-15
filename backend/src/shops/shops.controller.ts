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
} from '@nestjs/common';

import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthRequest } from 'types/auth';
import { CreateShopDto, UpdateShopDto } from './shops.dto';
import { ShopsService } from './shops.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('shops')
export class ShopsController {
  constructor(private readonly ShopsService: ShopsService) {}
  //getAll
  // @UseGuards(ShopAccessGuard)

  @Get('consumer')
  getAllShopCLient() {
    return this.ShopsService.getAllShopNoJWT();
  }

  @UseGuards(AuthGuard('jwt'))
  //todo change Get('customer')
  @Get()
  getAll(@Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.ShopsService.getAll(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':shopId/menu')
  getMenuPage(@Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.ShopsService.getAll(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  // @Roles('owner')
  create(@Body() body: CreateShopDto, @Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.ShopsService.create(body, userId);
  }
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.ShopsService.getById(id);
  }
}
