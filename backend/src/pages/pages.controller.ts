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

import { AuthRequest } from 'types/auth';
import { AuthGuard } from '@nestjs/passport';
import { PagesService } from './pages.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PageDto } from './pages.dto';
import { shops } from 'src/database';

@UseGuards(AuthGuard('jwt'))
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  // create
  //@UseGuards(ShopAccessGuard)
  @Post()
  @Roles('manager', 'owner')
  create(@Body() body: PageDto, @Query('shopId') shopId: string) {
    return this.pagesService.create(body, shopId);
  }
  //getAll
  //@UseGuards(ShopAccessGuard)
  @Get()
  @Roles('manager', 'owner', 'staff', 'customer', 'guest')
  getAll(@Query('shopId') shopId: string) {
    return this.pagesService.getAll(shopId);
  }
  // get by id
  //@UseGuards(ShopAccessGuard)
  @Get(':id')
  @Roles('manager', 'owner', 'staff', 'customer')
  getById(@Param('id') id: string, @Query('shopId') shopId: string) {
    return this.pagesService.getById(id, shopId);
  }

  // update
  //@UseGuards(ShopAccessGuard)
  @Patch(':id')
  @Roles('manager', 'owner')
  update(
    @Param('id') id: string,
    @Body() body: PageDto,
    @Query('shopId') shopId: string,
  ) {
    return this.pagesService.update(id, body, shopId);
  }

  // delete
  //@UseGuards(ShopAccessGuard)
  @Delete(':id')
  @Roles('manager', 'owner')
  delete(@Param('id') id: string, @Query('shopId') shopId: string) {
    return this.pagesService.delete(id, shopId);
  }
}
