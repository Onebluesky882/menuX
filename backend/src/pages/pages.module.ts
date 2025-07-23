import { Module } from '@nestjs/common';
import { ValidateModule } from 'src/common/validate/validate.module';
import { DatabaseModule } from 'src/database/database.module';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';

@Module({
  imports: [DatabaseModule, ValidateModule],
  providers: [PagesService],
  controllers: [PagesController],
})
export class PagesModule {}
