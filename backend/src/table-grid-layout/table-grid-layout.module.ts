import { Module } from '@nestjs/common';
import { TableGridLayoutController } from './table-grid-layout.controller';
import { TableGridLayoutService } from './table-grid-layout.service';
import { DatabaseModule } from 'src/database/database.module';
import { ValidateModule } from 'src/common/validate/validate.module';

@Module({
  imports: [DatabaseModule, ValidateModule],
  providers: [TableGridLayoutService],
  controllers: [TableGridLayoutController],
})
export class TableGridLayoutModule {}
