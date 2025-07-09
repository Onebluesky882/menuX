import { Module } from '@nestjs/common';
import { MenuOptionsService } from './menu_options.service';
import { MenuOptionsController } from './menu_options.controller';

@Module({
  providers: [MenuOptionsService],
  controllers: [MenuOptionsController]
})
export class MenuOptionsModule {}
