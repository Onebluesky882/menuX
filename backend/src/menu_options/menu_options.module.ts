import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MenuOptionsController } from './menu_options.controller';
import { MenuOptionsService } from './menu_options.service';

@Module({
  imports: [DatabaseModule],
  providers: [MenuOptionsService],
  controllers: [MenuOptionsController],
})
export class MenuOptionsModule {}
