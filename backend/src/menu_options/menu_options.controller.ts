import { Body, Controller, Post } from '@nestjs/common';
import { MenuOptionsService } from './menu_options.service';
import { MenuOption } from './menu_options.dto';

@Controller('menu-options')
export class MenuOptionsController {
  constructor(private readonly menuOptionsService: MenuOptionsService) {}

  @Post()
  create(@Body() createMenuOptionDto: MenuOption) {
    return this.menuOptionsService.create(createMenuOptionDto);
  }
}
