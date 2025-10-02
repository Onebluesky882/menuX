import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { OrderTableController } from './order-table.controller';
import { OrderTableService } from './order-table.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderTableController],
  providers: [OrderTableService],
})
export class OrderTableModule {}
