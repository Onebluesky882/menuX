import { Module } from '@nestjs/common';
import { OrderTableController } from './order-table.controller';
import { OrderTableService } from './order-table.service';
import { DatabaseModule } from 'src/database/database.module';
import { ValidateModule } from 'src/common/validate/validate.module';

@Module({
  imports: [DatabaseModule, ValidateModule],
  controllers: [OrderTableController],
  providers: [OrderTableService],
})
export class OrderTableModule {}
