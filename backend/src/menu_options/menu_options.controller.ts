import { AuthGuard, UserSession } from '@mguay/nestjs-better-auth';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MenuOption } from './menu_options.dto';
import { MenuOptionsService } from './menu_options.service';

@Controller('menu-options')
export class MenuOptionsController {
  constructor(private readonly menuOptionsService: MenuOptionsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createMenuOptionDto: MenuOption, @Req() req: UserSession) {
    const userId = req.user.id;
    return this.menuOptionsService.create(createMenuOptionDto, userId);
  }

  @Get('/:menuId')
  getMenu(@Param('shopId') menuId: string) {
    return this.menuOptionsService.getMenuOptionId(menuId);
  }
}
